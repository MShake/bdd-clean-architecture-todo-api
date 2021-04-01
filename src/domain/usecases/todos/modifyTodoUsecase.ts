import { AuthenticationGateway } from '../../gateways/authenticationGateway.interface';
import { Todo } from '../../models/todo';
import { TodoRepository } from '../../repositories/todoRepository.interface';

export class ModifyTodoUseCase {
  constructor(
    private todoRepository: TodoRepository,
    private authenticationGateway: AuthenticationGateway,
  ) {}

  handle = async (todo: Todo, token: string): Promise<Todo> =>
    this.authenticationGateway
      .authenticate(token)
      .then(async (customer) => await this.todoRepository.update(todo));
}
