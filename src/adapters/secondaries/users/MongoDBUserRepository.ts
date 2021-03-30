import { User } from '../../../domain/models/user';
import { UserRepository } from '../../../domain/repositories/userRepository.interface';

export class MongoDBUserRepository implements UserRepository {
  retrieveUser(login: string, pasword: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
