import { Todo } from 'src/domain/models/todo';
import { TodoRepository } from 'src/domain/repositories/todoRepository.interface';

export class RetrieveTodosUseCase {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  retrieveAllTodos = async () => await this.todoRepository.retrieveAllTodos();

  retrieveTodoById = async (id: string): Promise<Todo> => {
    if (id === '') {
      throw Error('Empty param is not allowed');
    }
    return await this.todoRepository.retrieveById(id).catch((err) => {
      throw err;
    });
  };
}
