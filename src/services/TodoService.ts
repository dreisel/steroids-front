import ConnectedService from './ConnectedService';
import { CreateToDoRequest, ToDo } from '../types/todos';

export default class TodoService extends ConnectedService {
  public async getTodos(): Promise<ToDo[]> {
    const todos: ToDo[] = await this.apiService.get<ToDo[]>('/todos');
    return todos;
  }

  public async addTodo(toDoRequest: CreateToDoRequest): Promise<ToDo> {
    const todo = await this.apiService.post<ToDo>('/todos', toDoRequest);
    return todo;
  }

  public async deleteTodo(id: string): Promise<void> {
    await this.apiService.delete<ToDo[]>('/todos/' + id);
  }

  public async updateTodo(todo: ToDo): Promise<ToDo> {
    const updatedTodo: ToDo = await this.apiService.put<ToDo>(
      '/todos/' + todo.id,
      todo
    );
    return updatedTodo;
  }
}
