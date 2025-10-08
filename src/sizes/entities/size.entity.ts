import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column({ unique: true })
  sizeid: number;

  @Column()
  sizename: string;
}
