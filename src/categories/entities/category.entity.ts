import { CategoriesKind } from 'src/categories-kind/entities/categories-kind.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ type: 'varchar', length: 200, nullable: false, default: '' })
  categoryname: string;
  @Column({ unique: true })
  categoryid: number;
  @ManyToOne(() => CategoriesKind, (categorykind) => categorykind.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'categorykind', referencedColumnName: 'categorykindid' })
  categorykind: CategoriesKind;
  @OneToMany(() => Product, (product) => product.productcategory)
  products: Product[];
}
