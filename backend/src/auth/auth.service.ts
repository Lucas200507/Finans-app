import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private usuarioService: UsuariosService,
        private jwtService: JwtService
    ) {}
    
    async validarUsuario(email: string, senha: string){
        const usuario = await this.usuarioService.findByEmail(email);
        if (!usuario) {
            return null;
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta){
            return null;
        }

        const { senha: _, ...usuarioSemSenha} = usuario; // retirando senha de usuario (destructuring com rest operator)
        return usuarioSemSenha;
    }

    async login(email: string, senha: string){
        const usuario = await this.validarUsuario(email, senha);

        if(!usuario){
            throw new UnauthorizedException('Email ou senha inválidos'); // Excepção especial do nest, vira uma resposta 401
        }
        // confirmação de acesso
        const payload = {sub: usuario.id, email: usuario.email}; // conteúdo que vai dentro do token, sub: subject (de quem é esse token)

        return {
            access_token: this.jwtService.sign(payload), // pega o payload e assina com o JWT_SECRET e retorna a string do token
            usuario
        };
    }
}
