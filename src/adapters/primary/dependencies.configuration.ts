import { FactoryProvider, Provider } from '@nestjs/common';
import {
  AuthenticateCustomerUseCase,
  CreateTodoUseCase,
  RetrieveTodosByCustomerIdUseCase,
  RetrieveTodosUseCase,
} from '../../domain/usecases';
import { InMemoryAuthenticationGateway } from '../secondaries/authentication/InMemoryAuthenticationGateway';
import { JWTTokenAuthenticationGateway } from '../secondaries/authentication/JWTTokenAuthenticationGateway';
import { InMemoryTodoRepository } from '../secondaries/todos/InMemoryTodoRepository';
import { InMemoryUserRepository } from '../secondaries/users/InMemoryUserRepository';
import { MongoDBUserRepository } from '../secondaries/users/MongoDBUserRepository';
import { JSONPlaceholderTodoRepository } from '../secondaries/todos/JSONPlaceholderTodoRepository';

const userRepositoryProvider = <T>(repository: T): Provider<T> => {
  return { provide: MongoDBUserRepository, useValue: repository };
};

const provideInMemoryAuthenticationGateway = (): FactoryProvider<InMemoryAuthenticationGateway> => {
  return {
    provide: JWTTokenAuthenticationGateway,
    useFactory: (userRepository: MongoDBUserRepository) =>
      new InMemoryAuthenticationGateway(userRepository),
    inject: [MongoDBUserRepository],
  };
};

const authenticateCustomerUseCase = {
  provide: AuthenticateCustomerUseCase,
  useFactory: (authenticationGateway: JWTTokenAuthenticationGateway) => {
    return new AuthenticateCustomerUseCase(authenticationGateway);
  },
  inject: [JWTTokenAuthenticationGateway],
};

const createTodosUseCase = {
  provide: CreateTodoUseCase,
  useFactory: (
    todoRepository: JSONPlaceholderTodoRepository,
    authenticationGateway: JWTTokenAuthenticationGateway,
  ) => {
    return new CreateTodoUseCase(todoRepository, authenticationGateway);
  },
  inject: [JSONPlaceholderTodoRepository, JWTTokenAuthenticationGateway],
};

const retrieveTodosByCustomerIdUseCase = {
  provide: RetrieveTodosByCustomerIdUseCase,
  useFactory: (
    todoRepository: JSONPlaceholderTodoRepository,
    authenticationGateway: JWTTokenAuthenticationGateway,
  ) => {
    return new RetrieveTodosByCustomerIdUseCase(
      todoRepository,
      authenticationGateway,
    );
  },
  inject: [JSONPlaceholderTodoRepository, JWTTokenAuthenticationGateway],
};

const todoRepositoryProvider = <T>(repository: T): Provider<T> => {
  return { provide: JSONPlaceholderTodoRepository, useValue: repository };
};

const retrieveTodosUseCase = {
  provide: RetrieveTodosUseCase,
  useFactory: (todoRepository: JSONPlaceholderTodoRepository) => {
    return new RetrieveTodosUseCase(todoRepository);
  },
  inject: [JSONPlaceholderTodoRepository],
};

export const dependencies = [
  userRepositoryProvider(new InMemoryUserRepository()),
  provideInMemoryAuthenticationGateway(),
  todoRepositoryProvider(new InMemoryTodoRepository()),
  authenticateCustomerUseCase,
  retrieveTodosUseCase,
  createTodosUseCase,
  retrieveTodosByCustomerIdUseCase,
];
