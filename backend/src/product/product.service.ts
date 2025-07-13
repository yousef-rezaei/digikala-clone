// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ProductService {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  create(data: Partial<Product>) {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  update(id: number, data: Partial<Product>) {
    return this.productRepo.update(id, data);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
