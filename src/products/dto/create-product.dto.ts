import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'product name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'product description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '50.10' })
  @IsNumber()
  price: number;
}
