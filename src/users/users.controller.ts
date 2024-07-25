import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Validation } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(Validation)
    @Post()
    create(@Body() userDto: CreateUserDto ) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Get all user'})
    @ApiResponse({status: 200, type: Array<User>})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Attach role'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() roleDto: AddRoleDto) {
        return this.userService.addRole(roleDto)
    }

    @ApiOperation({summary: 'Bane user'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() banDto: BanUserDto) {
        return this.userService.banUser(banDto)
    }
}
