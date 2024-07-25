import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login( userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
        
    }


    async registration( userDto: CreateUserDto) {
       const candidate = await this.userService.getUserByEmail(userDto.email)
       if(candidate) {
        throw new HttpException('User with this email allready exists', HttpStatus.BAD_REQUEST)
        // return 'User with this email allready exists'
       }
    // створюємо тільки хеш пароля
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(userDto.password, salt);
       const user = await this.userService.createUser({...userDto, password: hashPassword});
    // в юзері пароль вже захещовний
       return this.generateToken(user)
    }

    private async generateToken(user: User) {
        // токен не містить паролю
        const payload = {email: user.email, id: user.id, roles: user.roles};
        const token = this.jwtService.sign(payload)
        console.log(token)
        return {
            "token": token
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        
        if(user) {
            // порівнює тільки реальний пароль з захешованим
            const passwordEquals = await bcrypt.compare(userDto.password, user.password)
            if(passwordEquals) {
                return user
            }
        }
        throw new UnauthorizedException({message: 'Неправильний емайл або пароль'})
        // return user
    }
}
