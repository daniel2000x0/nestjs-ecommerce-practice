import { User } from '../../users/entities/user.entity';

/**
 * Detalles del usuario para creación o autenticación
 */
export type UserDetails = {
  userfirstname: string;
  userlastname: string;
  useremail: string;
  userpassword: string;
  userbirthdate: Date;
  usergender: number;
  userstatus?: boolean; // opcional, por defecto es false
};

/**
 * Callback usado en estrategias Passport
 */
export type Done = (err: Error | null, user?: User) => void;
