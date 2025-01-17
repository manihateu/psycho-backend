"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendationModule = void 0;
const common_1 = require("@nestjs/common");
const recomendation_service_1 = require("./recomendation.service");
const recomendation_controller_1 = require("./recomendation.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
let RecomendationModule = class RecomendationModule {
};
exports.RecomendationModule = RecomendationModule;
exports.RecomendationModule = RecomendationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, jwt_1.JwtModule],
        providers: [recomendation_service_1.RecomendationService, prisma_service_1.PrismaService, jwt_1.JwtService],
        controllers: [recomendation_controller_1.RecomendationController],
        exports: [recomendation_service_1.RecomendationService]
    })
], RecomendationModule);
//# sourceMappingURL=recomendation.module.js.map