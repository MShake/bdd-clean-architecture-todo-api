import { AuthenticationGateway } from '../../gateways';
import { Todo } from '../../models';
import { TodoRepository } from '../../repositories';

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
