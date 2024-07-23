// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString()
  password: string;
}