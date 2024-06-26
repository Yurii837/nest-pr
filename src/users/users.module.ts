import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    // таким чином імпотртуєм RolesModule разом з RolesService
    RolesModule
  ],
  // те саме що і в RolesModule
  exports: [UsersService]
})
export class UsersModule {}
