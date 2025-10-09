import { Category } from 'src/categories/entities/category.entity';
import { Manufacture } from 'src/manufactures/entities/manufacture.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ProductsColor } from 'src/products-colors/entities/products-color.entity';
import { ProductsImage } from 'src/products-images/entities/products-image.entity';
import { ProductsSize } from 'src/products-sizes/entities/products-size.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column({ unique: true })
  productid: string;

  @Column({ length: 12 })
  productsku: string;
  @Column({ length: 200 })
  productname: string;

  @Column('decimal', { precision: 9, scale: 2, default: 0 })
  productprice: number;
  @Column({ type: 'smallint', default: 0 })
  productdiscount: number;
  @Column({ type: 'smallint', default: 1 })
  productquantity: number;

  @Column()
  productmanufacture: number;
  @Column({ type: 'text', nullable: true })
  productdescription: string;
  @Column({ type: 'int', default: 0 })
  productview: number;
  @OneToMany(() => ProductsSize, (productSize) => productSize.product)
  productSizes: ProductsSize[];
  @OneToMany(() => ProductsImage, (productImage) => productImage.product)
  productImages: ProductsImage[];

  @OneToMany(() => ProductsColor, (productColor) => productColor.productid)
  productsColors: ProductsColor[];
  @ManyToOne(() => Manufacture, (manufacture) => manufacture.products)
  @JoinColumn({
    name: 'productmanufacture',
    referencedColumnName: 'manufactureid',
  })
  manufacture: Manufacture;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'productcategory', referencedColumnName: 'categoryid' })
  productcategory: Category;
  @ManyToOne(() => User, (user) => user.product)
  @JoinColumn({ name: 'productuser', referencedColumnName: 'userid' })
  productuser: User;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderid)
  orderDetails: OrderDetail[];
}
