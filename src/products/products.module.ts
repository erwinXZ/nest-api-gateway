import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'products',
          protoPath: join(__dirname, '../proto/products.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
