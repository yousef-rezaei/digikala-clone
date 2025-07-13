import {
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    // const imagePath = `http://localhost:4000/uploads/${file.filename}`;
    const imagePath = `${process.env.BACKEND_URL}/uploads/${file.filename}`;
    return this.productService.create({ ...body, image: imagePath });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Put(':id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }),
)
async update(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
) {
  const updateData = {
    ...body,
  };

  // Optional: only include image if a new one was uploaded
  if (file) {
    // updateData.image = `http://localhost:4000/uploads/${file.filename}`;
    const imagePath = `${process.env.BACKEND_URL}/uploads/${file.filename}`;
  }

  return this.productService.update(+id, updateData);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
