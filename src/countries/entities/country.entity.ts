import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column()
  countryid: number;

  @Column({ type: 'uuid', unique: true })
  countrycode: string;

  @Column({ length: 2 })
  countrycodealpha2: string;

  @Column({ length: 3 })
  countrycodealpha3: string;

  @Column()
  countrynameen: string;

  @Column()
  countrynamear: string;

  @OneToMany(() => Order, (order) => order.customercountry)
  orders: Order[];
}
