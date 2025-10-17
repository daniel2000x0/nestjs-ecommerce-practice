import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GendersModule } from './genders/genders.module';
import { ProductsModule } from './products/products.module';
import { ProductsColorsModule } from './products-colors/products-colors.module';
import { ProductsImagesModule } from './products-images/products-images.module';
import { ProductsSizesModule } from './products-sizes/products-sizes.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';
import { ManufacturesModule } from './manufactures/manufactures.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { OrdersDetailsModule } from './orders-details/orders-details.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesKindModule } from './categories-kind/categories-kind.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Manufacture } from './manufactures/entities/manufacture.entity';
import { ProductsSize } from './products-sizes/entities/products-size.entity';
import { ProductsImage } from './products-images/entities/products-image.entity';
import { Gender } from './genders/entities/gender.entity';
import { ConfigModule } from '@nestjs/config';
import { Color } from './colors/entities/color.entity';
import { ProductsColor } from './products-colors/entities/products-color.entity';
import { Country } from './countries/entities/country.entity';
import { UsersRole } from './users-roles/entities/users-role.entity';
import { Size } from './sizes/entities/size.entity';

import { ShoppingCart } from './shopping-cart/entities/shopping-cart.entity';
import { Role } from './roles/entities/role.entity';
import { Order } from './orders/entities/order.entity';
import { Category } from './categories/entities/category.entity';
import { CategoriesKind } from './categories-kind/entities/categories-kind.entity';
import { Customer } from './customers/entities/customer.entity';
import { OrdersDetail } from './orders-details/entities/orders-detail.entity';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ⚡ hace que esté disponible en todo el proyecto
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        User,
        Product,
        Manufacture,
        ProductsSize,
        ProductsImage,
        Color,
        ProductsColor,
        Gender,
        Country,
        UsersRole,
        Size,
        OrdersDetail,
        ShoppingCart,
        Role,
        Order,
        Category,
        Customer,
        CategoriesKind,
      ],
      synchronize: false, // Solo en desarrollo
      autoLoadEntities: true,
    }),
    UsersModule,
    GendersModule,
    ProductsModule,
    ProductsColorsModule,
    ProductsImagesModule,
    ProductsSizesModule,
    SizesModule,
    ColorsModule,
    OrdersModule,
    ManufacturesModule,
    ShoppingCartModule,
    OrdersDetailsModule,
    CategoriesModule,
    UsersRolesModule,
    CustomersModule,
    CategoriesKindModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
