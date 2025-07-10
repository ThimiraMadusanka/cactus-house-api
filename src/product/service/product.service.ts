import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ACTIVE, PRODUCT } from 'src/constants/constants';
import { ProductModel } from '../entities/product.entity';
import { ProductUpdateDto } from '../dto/productUpdate.dto';
import { ProductCreateDto } from '../dto/productCreate.dto';
import { AWSService } from 'src/aws/service/aws.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT)
    private Product: typeof ProductModel,

    private readonly awsService: AWSService,
  ) {}

  async getProducts(
    page: number = 0,
    size: number = 10,
    status?: string,
    tag?: string,
    name?: string,
    price?: string,
  ) {
    const offset = (page - 1) * size;
    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }
    if (tag) {
      whereClause.tags = { [Op.like]: `%${tag}%` };
    }
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (price) {
      whereClause.price = { [Op.like]: `%${price}%` };
    }

    const productList = await this.Product.findAndCountAll({
      limit: size,
      offset: offset,
      where: whereClause,
      raw: true,
    });

    const list = productList.rows.map((item) => {
      return { ...item, tags: JSON.parse(item.tags) };
    });

    return {
      page: page,
      size: size,
      totalCount: productList.count,
      data: list,
    };
  }

  async getProductById(id: any) {
    const product = await this.Product.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!product) {
      throw new HttpException(
        `Product not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...product, tags: JSON.parse(product.tags) };
  }

  async createProduct(productCreateDto: ProductCreateDto) {
    const {
      name,
      description,
      price,
      quantity,
      fileContent,
      fileName,
      contentType,
      tags,
    } = productCreateDto;

    const imageUrl = await this.awsService.fileUpload(
      fileContent,
      fileName,
      contentType,
    );

    const product = await this.Product.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      imageUrl: imageUrl,
      tags: JSON.stringify(tags),
      status: ACTIVE,
    });

    return product.toJSON();
  }

  async updateProduct(id: any, productUpdateDto: ProductUpdateDto) {
    const product = await this.Product.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!product) {
      throw new HttpException(
        `Product not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const {
      name,
      description,
      price,
      quantity,
      fileContent,
      fileName,
      contentType,
      tags,
    } = productUpdateDto;

    const imageUrl = await this.awsService.fileUpload(
      fileContent,
      fileName,
      contentType,
    );

    await this.Product.update(
      {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        tags: JSON.stringify(tags),
        status: ACTIVE,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(`Product updated with id ${id}`, HttpStatus.OK);
  }

  async productStatusChange(id: any, status: string) {
    const product = await this.Product.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!product) {
      throw new HttpException(
        `Product not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Product.update(
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(
      `Product status change with id ${id}`,
      HttpStatus.OK,
    );
  }

  async deleteProduct(id: any) {
    const product = await this.Product.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!product) {
      throw new HttpException(
        `Product not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Product.destroy({
      where: {
        id: id,
      },
    });
  }
}
