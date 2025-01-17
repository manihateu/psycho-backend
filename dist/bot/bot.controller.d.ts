import { BotService } from './bot.service';
export declare class BotController {
    private botService;
    constructor(botService: BotService);
    postToBot(data: {
        message: string;
    }): Promise<any>;
}
