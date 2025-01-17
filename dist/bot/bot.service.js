"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let BotService = class BotService {
    constructor() {
        this.botBaseUrl = 'http://92.252.240.206:11434';
    }
    async sendMessage(message) {
        const url = `${this.botBaseUrl}/api/generate`;
        try {
            const response = await axios_1.default.post(url, {
                model: 'ALIENTELLIGENCE/psychologistv2',
                prompt: `Ты отвечаешь на сообщения пользователя, ты создан для поддержки его ментального здоровья,отвечай на русском, обращайся баз пола пример - сделал(а), говори только о ЕГО самочувствии, ввод пользователя - ${message}`,
                stream: false,
            });
            return response.data;
        }
        catch (e) {
            if (e.response) {
                throw new common_1.HttpException(e.response._response, 500);
            }
            if (e.request) {
                throw new common_1.HttpException(e.request._response, 500);
            }
            throw new common_1.HttpException(e, 500);
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)()
], BotService);
//# sourceMappingURL=bot.service.js.map