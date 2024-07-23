import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  private productService;

  constructor(@Inject('PRODUCTS_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<any>('ProductService');
  }

  @Post()
  @ApiBody({type: CreateProductDto})
  create(@Body() data: { name: string, description: string, price: number }): Observable<Product> {
    return this.productService.CreateProduct(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Product> {
    return this.productService.GetProduct({ id });
  }

  @Get()
  findAll(): Observable<{ products: Product[] }> {
    return this.productService.GetAllProducts({});
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: number, @Body() data: UpdateProductDto): Observable<Product> {
    return this.productService.UpdateProduct({ id, ...data});
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.productService.DeleteProduct({ id });
  }
}
