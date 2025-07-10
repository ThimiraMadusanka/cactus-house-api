import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreateDto } from '../dto/productCreate.dto';
import { ProductUpdateDto } from '../dto/productUpdate.dto';

@Controller('/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
    @Query('tag') tag?: string,
    @Query('name') name?: string,
    @Query('price') price?: string,
  ) {
    return await this.productService.getProducts(
      page,
      size,
      status,
      tag,
      name,
      price,
    );
  }

  @Get('/:id')
  async getProductById(@Param('id') id: any) {
    return await this.productService.getProductById(id);
  }

  @Post()
  @HttpCode(201)
  async createProduct(@Body() productCreateDto: ProductCreateDto) {
    return await this.productService.createProduct(productCreateDto);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: any,
    @Body() productUpdateDto: ProductUpdateDto,
  ) {
    return await this.productService.updateProduct(id, productUpdateDto);
  }

  @Patch('/:id')
  async productStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.productService.productStatusChange(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: any) {
    return await this.productService.deleteProduct(id);
  }
}
