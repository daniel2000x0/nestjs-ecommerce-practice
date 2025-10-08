import { Gender } from 'src/genders/entities/gender.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  serial: number;
  @PrimaryColumn()
  userid: number;
  @Column({ length: 20 })
  userfirstname: string;
  @Column({ length: 20 })
  userlastname: string;
  @Column({ unique: true, length: 100 })
  useremail: string;
  @Column({ length: 60 })
  userpassword: string;
  @Column({ type: 'date' })
  userbirthdate: Date;
  @Column()
  usergender: number; // forankey   gender table
  @Column({ default: false })
  userstatus: boolean;
  @ManyToOne(() => Gender, (gender) => gender.genderid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usergender', referencedColumnName: 'genderid' })
  gender: Gender;
  @OneToMany(() => Product, (product) => product.productuser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productuser', referencedColumnName: 'productid' })
  product: Product;

  @OneToMany(() => UsersRole, (user) => user.roleid)
  rolusers: UsersRole[];
}
