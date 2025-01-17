"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ml_distance_1 = require("ml-distance");
let RecomendationService = class RecomendationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getInteractionMatrix() {
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
    async createUserVectors() {
        const interactions = await this.getInteractionMatrix();
        const userVectors = new Map();
        for (const { userId, courseId, score } of interactions) {
            if (!userVectors.has(userId)) {
                userVectors.set(userId, new Map());
            }
            userVectors.get(userId).set(courseId, score);
        }
        return userVectors;
    }
    async getPopularCourses(limit = 10) {
        return await this.prisma.course.findMany({
            orderBy: { countLiked: 'desc' },
            take: limit,
        });
    }
    async recommendCourses(userId, limit = 5) {
        const userVectors = await this.createUserVectors();
        const targetUserVector = userVectors.get(userId);
        if (!targetUserVector) {
            return await this.getPopularCourses(limit);
        }
        const similarities = [];
        for (const [otherUserId, otherUserVector] of userVectors) {
            if (otherUserId === userId)
                continue;
            const similarity = ml_distance_1.similarity.cosine(Array.from(targetUserVector.values()), Array.from(otherUserVector.values()));
            similarities.push({ userId: otherUserId, similarity });
        }
        similarities.sort((a, b) => b.similarity - a.similarity);
        const recommendedCourses = new Set();
        for (const { userId: similarUserId } of similarities.slice(0, limit)) {
            const similarUserVector = userVectors.get(similarUserId);
            if (!similarUserVector)
                continue;
            for (const [courseId] of similarUserVector) {
                if (!targetUserVector.has(courseId)) {
                    recommendedCourses.add(courseId);
                }
            }
            if (recommendedCourses.size >= limit)
                break;
        }
        const recommendedCoursesIds = Array.from(recommendedCourses).slice(0, limit);
        return await this.prisma.course.findMany({
            where: {
                id: {
                    in: recommendedCoursesIds
                }
            }
        });
    }
    async addInteraction(userId, courseId, interactionType) {
        await this.prisma.userCourseInteraction.upsert({
            where: {
                userId_courseId_interactionType: {
                    userId,
                    courseId,
                    interactionType,
                },
            },
            update: {
                timestamp: new Date(),
            },
            create: {
                userId,
                courseId,
                interactionType,
            },
        });
    }
};
exports.RecomendationService = RecomendationService;
exports.RecomendationService = RecomendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecomendationService);
//# sourceMappingURL=recomendation.service.js.map