import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users_roles')
export class UsersRole {
  @PrimaryGeneratedColumn()
  serial: number;
  @ManyToOne(() => User, (user) => user.rolusers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid', referencedColumnName: 'userid' })
  userid: User;
  @ManyToOne(()=>Role,(role)=>role.)
  @JoinColumn({ name: 'roleid', referencedColumnName: 'roleid' })
  roleid: Role;
}
