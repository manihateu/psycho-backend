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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllCourses() {
        return await this.prisma.course.findMany({
            include: {
                audioFiles: true,
            },
        });
    }
    async getCourseById(id) {
        return await this.prisma.course.findFirst({
            where: {
                id
            }
        });
    }
    async likeCourse(courseId, userId) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                likedCourses: {
                    connect: { id: courseId }
                }
            },
        });
    }
    async getLikesCountByCourseId(courseId) {
        const { usersLiked } = await this.prisma.course.findFirst({
            where: {
                id: courseId
            },
            include: {
                usersLiked: true
            }
        });
        return usersLiked.length;
    }
    async dislikeCourse(courseId, userId) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                likedCourses: {
                    disconnect: { id: courseId }
                }
            },
        });
    }
    async getAudioById(id) {
        return await this.prisma.audioFile.findFirst({
            where: { id },
        });
    }
    async createCourse(data) {
        console.log(data);
        return this.prisma.course.create({
            data: {
                ...data,
                countLiked: 0,
                countListened: 0,
            },
        });
    }
    async addListen(id) {
        const thisCourse = await this.prisma.course.findFirst({ where: { id } });
        return await this.prisma.course.update({
            where: { id },
            data: {
                countListened: thisCourse.countLiked + 1,
            },
        });
    }
    async addAudioToCourse(courseId, audioData, fileUrl) {
        const audioFile = await this.prisma.audioFile.create({
            data: {
                ...audioData,
                fileUrl,
            },
        });
        return this.prisma.course.update({
            where: { id: courseId },
            data: {
                audioFiles: {
                    connect: { id: audioFile.id },
                },
            },
            include: { audioFiles: true },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map