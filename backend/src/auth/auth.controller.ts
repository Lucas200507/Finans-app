import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth') // Nest reconhece como controller
export class AuthController {
    constructor (
        private authService: AuthService
    ) {}

    @Post('login')
    login(@Body() body: {email: string, senha: string}){
        return this.authService.login(body.email, body.senha);
    }
}