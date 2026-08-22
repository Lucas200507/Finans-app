import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('enderecos') // Define o prefixo da rota: /enderecos
export class EnderecosController {
  // Nest entrega uma instância do EnderecosService pronta, sem você instanciar manualmente
  constructor(private readonly enderecosService: EnderecosService) {}

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Post()
  // @Body: extrai o corpo da requisição (JSON) e já entrega tipado como CreateEnderecoDTO (Passa pelo ValidationPipe)
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.create(createEnderecoDto);
  }
  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {    
    return this.enderecosService.findOne(+id); // '+' = converte a string para número
  }

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Patch(':id') // Parecido com o put, mas este método só receberá os parâmetros que serão alterados
  update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecosService.update(+id, updateEnderecoDto);
  }
  
  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecosService.remove(+id);
  }
}
