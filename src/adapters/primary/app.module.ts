import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';
import * as configuration from './dependencies.configuration';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [],
  controllers: [TodosController, AuthenticationController],
  providers: [...configuration.dependencies],
})
export class AppModule {}
