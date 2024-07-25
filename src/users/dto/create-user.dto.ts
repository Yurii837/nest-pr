import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreateUserDto {

    @ApiProperty({example: 'test@gmail.com'})
    @IsString({message: 'must be string'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: '1234'})
    @IsString({message: 'must be string'})
    @Length(4, 16, {message: 'from 4 to 16'})
    readonly password: string;
}