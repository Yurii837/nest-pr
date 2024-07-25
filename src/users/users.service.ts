import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {}

    async createUser(userDto: CreateUserDto) {
        const user = await this.userRepository.create(userDto)
        const role = await this.rolesService.getRoleByValue("ADMIN")
        // додає роль в базу даних
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(roleDto: AddRoleDto) {
        const user = await this.userRepository.findByPk(roleDto.userId);
        const role = await this.rolesService.getRoleByValue(roleDto.value)
        if(role && user) {
            await user.$add('role', role.id)
            return roleDto
        }
        throw new HttpException('User or role do not found', HttpStatus.NOT_FOUND)
    }

    async banUser(banDto: BanUserDto) {

        const user = await this.userRepository.findByPk(banDto.userId);
        if(!user) {
            throw new HttpException('User or role do not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.bannedReason = banDto.bannedReason;
        await user.save();
        return user;
    }
}
