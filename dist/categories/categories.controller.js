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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth/jwt-auth.guard");
const categories_service_1 = require("./categories.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const categories_dto_1 = require("./categories.dto");
const file_images_interceptor_1 = require("../shared/file.images.interceptor");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    async assignCategoriesToUser(req, { categoryIds }) {
        const userId = req.user.sub;
        return this.categoriesService.addCategoryToUser(userId, categoryIds);
    }
    async createCategory({ name, bgcolor }, file) {
        return this.categoriesService.createCategory(name, `/static/images/${file.filename}`, bgcolor);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Post)('/assign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "assignCategoriesToUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard(['ADMIN'])),
    (0, common_1.UseInterceptors)(file_images_interceptor_1.ImagesFilesInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map