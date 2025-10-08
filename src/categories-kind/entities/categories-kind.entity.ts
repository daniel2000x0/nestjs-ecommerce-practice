import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('categories_kind')
export class CategoriesKind {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ unique: true })
  categorykindid: number;
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  categorykidname: string;
  @OneToMany(() => Category, (category) => category.categorykind)
  category: Category[];
}
