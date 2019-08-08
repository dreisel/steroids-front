import { useReducer } from 'react';
import { toDosReducer } from '../reducers/todos';
import { todoService } from '../services';
import * as TodoActions from '../actions/todos';
import { ToDo } from '../types/todos';
import { useSafeAsyncTaskWithLoading } from './utils';

type UseTodos = [boolean, (id: string) => Promise<void>, (id: string) => Promise<void>, (name: string) => Promise<void>, ToDo[]];

export function useTodos(): UseTodos {
  const [isLoading, withSafeLoading] = useSafeAsyncTaskWithLoading();
  const [{ todos }, dispatch] = useReducer(toDosReducer, { todos: [] });

  async function deleteTodo(id: string): Promise<void> {
    await todoService.deleteTodo(id);
    dispatch(TodoActions.deleteTodo(id));
  }

  async function completeTodo(id: string): Promise<void> {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      await todoService.updateTodo({ ...todo, completed: true });
    }
    dispatch(TodoActions.completeTodo(id));
  }

  async function addTodo(name: string): Promise<void> {
    const todo = await todoService.addTodo({ name });
    dispatch(TodoActions.addTodo(todo));
  }

  return [isLoading, withSafeLoading(deleteTodo), withSafeLoading(completeTodo), withSafeLoading(addTodo), todos];
}
