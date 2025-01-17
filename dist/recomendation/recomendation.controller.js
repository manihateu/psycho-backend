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
exports.RecomendationController = void 0;
const common_1 = require("@nestjs/common");
const recomendation_service_1 = require("./recomendation.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth/jwt-auth.guard");
let RecomendationController = class RecomendationController {
    constructor(recomendationService) {
        this.recomendationService = recomendationService;
    }
    async getRecomendations(limit) {
        const parsedLimit = Number(limit);
        if (isNaN(parsedLimit)) {
            throw new common_1.HttpException("limit указан не верно", 400);
        }
        return await this.recomendationService.recommendCourses(parsedLimit);
    }
};
exports.RecomendationController = RecomendationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecomendationController.prototype, "getRecomendations", null);
exports.RecomendationController = RecomendationController = __decorate([
    (0, common_1.Controller)('recomendation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [recomendation_service_1.RecomendationService])
], RecomendationController);
//# sourceMappingURL=recomendation.controller.js.map