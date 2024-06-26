import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  //прокидуєм сервіс, щоб модуль(RolesModule) імпортувався(у UsersModule) разом з сервісом і RolesService був доступний у UsersService 
  exports: [RolesService]
})
export class RolesModule {}
