import { AuthenticationGateway } from '../../gateways/authenticationGateway.interface';
import { AuthenticatedCustomer } from '../../models/authenticatedCustomer';
import { Todo } from '../../models/todo';
import { TodoRepository } from '../../repositories/todoRepository.interface';

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
