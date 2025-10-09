import { ProductsColor } from 'src/products-colors/entities/products-color.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ unique: true })
  colorid: number;
  @Column({ length: 50 })
  colorname: string;
  @Column({ type: 'char', length: 7, default: '#FFFFFF' })
  colorcode: string;
  @OneToMany(() => ProductsColor, (productColor) => productColor.color)
  productColors: ProductsColor[];
}
