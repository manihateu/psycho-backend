import { RecomendationService } from './recomendation.service';
export declare class RecomendationController {
    private readonly recomendationService;
    constructor(recomendationService: RecomendationService);
    getRecomendations(limit: string): Promise<any[]>;
}
