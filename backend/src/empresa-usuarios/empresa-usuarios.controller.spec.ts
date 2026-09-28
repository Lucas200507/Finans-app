import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaUsuariosController } from './empresa-usuarios.controller';
import { EmpresaUsuariosService } from './empresa-usuarios.service';

describe('EmpresaUsuariosController', () => {
  let controller: EmpresaUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaUsuariosController],
      providers: [EmpresaUsuariosService],
    }).compile();

    controller = module.get<EmpresaUsuariosController>(EmpresaUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
