import { Test, TestingModule } from '@nestjs/testing';
import { TipopagamentosController } from './tipopagamentos.controller';
import { TipopagamentosService } from './tipopagamentos.service';

describe('TipopagamentosController', () => {
  let controller: TipopagamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipopagamentosController],
      providers: [TipopagamentosService],
    }).compile();

    controller = module.get<TipopagamentosController>(TipopagamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
