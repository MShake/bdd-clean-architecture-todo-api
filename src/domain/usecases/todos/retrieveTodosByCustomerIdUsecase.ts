import { AuthenticationGateway } from '../../gateways';
import { AuthenticatedCustomer, Todo } from '../../models';
import { TodoRepository } from '../../repositories';

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
      )
      .catch((error) => {
        throw error;
      });
}
