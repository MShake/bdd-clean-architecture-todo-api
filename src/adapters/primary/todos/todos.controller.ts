import {
  Body,
  Headers,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { Todo } from '../../../domain/models/todo';
import { CreateTodoUseCase } from '../../../domain/usecases/todos/createTodoUsecase';
import { ModifyTodoUseCase } from '../../../domain/usecases/todos/ModifyTodoUsecase';
import { RetrieveTodosByCustomerIdUseCase } from '../../../domain/usecases/todos/retrieveTodosByCustomerIdUsecase';
import { RetrieveTodosUseCase } from '../../../domain/usecases/todos/retrieveTodosUsecase';

@Controller('todos')
export class TodosController {
  constructor(
    private retrieveTodoUseCases: RetrieveTodosUseCase,
    private createTodoUseCase: CreateTodoUseCase,
    private retrieveByCustomerId: RetrieveTodosByCustomerIdUseCase,
    private modifyTodo: ModifyTodoUseCase,
  ) {}

  @Get('/all')
  async findAll(): Promise<Array<Todo>> {
    return await this.retrieveTodoUseCases.retrieveAllTodos();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return await this.retrieveTodoUseCases.handle(id).catch((err) => {
      throw new NotFoundException(err.message);
    });
  }

  @Post()
  async create(
    @Body() todo: Todo,
    @Headers('authorization') token,
  ): Promise<Todo> {
    return await this.createTodoUseCase
      .handle(todo.title, token)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });
  }

  @Put()
  async modify(
    @Body() todo: Todo,
    @Headers('authorization') token,
  ): Promise<Todo> {
    return await this.modifyTodo.handle(todo, token).catch((err) => {
      throw new UnauthorizedException(err.message);
    });
  }

  @Get()
  async retrieveUserTodos(
    @Headers('authorization') token,
  ): Promise<Array<Todo>> {
    return await this.retrieveByCustomerId.handle(token).catch((err) => {
      throw new UnauthorizedException(err.message);
    });
  }
}
