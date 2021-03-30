import {
  Body,
  Headers,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Todo } from '../../../domain/models';
import {
  CreateTodoUseCase,
  RetrieveTodosByCustomerIdUseCase,
  RetrieveTodosUseCase,
} from '../../../domain/usecases';

@Controller('todos')
export class TodosController {
  constructor(
    private retrieveTodoUseCases: RetrieveTodosUseCase,
    private createTodoUseCase: CreateTodoUseCase,
    private retrieveByCustomerId: RetrieveTodosByCustomerIdUseCase,
  ) {}

  @Get('/all')
  async findAll(): Promise<Array<Todo>> {
    return await this.retrieveTodoUseCases.retrieveAllTodos();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return await this.retrieveTodoUseCases.retrieveTodoById(id).catch((err) => {
      throw new NotFoundException(err.message);
    });
  }

  @Post()
  async create(
    @Body() todo: Todo,
    @Headers('authorization') token,
  ): Promise<Todo> {
    return await this.createTodoUseCase
      .createTodo(todo.title, token)
      .catch((err) => {
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
