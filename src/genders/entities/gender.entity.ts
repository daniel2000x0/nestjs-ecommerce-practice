import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ unique: true })
  genderid: number;
  @Column()
  gendername: string;
}
