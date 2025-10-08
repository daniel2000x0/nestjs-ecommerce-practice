import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersResolver } from './users/users.resolver';
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
import { OrdersModule } from './orders/orders.module';
import { CountriesModule } from './countries/countries.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, GendersModule, ProductsModule, ProductsColorsModule, ProductsImagesModule, ProductsSizesModule, SizesModule, ColorsModule, ManufacturesModule, ShoppingCartModule, OrdersDetailsModule, CategoriesModule, UsersRolesModule, CustomersModule, CategoriesKindModule, OrdersModule, CountriesModule, OrderDetailsModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
