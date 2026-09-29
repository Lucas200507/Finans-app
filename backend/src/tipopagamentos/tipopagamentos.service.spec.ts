import { Test, TestingModule } from '@nestjs/testing';
import { TipopagamentosService } from './tipopagamentos.service';

describe('TipopagamentosService', () => {
  let service: TipopagamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipopagamentosService],
    }).compile();

    service = module.get<TipopagamentosService>(TipopagamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
