import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthEntity } from '../interfaces/auth-entity.interface';

export class AuthEntityMapper {
  static fromUser(user: User): AuthEntity {
    return {
      id: user.userid,
      email: user.useremail,
      name: user.userfirstname,
      type: 'user',
    };
  }

  static fromCustomer(customer: Customer): AuthEntity {
    return {
      id: customer.customerid,
      email: customer.email,
      name: customer.firstName,
      type: 'customer',
    };
  }
}
