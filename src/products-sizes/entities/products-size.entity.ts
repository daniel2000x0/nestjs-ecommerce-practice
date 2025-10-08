import { Product } from 'src/products/entities/product.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_sizes')
export class ProductsSize {
  @PrimaryGeneratedColumn()
  serial: number;

  @ManyToOne(() => Size, (size) => size.sizeid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sizeid', referencedColumnName: 'sizeid' })
  size: Size;

  @ManyToOne(() => Product, (product) => product.productSizes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
