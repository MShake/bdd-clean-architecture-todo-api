import { User } from '../models';

export interface UserRepository {
  retrieveUser(login: string, pasword: string): Promise<User>;
}
