import { InMemoryTodoRepository } from './../../secondaries/todos/InMemoryTodoRepository';

import { TodosController } from './todos.controller';
import { InMemoryAuthenticationGateway } from '../../secondaries/authentication/inmemory-authentication-gateway';
import { InMemoryUserRepository } from './../../secondaries/users/InMemoryUserRepository';
import { Todo } from './../../../domain/models/todo';
import { CreateTodoUseCase } from './../../../domain/usecases/todos/createTodoUsecase';
import { ModifyTodoUseCase } from '../../../domain/usecases/todos/modifyTodoUseCase';
import { RetrieveTodosByCustomerIdUseCase } from './../../../domain/usecases/todos/retrieveTodosByCustomerIdUsecase';
import { RetrieveTodosUseCase } from './../../../domain/usecases/todos/retrieveTodosUsecase';

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
const retrieveTodosUsecases: RetrieveTodosUseCase = new RetrieveTodosUseCase(
  todoRepository,
);
const modifyTodoUseCase: ModifyTodoUseCase = new ModifyTodoUseCase(
  todoRepository,
  authenticationGateway,
);
const todosController: TodosController = new TodosController(
  retrieveTodosUsecases,
  createTodoUsecase,
  retrieveTodosByCustomerIdUsecase,
  modifyTodoUseCase,
);

const todo: Todo = {
  id: 'abc',
  title: 'Learn NestJS',
  customerId: '789',
  complete: false,
};

describe('TodosController', () => {
  beforeEach(() => {
    todoRepository.dropAllTodos();
    todoRepository.addTodos(
      { id: 'abc', title: 'Learn NestJS', customerId: '789', complete: true },
      { id: 'xgs', title: 'Learn Redux', customerId: '789', complete: false },
    );
  });

  describe('findAll() method', () => {
    it('should call the retrieveAllTodos usecase', async () => {
      const handle = jest.spyOn(retrieveTodosUsecases, 'retrieveAllTodos');
      await todosController.findAll();
      expect(handle).toHaveBeenCalled();
    });
  });

  describe('retrieveUserTodos() method', () => {
    it('should call the retrieveAllTodos usecase', async () => {
      const handle = jest.spyOn(retrieveTodosByCustomerIdUsecase, 'handle');
      await todosController.retrieveUserTodos('Bearer 1.user');
      expect(handle).toHaveBeenCalled();
    });
  });

  describe('modify() method', () => {
    it('should call the modifyTodo usecase', async () => {
      const handle = jest.spyOn(modifyTodoUseCase, 'handle');
      await todosController.modify(todo, 'Bearer 1.user');
      expect(handle).toHaveBeenCalled();
    });
  });

  describe('create() method', () => {
    it('should call the createTodo usecase', async () => {
      const handle = jest.spyOn(createTodoUsecase, 'handle');
      await todosController.create(todo, 'Bearer 1.user');
      expect(handle).toHaveBeenCalled();
    });
  });

  describe('findById() method', () => {
    it('should call retrieveTodo usecases', async () => {
      const handle = jest.spyOn(retrieveTodosUsecases, 'handle');
      await todosController.findById('xgs');
      expect(handle).toHaveBeenCalled();
    });
  });
});
