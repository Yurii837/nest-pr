import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';


@ApiTags('фвторизація')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        this.authService.login(userDto)
        
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        this.authService.registration(userDto)
    }
}
