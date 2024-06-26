import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    // @ApiOperation({summary: 'Create user'})
    // @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() roleDto: CreateRoleDto ) {
        return this.rolesService.createRole(roleDto)
    }

    // @ApiOperation({summary: 'Get all user'})
    // @ApiResponse({status: 200, type: Array<User>})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
