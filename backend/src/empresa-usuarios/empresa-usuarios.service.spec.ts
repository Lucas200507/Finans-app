import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaUsuariosService } from './empresa-usuarios.service';

describe('EmpresaUsuariosService', () => {
  let service: EmpresaUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaUsuariosService],
    }).compile();

    service = module.get<EmpresaUsuariosService>(EmpresaUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
