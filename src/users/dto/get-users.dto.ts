import {
    IsOptional,
    IsNumber,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type OrderDirection = 'ASC' | 'DESC';

export class GetUsersDto {
    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({}, { message: 'La página debe ser un número' })
    @ApiProperty({
        required: false,
        default: 1,
        description: 'Número de página (por defecto: 1)',
    })
    page?: number = 1;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({}, { message: 'El limit debe ser un número' })
    @ApiProperty({
        required: false,
        default: 20,
        description: 'Límite de resultados por página (por defecto: 20)',
    })
    limit?: number = 20;

    @IsOptional()
    @Type(() => Number)
    @IsNumber(
        {},
        { message: 'El id del usuario debe ser un número' },
    )
    @ApiProperty({
        required: false,
        description: 'ID de usuario',
    })
    id?: number;

    @IsOptional()
    @Type(() => String)
    @IsString()
    @ApiProperty({
        required: false,
        description: 'El orden solicitado para los registros (por defecto: asc)',
    })
    sord?: OrderDirection = 'ASC';

    @IsOptional()
    @Type(() => String)
    @IsString()
    @ApiProperty({
        required: false,
        description: 'El id de la columna solicitada para ordenar los registros',
    })
    sidx?: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    @MaxLength(30, {
        message: 'El filtro de usuario debe ser de hasta 30 caracteres',
    })
    @ApiProperty({
        required: false,
        description: 'El username es un string',
    })
    username?: string;
}
