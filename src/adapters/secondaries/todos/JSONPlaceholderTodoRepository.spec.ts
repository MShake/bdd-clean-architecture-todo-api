import { JSONPlaceholderTodoRepository } from './JSONPlaceholderTodoRepository';

const todoRepository: JSONPlaceholderTodoRepository = new JSONPlaceholderTodoRepository();

describe('JSONPlaceholderTodoRepository', () => {
  describe('retrieve by id', () => {
    it('should return 1 result', async () => {
      const id = '4';
      const todo = await todoRepository.retrieveById(id);
      expect(todo).toBeDefined();
      expect(todo.id).toBe(4);
    });
  });

  describe('retrieve all todos', () => {
    it('should return 2 results', async () => {
      expect(await todoRepository.retrieveAllTodos()).toHaveLength(200);
    });
  });
});
