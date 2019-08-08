import { useState, useReducer } from 'react';
import { toDosReducer } from '../reducers/todos';
import { todoService } from '../services';
import * as TodoActions from '../actions/todos';
import { ToDo } from '../types/todos';

type UseTodos = [
  boolean,
  (id: string) => Promise<void>,
  (id: string) => Promise<void>,
  (name: string) => Promise<void>,
  ToDo[]
];

export function useTodos(): UseTodos {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [{ todos }, dispatch] = useReducer(toDosReducer, { todos: [] });

  function withSafeLoading(
    task: (...args: any[]) => Promise<void>
  ): () => Promise<void> {
    return async (...args) => {
      if (isLoading) return;
      try {
        setLoading(true);
        await task(args);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
  }

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

  return [
    isLoading,
    withSafeLoading(deleteTodo),
    withSafeLoading(completeTodo),
    withSafeLoading(addTodo),
    todos
  ];
}
