import { InMemoryAuthenticationGateway } from '../../../adapters/secondaries/authentication/inMemoryAuthenticationGateway';
import { InMemoryTodoRepository } from '../../../adapters/secondaries/todos/InMemoryTodoRepository';
import { InMemoryUserRepository } from '../../../adapters/secondaries/users/InMemoryUserRepository';
import { Todo } from '../../models/todo';
import { RetrieveTodosByCustomerIdUseCase } from './retrieveTodosByCustomerIdUsecase';

const userRepository: InMemoryUserRepository = new InMemoryUserRepository();
const authenticationGateway: InMemoryAuthenticationGateway = new InMemoryAuthenticationGateway(
  userRepository,
);
const todoRepository: InMemoryTodoRepository = new InMemoryTodoRepository();
const retrieveTodosByCustomerId: RetrieveTodosByCustomerIdUseCase = new RetrieveTodosByCustomerIdUseCase(
  todoRepository,
  authenticationGateway,
);

describe('Retrieve Todo By Customer Id Use Case', () => {
  beforeEach(() => {
    userRepository.dropAllUsers();
    userRepository.addUsers(
      { id: '1', login: 'user', password: '41x5d8' },
      { id: '2', login: 'admin', password: '89f7u6' },
      { id: '3', login: 'test', password: 'x4f5e2' },
    );
    todoRepository.dropAllTodos();
    todoRepository.addTodos(
      {
        id: '7fcc281e-0260-4004-ac8b-9c0bb9d66a62',
        title: 'Learn to cook something good',
        customerId: '1',
        complete: false,
      },
      {
        id: '4b023e73-e0a2-4592-ad09-fc973060ee75',
        title: "Don't forget to feed the cat",
        customerId: '2',
        complete: true,
      },
      {
        id: '85ae3a27-e6ca-4bd6-a7b3-003821f8eaac',
        title: 'Wash motorcycle',
        customerId: '1',
        complete: false,
      },
      {
        id: '81374437-65b4-4f4b-88e6-69f8e29c8d29',
        title: 'Do gym exercices',
        customerId: '3',
        complete: true,
      },
      {
        id: '980d93d3-2a33-40ea-a069-da4e9e12a8d5',
        title:
          'Read Functional Programming in Scala by Paul Chiusano and Rúnar Bjarnason',
        customerId: '1',
        complete: false,
      },
    );
  });

  it('should only retrieve and return the todos of the authenticated customer', async () => {
    const userToken = 'Bearer 1.user';
    const userTodos: Array<Todo> = await retrieveTodosByCustomerId.handle(
      userToken,
    );
    expect(userTodos).toHaveLength(3);
    expectTodosToBelongTo(userTodos, '1');

    const adminToken = 'Bearer 2.admin';
    const adminTodos: Array<Todo> = await retrieveTodosByCustomerId.handle(
      adminToken,
    );
    expect(adminTodos).toHaveLength(1);
    expectTodosToBelongTo(adminTodos, '2');

    const testToken = 'Bearer 3.test';
    const testTodos: Array<Todo> = await retrieveTodosByCustomerId.handle(
      testToken,
    );
    expect(testTodos).toHaveLength(1);
    expectTodosToBelongTo(testTodos, '3');
  });

  it('should throw error if we have not a valid token', async () => {
    const invalidToken = 'Bearer invalid.token.not.valid';
    await expect(
      retrieveTodosByCustomerId.handle(invalidToken),
    ).rejects.toThrowError('Access Denied: Invalid Token');
  });
});

const expectTodosToBelongTo = (todos: Array<Todo>, customerId): void =>
  todos.forEach((todo) => expect(todo.customerId).toEqual(customerId));
