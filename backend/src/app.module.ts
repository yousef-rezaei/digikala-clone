import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
// import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // 👈 change to your DB username
      password: 'root', // 👈 change to your DB password
      database: 'digikala_clone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 👈 dev only (auto-create tables)
    }),
    ProductModule,
  ],
})
export class AppModule {}
