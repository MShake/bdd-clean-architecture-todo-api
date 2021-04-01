import axios from 'axios';
import { Todo } from '../../../domain/models/todo';
import { TodoRepository } from '../../../domain/repositories/todoRepository.interface';

const db = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export class JSONPlaceholderTodoRepository implements TodoRepository {
  constructor() {}
  update(todo: Todo): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  retrieveByCustomerId(customerId: string): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }

  createTodo(title: string): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  retrieveById = (id: string): Promise<Todo> => {
    return db.get('/todos/' + id).then((res) => {
      return res.data;
    });
  };

  retrieveAllTodos = (): Promise<Array<Todo>> =>
    db.get('/todos').then((res) => res.data);
}
