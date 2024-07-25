import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Validation } from 'src/pipes/validation.pipe';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Validation],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    // таким чином імпотртуєм RolesModule разом з RolesService
    RolesModule,
    // для запобігання кільцевї зацикленості, можна просто AuthModule
    forwardRef(() => AuthModule),
  ],
  // те саме що і в RolesModule
  exports: [UsersService, Validation]
})
export class UsersModule {}
