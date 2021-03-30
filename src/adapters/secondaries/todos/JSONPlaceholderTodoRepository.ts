import { Todo } from '../../../domain/models/todo';
import axios from 'axios';
import { TodoRepository } from '../../../domain/repositories';

const db = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export class JSONPlaceholderTodoRepository implements TodoRepository {
  constructor() {}

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
