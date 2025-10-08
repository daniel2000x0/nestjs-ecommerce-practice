import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ unique: true })
  roleid: number;
  @Column()
  rolename: string;
  @OneToMany(() => UsersRole, (userrole) => userrole.roleid)
  roleusers: UsersRole[];
}
