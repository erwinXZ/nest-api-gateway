import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}
  @Post('login')
  @ApiBody({
    schema: { example: { username: 'admin', password: 'password123' } },
  })
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return firstValueFrom(
      this.client.send({ cmd: 'login' }, { username, password }),
    );
  }
}
