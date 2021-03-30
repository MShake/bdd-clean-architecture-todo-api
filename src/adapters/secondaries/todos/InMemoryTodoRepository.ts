import { Todo } from '../../../domain/models/todo';
import { TodoRepository } from '../../../domain/repositories/todoRepository.interface';
import { v4 as uuid } from 'uuid';

export class InMemoryTodoRepository implements TodoRepository {
  todos: Array<Todo> = [
    {
      id: '7fcc281e-0260-4004-ac8b-9c0bb9d66a62',
      title: 'Learn to cook something good',
      customerId: '5',
      complete: false,
    },
    {
      id: '4b023e73-e0a2-4592-ad09-fc973060ee75',
      title: "Don't forget to feed the cat",
      customerId: '8',
      complete: true,
    },
  ];

  constructor() {}

  createTodo = (title: string, customerId: string): Promise<Todo> => {
    const todo: Todo = { id: uuid(), title, customerId, complete: false };
    this.todos.push(todo);
    return new Promise((resolve) => resolve(todo));
  };

  retrieveAllTodos = (): Promise<Array<Todo>> =>
    new Promise((resolve) => resolve(this.todos));

  retrieveById = async (id: string): Promise<Todo> => {
    return new Promise((resolve, reject) => {
      const todo: Todo = this.todos.find((todo) => todo.id === id);
      if (todo) resolve(todo);
      reject(new Error('Your ID is not know about our service'));
    });
  };

  retrieveByCustomerId = (customerId: string): Promise<Array<Todo>> =>
    new Promise((resolve) =>
      resolve(this.todos.filter((todo) => todo.customerId === customerId)),
    );

  // InMemory Utilitaries functions
  addTodos = (...todos: Todo[]) => todos.map((t) => this.todos.push(t));
  addTodosArray = (todos: Todo[]) => todos.map((t) => this.todos.push(t));
  dropAllTodos = () => (this.todos = []);
}
