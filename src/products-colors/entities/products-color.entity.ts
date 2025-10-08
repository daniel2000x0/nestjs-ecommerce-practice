import { Color } from 'src/colors/entities/color.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products_colors')
export class ProductsColor {
  @PrimaryGeneratedColumn()
  serial: number;

  @ManyToOne(() => Color, (color) => color.productColors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'colorid', referencedColumnName: 'colorid' })
  color: Color;
  @Column()
  productid: number;
}
