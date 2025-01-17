"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const bot_module_1 = require("./bot/bot.module");
const categories_module_1 = require("./categories/categories.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const courses_module_1 = require("./courses/courses.module");
const recomendation_module_1 = require("./recomendation/recomendation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/static',
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            bot_module_1.BotModule,
            categories_module_1.CategoriesModule,
            courses_module_1.CoursesModule,
            recomendation_module_1.RecomendationModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map