import { Gender } from 'src/genders/entities/gender.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column({
    name: 'customerid',
    type: 'int',
    unique: true,
  })
  @Generated('increment')
  customerid: number;

  @Column({ type: 'varchar', length: 100, name: 'customerfirstname' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'customerlastname' })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    name: 'customeremail',
  })
  email: string;

  @Column({
    type: 'char',
    length: 60,
    name: 'customerpassword',
    select: false,
  })
  password: string;

  @Column({ type: 'date', name: 'customerbirthdate' })
  birthDate: Date;

  @OneToMany(() => ShoppingCart, (shopping) => shopping.customer)
  shopping: ShoppingCart[];
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @ManyToOne(() => Gender, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customergender', referencedColumnName: 'genderid' })
  gender: Gender;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'customercreateddate',
    default: () => 'now()',
  })
  createdAt: Date;
}
