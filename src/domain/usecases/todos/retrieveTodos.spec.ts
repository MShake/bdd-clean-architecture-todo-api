import { Todo } from '../../models/todo';
import { InMemoryTodoRepository } from './../../../adapters/secondaries/todos/InMemoryTodoRepository';
import { RetrieveTodosUseCase } from './retrieveTodosUsecase';

const todoRepository: InMemoryTodoRepository = new InMemoryTodoRepository();
const usecase: RetrieveTodosUseCase = new RetrieveTodosUseCase(todoRepository);
const todos: Array<Todo> = [
  { id: 'abc', title: 'Apprendre NestJS', customerId: '789', complete: true },
  { id: 'v4d', title: 'Apprendre Redux', customerId: '789', complete: false },
  { id: 'xgs', title: 'Apprendre NgRx', customerId: '789', complete: false },
];

describe('Retrieve todos usecase', () => {
  beforeEach(() => {
    todoRepository.dropAllTodos();
    todoRepository.addTodosArray(todos);
  });

  describe('Retrieve all', () => {
    it('should retrieve all todos', async () => {
      const retrievedTodos: Array<Todo> = await usecase.retrieveAllTodos();
      expect(retrievedTodos).toHaveLength(todos.length);
    });
  });

  describe('Retrieve by ID', () => {
    it('should retrieve the right todo', async () => {
      const todo: Todo = await usecase.handle('xgs');
      expect(todo.title).toBe('Apprendre NgRx');
    });

    it('should throw error if param is an empty string', async () => {
      await expect(usecase.handle('')).rejects.toThrowError(
        'Empty param is not allowed',
      );
    });

    it('should throw error if unknow ID is pass as param', async () => {
      await expect(usecase.handle('unknowId')).rejects.toThrowError(
        'Your ID is not know about our service',
      );
    });
  });
});
