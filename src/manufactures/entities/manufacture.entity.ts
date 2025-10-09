import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('manufactures')
export class Manufacture {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column({ unique: true })
  manufactureid: number;
  @Column({ length: 100 })
  manufacturename: string;
  @OneToMany(() => Product, (product) => product.manufacture)
  products: Product[];
}
