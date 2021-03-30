import { AuthenticatedCustomer } from '../../models/authenticatedCustomer';
import { AuthenticationGateway } from './../../gateways/authenticationGateway.interface';
import { Todo } from './../../models/todo';
import { TodoRepository } from './../../repositories/todoRepository.interface';

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

  createTodo = async (title: string, token: string): Promise<Todo> =>
    this.authenticationGateway
      .authenticate(token)
      .then(
        async (customer: AuthenticatedCustomer) =>
          await this.todoRepository.createTodo(title, customer.id),
      )
      .catch((error) => {
        throw error;
      });
}
