import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products_images')
export class ProductsImage {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column({ length: 200 })
  imagename: string;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productid', referencedColumnName: 'productid' })
  product: Product;
}
