import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

// поля, необхідні для створення обека юзер(інші мають дефолтні знач)
interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: 1, description: 'Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'admin', description: 'роль'})
    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @ApiProperty({example: 'string', description: 'опис'})
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}