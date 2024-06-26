import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {

    @ApiProperty({example: 'test@gmail.com'})
    readonly email: string;
    @ApiProperty({example: '1234'})
    readonly password: string;
}