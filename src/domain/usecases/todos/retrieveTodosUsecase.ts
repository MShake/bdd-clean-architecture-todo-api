import { Todo } from '../../models/todo';
import { TodoRepository } from '../../repositories/todoRepository.interface';

export class RetrieveTodosUseCase {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  retrieveAllTodos = async () => await this.todoRepository.retrieveAllTodos();

  handle = async (id: string): Promise<Todo> => {
    if (id === '') {
      throw Error('Empty param is not allowed');
    }
    return await this.todoRepository.retrieveById(id).catch((err) => {
      throw err;
    });
  };
}
