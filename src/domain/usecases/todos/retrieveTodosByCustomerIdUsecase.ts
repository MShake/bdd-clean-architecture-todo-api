import { AuthenticationGateway } from '../../gateways/authenticationGateway.interface';
import { AuthenticatedCustomer } from '../../models/authenticatedCustomer';
import { Todo } from '../../models/todo';
import { TodoRepository } from '../../repositories/todoRepository.interface';

export class RetrieveTodosByCustomerIdUseCase {
  private todoRepository: TodoRepository;
  private authenticationGateway: AuthenticationGateway;

  constructor(
    todoRepository: TodoRepository,
    authenticationGateway: AuthenticationGateway,
  ) {
    this.todoRepository = todoRepository;
    this.authenticationGateway = authenticationGateway;
  }

  handle = async (token: string): Promise<Array<Todo>> =>
    this.authenticationGateway
      .authenticate(token)
      .then(
        async (customer: AuthenticatedCustomer) =>
          await this.todoRepository.retrieveByCustomerId(customer.id),
      );
}
