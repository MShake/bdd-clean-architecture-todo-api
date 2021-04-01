import { User } from '../../../domain/models';
import { UserRepository } from '../../../domain/repositories';

export class MongoDBUserRepository implements UserRepository {
  retrieveUser(login: string, pasword: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
