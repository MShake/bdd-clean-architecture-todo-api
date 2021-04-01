import { InMemoryAuthenticationGateway } from '../../../adapters/secondaries/authentication/InMemoryAuthenticationGateway';
import { InMemoryTodoRepository } from '../../../adapters/secondaries/todos/InMemoryTodoRepository';
import { InMemoryUserRepository } from '../../../adapters/secondaries/users/InMemoryUserRepository';
import { Todo } from '../../models/todo';

import { ModifyTodoUseCase } from './ModifyTodoUsecase';

const todoRepository: InMemoryTodoRepository = new InMemoryTodoRepository();
const userRepository: InMemoryUserRepository = new InMemoryUserRepository();
const authenticationGateway: InMemoryAuthenticationGateway = new InMemoryAuthenticationGateway(
  userRepository,
);
const usecase: ModifyTodoUseCase = new ModifyTodoUseCase(
  todoRepository,
  authenticationGateway,
);

describe('Modify Todo By Id', () => {
  beforeEach(() => {
    todoRepository.dropAllTodos();
  });

  it('should return the modified todo', async () => {
    const token = 'Bearer 1.user';
    const modifiedTodo: Todo = {
      id: '7fcc281e-0260-4004-ac8b-9c0bb9d66a62',
      title: 'Learn to cook something good',
      customerId: '5',
      complete: true,
    };
    todoRepository.addTodos({
      id: '7fcc281e-0260-4004-ac8b-9c0bb9d66a62',
      title: 'Learn to cook something good',
      customerId: '5',
      complete: false,
    });
    const toodoAfterModification = await usecase.handle(modifiedTodo, token);
    expect(modifiedTodo.id).toEqual(toodoAfterModification.id);
    expect(modifiedTodo.title).toEqual(toodoAfterModification.title);
    expect(modifiedTodo.customerId).toEqual(toodoAfterModification.customerId);
    expect(modifiedTodo.complete).toEqual(toodoAfterModification.complete);
  });
});
