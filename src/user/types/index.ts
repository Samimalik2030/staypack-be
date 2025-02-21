import { User } from '../schema/user.schema';

export enum Role {
    STANDARD_USER = 'Standard User',
    STUDENT = 'Student',
    ADMIN = 'Admin',
    HOST = 'Host',
    HOTEL_OWNER = 'Hotel Owner',
    DRY_CLEANER = 'Dry Cleaner'
}
  

export interface IUser {
  user: User;
}
