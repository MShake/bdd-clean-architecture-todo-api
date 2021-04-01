import { User } from '../models/user';

export interface UserRepository {
  retrieveUser(login: string, pasword: string): Promise<User>;
}
