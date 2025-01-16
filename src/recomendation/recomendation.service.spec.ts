import { Test, TestingModule } from '@nestjs/testing';
import { RecomendationService } from './recomendation.service';

describe('RecomendationService', () => {
  let service: RecomendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecomendationService],
    }).compile();

    service = module.get<RecomendationService>(RecomendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
