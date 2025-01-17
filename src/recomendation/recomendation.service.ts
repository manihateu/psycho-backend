import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { similarity as MlMethods } from 'ml-distance';

@Injectable()
export class RecomendationService {
    constructor (private readonly prisma: PrismaService) {}

    private async getInteractionMatrix(): Promise<Array<{ userId: number; courseId: number; score: number }>> {
        const interactions = await this.prisma.userCourseInteraction.findMany({
          select: {
            userId: true,
            courseId: true,
            interactionType: true,
          },
        });
      
        const interactionScores = {
          LIKE: 1,
          STARTED: 0.5,
          COMPLETED: 2,
        };
      
        return interactions.map((interaction) => ({
          userId: interaction.userId,
          courseId: interaction.courseId,
          score: interactionScores[interaction.interactionType],
        }));
    }

    private async createUserVectors(): Promise<Map<number, Map<number, number>>> {
      const interactions = await this.getInteractionMatrix();
      const userVectors = new Map<number, Map<number, number>>();
    
      for (const { userId, courseId, score } of interactions) {
        if (!userVectors.has(userId)) {
          userVectors.set(userId, new Map());
        }
        userVectors.get(userId)!.set(courseId, score);
      }
    
      return userVectors;
    }

    private async getPopularCourses(limit: number = 10): Promise<any[]> {
        return await this.prisma.course.findMany({
          orderBy: { countLiked: 'desc' }, 
          take: limit, 
        });
    }
    
    async recommendCourses(userId: number, limit: number = 5): Promise<any[]> {
      const userVectors = await this.createUserVectors();
      const targetUserVector = userVectors.get(userId);
    
      if (!targetUserVector) {
        return await this.getPopularCourses(limit)
      }
    
      const similarities: Array<{ userId: number; similarity: number }> = [];
    
      for (const [otherUserId, otherUserVector] of userVectors) {
        if (otherUserId === userId) continue;
    
        const similarity = MlMethods.cosine(
          Array.from(targetUserVector.values()),
          Array.from(otherUserVector.values())
        );
    
        similarities.push({ userId: otherUserId, similarity });
      }
    
      similarities.sort((a, b) => b.similarity - a.similarity);
    
      // Найдём курсы, которые нравятся ближайшим пользователям
      const recommendedCourses = new Set<number>();
    
      for (const { userId: similarUserId } of similarities.slice(0, limit)) {
        const similarUserVector = userVectors.get(similarUserId);
        if (!similarUserVector) continue;
    
        for (const [courseId] of similarUserVector) {
          if (!targetUserVector.has(courseId)) {
            recommendedCourses.add(courseId);
          }
        }
    
        if (recommendedCourses.size >= limit) break;
      }
    
      const recommendedCoursesIds = Array.from(recommendedCourses).slice(0, limit);
      return await this.prisma.course.findMany({
        where: {
            id: {
                in: recommendedCoursesIds
            }
        }
      })
    }
    
}
