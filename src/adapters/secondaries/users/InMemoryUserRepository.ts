import { User } from '../../../domain/models/user';
import { UserRepository } from '../../../domain/repositories/userRepository.interface';

export class InMemoryUserRepository implements UserRepository {
  users: Array<User> = [
    { id: '1', login: 'user', password: '41x5d8' },
    { id: '2', login: 'admin', password: '89f7u6' },
  ];

  retrieveUser = (login: string, password: string): Promise<User> =>
    new Promise((resolve, reject) => {
      const user = this.users.find(
        (user) => user.login === login && user.password === password,
      );
      return user ? resolve(user) : reject();
    });

  addUsers = (...users: Array<User>): void => {
    users.map((user) => this.users.push(user));
  };

  dropAllUsers = (): void => {
    this.users = [];
  };
}
