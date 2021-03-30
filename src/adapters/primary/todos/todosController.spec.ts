import { InMemoryTodoRepository } from '../../secondaries/todos/InMemoryTodoRepository';
import { Todo } from './../../../domain/models';
import { TodosController } from './todos.controller';
import { InMemoryAuthenticationGateway } from '../../secondaries/authentication/InMemoryAuthenticationGateway';
import { InMemoryUserRepository } from '../../secondaries/users/InMemoryUserRepository';

import {
  CreateTodoUseCase,
  RetrieveTodosByCustomerIdUseCase,
  RetrieveTodosUseCase,
} from '../../../domain/usecases';

const todoRepository = new InMemoryTodoRepository();
const userRepository = new InMemoryUserRepository();
const authenticationGateway = new InMemoryAuthenticationGateway(userRepository);
const retrieveTodosByCustomerIdUsecase: RetrieveTodosByCustomerIdUseCase = new RetrieveTodosByCustomerIdUseCase(
  todoRepository,
  authenticationGateway,
);
const createTodoUsecase: CreateTodoUseCase = new CreateTodoUseCase(
  todoRepository,
  authenticationGateway,
);
const retrieveTodoUsecases: RetrieveTodosUseCase = new RetrieveTodosUseCase(
  todoRepository,
);
const todosController: TodosController = new TodosController(
  retrieveTodoUsecases,
  createTodoUsecase,
  retrieveTodosByCustomerIdUsecase,
);

describe('TodosController', () => {
  beforeEach(() => {
    todoRepository.dropAllTodos();
    todoRepository.addTodos(
      { id: 'abc', title: 'Learn NestJS', customerId: '789', complete: true },
      { id: 'xgs', title: 'Learn Redux', customerId: '789', complete: false },
    );
  });

  describe('retrieve all todos', () => {
    it('should return an array of todos', async () => {
      const todos: Array<Todo> = [
        {
          id: 'abc',
          title: 'Learn NestJS',
          customerId: '789',
          complete: true,
        },
        { id: 'xgs', title: 'Learn Redux', customerId: '789', complete: false },
      ];
      jest
        .spyOn(retrieveTodoUsecases, 'retrieveAllTodos')
        .mockResolvedValue(todos);

      expect(await todosController.findAll()).toBe(todos);
    });
  });

  describe('retrieve a todo by id', () => {
    it('should return one todo', async () => {
      const todo: Todo = {
        id: 'xgs',
        title: 'Learn Redux',
        customerId: '789',
        complete: false,
      };
      jest
        .spyOn(retrieveTodoUsecases, 'retrieveTodoById')
        .mockResolvedValue(todo);

      expect(await todosController.findById('xgs')).toBe(todo);
    });
  });
});
