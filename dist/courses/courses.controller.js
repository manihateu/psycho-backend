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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const path_1 = require("path");
const fs_1 = require("fs");
const jwt_auth_guard_1 = require("../auth/jwt-auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const recomendation_service_1 = require("../recomendation/recomendation.service");
const courses_dto_1 = require("./courses.dto");
const file_images_interceptor_1 = require("../shared/file.images.interceptor");
const swagger_1 = require("@nestjs/swagger");
let CoursesController = class CoursesController {
    constructor(coursesService, recomenationService) {
        this.coursesService = coursesService;
        this.recomenationService = recomenationService;
    }
    async getAllCourses() {
        return this.coursesService.getAllCourses();
    }
    async getCourseById(id) {
        return await this.coursesService.getCourseById(+id);
    }
    async likeCourse(courseId, req) {
        return await this.coursesService.likeCourse(+courseId, req.user.sub);
    }
    async dislikeCourse(courseId, req) {
        return await this.coursesService.dislikeCourse(+courseId, req.user.sub);
    }
    async getListenCount(courseId) {
        return await this.coursesService.getLikesCountByCourseId(+courseId);
    }
    async createCourse(files, createCourseDto) {
        const cardLogoUrl = files.cardLogoUrl
            ? `/static/images/${files.cardLogoUrl[0].filename}`
            : null;
        const cardBgUrl = files.cardBgUrl
            ? `/static/images/${files.cardBgUrl[0].filename}`
            : null;
        createCourseDto.timeFrom = +createCourseDto.timeFrom;
        createCourseDto.timeTo = +createCourseDto.timeTo;
        return this.coursesService.createCourse({
            ...createCourseDto,
            cardLogoUrl,
            cardBgUrl,
        });
    }
    async addAudioToCourse(files, courseId, audioData) {
        const fileUrl = files.audio
            ? `/static/audio/${files.audio[0].filename}`
            : null;
        if (!fileUrl) {
            throw new Error('Audio file is required');
        }
        return this.coursesService.addAudioToCourse(+courseId, audioData, fileUrl);
    }
    async streamAudio(audioId, courseId, res, req) {
        const audiofile = await this.coursesService.getAudioById(+audioId);
        await this.coursesService.addListen(+courseId);
        const audioPath = (0, path_1.join)(__dirname, '..', '..', 'public', 'audio', audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1]);
        if (!(0, fs_1.existsSync)(audioPath)) {
            throw new common_1.NotFoundException('Аудиофайл не найден.');
        }
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': `inline; filename="${audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1]}.mp3"`,
        });
        const audioStream = (0, fs_1.createReadStream)(audioPath);
        audioStream.pipe(res);
        audioStream.on("open", async () => {
            await this.recomenationService.addInteraction(+req.user.sub, +courseId, "STARTED");
            await this.coursesService.addListen(+courseId);
        });
        audioStream.on("end", async () => {
            await this.recomenationService.addInteraction(+req.user.sub, +courseId, "COMPLETED");
        });
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Post)("like/:courseId"),
    __param(0, (0, common_1.Param)("courseId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "likeCourse", null);
__decorate([
    (0, common_1.Post)("dislike/:courseId"),
    __param(0, (0, common_1.Param)("courseId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "dislikeCourse", null);
__decorate([
    (0, common_1.Get)("/listen-count/:courseId"),
    __param(0, (0, common_1.Param)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getListenCount", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard(['ADMIN'])),
    (0, common_1.UseInterceptors)(file_images_interceptor_1.CoursesCreateFilesFieldsInterceptor),
    (0, swagger_1.ApiBody)({
        description: 'Данные курса',
        type: courses_dto_1.SwaggerCreateCourseDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [courses_dto_1.FilesOnCreateCourseDto,
        courses_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)(':courseId/audio'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard(['ADMIN'])),
    (0, common_1.UseInterceptors)(file_images_interceptor_1.AddAudioFileInterceptor),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, courses_dto_1.FindOneCourseParams,
        courses_dto_1.AuidioDataDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addAudioToCourse", null);
__decorate([
    (0, common_1.Get)(':courseId/audio/:audioId'),
    __param(0, (0, common_1.Param)('audioId')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "streamAudio", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [courses_service_1.CoursesService, recomendation_service_1.RecomendationService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map