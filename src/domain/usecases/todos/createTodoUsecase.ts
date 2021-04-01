import { AuthenticationGateway } from '../../gateways';
import { AuthenticatedCustomer, Todo } from '../../models';
import { TodoRepository } from '../../repositories';

export class CreateTodoUseCase {
  private todoRepository: TodoRepository;
  private authenticationGateway: AuthenticationGateway;

  constructor(
    todoRepository: TodoRepository,
    authenticationGateway: AuthenticationGateway,
  ) {
    this.todoRepository = todoRepository;
    this.authenticationGateway = authenticationGateway;
  }

  handle = async (title: string, token: string): Promise<Todo> =>
    this.authenticationGateway
      .authenticate(token)
      .then(
        async (customer: AuthenticatedCustomer) =>
          await this.todoRepository.createTodo(title, customer.id),
      );
}
