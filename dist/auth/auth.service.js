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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(name, email, password, role) {
        const searched_user = await this.usersService.findUserByEmail(email);
        if (searched_user) {
            throw new common_1.HttpException('пользователь с таким email уже есть', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersService.createUser(name, email, password, role);
        return this.generateTokens(user.id, user.email, user.role);
    }
    async login(email, password) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.generateTokens(user.id, user.email, user.role);
    }
    generateAccessToken(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });
        return {
            accessToken,
        };
    }
    generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign({ ...payload }, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        console.log(this.jwtService.decode(refreshToken));
        return { accessToken, refreshToken };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.usersService.getUserInfo(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            return this.generateAccessToken(user.id, user.email, user.role);
        }
        catch (e) {
            throw new common_1.UnauthorizedException(`Invalid or expired refresh token - ${e}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map