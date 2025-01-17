import { PrismaService } from 'src/prisma/prisma.service';
export declare class RecomendationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getInteractionMatrix;
    private createUserVectors;
    private getPopularCourses;
    recommendCourses(userId: number, limit?: number): Promise<any[]>;
    addInteraction(userId: number, courseId: number, interactionType: 'LIKE' | 'STARTED' | 'COMPLETED'): Promise<void>;
}
