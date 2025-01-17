"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const courses_controller_1 = require("./courses.controller");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const recomendation_module_1 = require("../recomendation/recomendation.module");
const recomendation_service_1 = require("../recomendation/recomendation.service");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, jwt_1.JwtModule, recomendation_module_1.RecomendationModule],
        providers: [courses_service_1.CoursesService, prisma_service_1.PrismaService, jwt_1.JwtService, recomendation_service_1.RecomendationService],
        controllers: [courses_controller_1.CoursesController]
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map