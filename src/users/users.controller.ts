import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Payload() createUserDto: CreateUserDto) {
    return this.client.send({ cmd: 'create_user' }, createUserDto);
  }

  @Get()
  findAll() {
    return this.client.send({ cmd: 'find_all_users' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_user' }, { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.client.send({ cmd: 'update_user' }, { id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_user' }, { id }).pipe(
      catchError((error) => {
        return throwError(
          new HttpException(
            'Product not found or could not be deleted',
            HttpStatus.NOT_FOUND,
          ),
        );
      }),
    );
  }
}
