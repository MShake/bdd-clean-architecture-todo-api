import { Todo } from '../models/todo';

export interface TodoRepository {
  createTodo(title: string, customerId: string): Promise<Todo>;
  retrieveAllTodos(): Promise<Array<Todo>>;
  retrieveById(id: string): Promise<Todo>;
  retrieveByCustomerId(customerId: string): Promise<Array<Todo>>;
}
