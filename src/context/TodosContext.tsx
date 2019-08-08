import React from 'react';
import { ToDo } from '../types/todos';
import { useTodos } from '../hooks/todos';

export interface ITodosContext {
  isLoading: boolean;
  deleteTodo: (id: string) => Promise<void>;
  completeTodo: (id: string) => Promise<void>;
  addTodo: (name: string) => Promise<void>;
  todos: ToDo[];
}

export const TodoContext = React.createContext<ITodosContext>(
  {} as ITodosContext
);

export const TodoContextProvider: React.FC<{}> = ({ children }) => {
  const [isLoading, deleteTodo, completeTodo, addTodo, todos] = useTodos();
  return (
    <TodoContext.Provider
      value={{
        isLoading,
        deleteTodo,
        completeTodo,
        addTodo,
        todos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
