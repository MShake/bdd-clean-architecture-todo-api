import { Todo } from '../models';

export interface TodoRepository {
  createTodo(title: string, customerId: string): Promise<Todo>;
  retrieveAllTodos(): Promise<Array<Todo>>;
  retrieveById(id: string): Promise<Todo>;
  retrieveByCustomerId(customerId: string): Promise<Array<Todo>>;
  update(todo: Todo): Promise<Todo>;
}
