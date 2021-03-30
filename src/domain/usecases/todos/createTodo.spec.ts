import { InMemoryAuthenticationGateway } from '../../../adapters/secondaries/authentication/InMemoryAuthenticationGateway';
import { Todo } from '../../models/todo';
import { InMemoryTodoRepository } from '../../../adapters/secondaries/todos/InMemoryTodoRepository';
import { CreateTodoUseCase } from './createTodoUsecase';
import { InMemoryUserRepository } from '../../../adapters/secondaries/users/InMemoryUserRepository';

const todoRepository: InMemoryTodoRepository = new InMemoryTodoRepository();
const userRepository: InMemoryUserRepository = new InMemoryUserRepository();
const authenticationGateway: InMemoryAuthenticationGateway = new InMemoryAuthenticationGateway(
  userRepository,
);
const usecase: CreateTodoUseCase = new CreateTodoUseCase(
  todoRepository,
  authenticationGateway,
);

describe('Create Todo Usecase', () => {
  beforeEach(() => {
    userRepository.dropAllUsers();
    userRepository.addUsers({ id: '1', login: 'user', password: '41x5d8' });
  });

  it('should create a todo', async () => {
    const token = '1.user';
    const todo: Todo = await usecase.createTodo('Practice guitar', token);
    expect(todo).toBeDefined();
    expect(todo.id).toBeDefined();
    expect(todo.customerId).toBe('1');
    expect(todo.title).toEqual('Practice guitar');
    expect(todo.complete).toBeFalsy();
  });

  it('should throw error if we have not a valid token', async () => {
    const token = 'invalidToken.toke.bidon';
    await expect(
      usecase.createTodo('Practice guitar', token),
    ).rejects.toThrowError('Access Denied: Invalid Token');
  });
});
