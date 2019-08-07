import React, {useReducer, useState} from 'react';
import {todoService} from '../services';
import {toDosReducer} from '../reducers/todos';
import * as TodoActions from '../actions/todos';
import {ToDo} from '../types/todos';

export interface ITodosContext {
    isLoading: boolean
    deleteTodo: (id: string) => Promise<void>
    completeTodo: (id: string) => Promise<void>
    addTodo: (name: string) => Promise<void>
    todos: ToDo[]
}

export const TodoContext = React.createContext<ITodosContext >({} as ITodosContext);

export const TodoContextProvider: React.FC<{}> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [{ todos }, dispatch] = useReducer(toDosReducer, { todos: [] });
    async function deleteTodo(id: string) {
        try {
            setLoading(true);
            await todoService.deleteTodo(id);
            dispatch(TodoActions.deleteTodo(id));
        } catch (e) {

        } finally {
            setLoading(false);
        }

    }

    async function completeTodo(id: string) {
        try {
            setLoading(true);
            const todo = todos.find(t => t.id === id);
            if (todo && !todo.completed) {
                await todoService.updateTodo({...todo, completed: true});
            }
            dispatch(TodoActions.completeTodo(id));
        } catch (e) {

        } finally {
            setLoading(false);
        }

    }

    async function addTodo(name: string) {
        try {
            setLoading(true);
            const todo = await todoService.addTodo({ name });
            dispatch(TodoActions.addTodo(todo));
        } catch (e) {

        } finally {
            setLoading(false);
        }

    }

    return <TodoContext.Provider
        value={{
            isLoading,
            deleteTodo,
            completeTodo,
            addTodo,
            todos
        }}
    >
        {children}
    </TodoContext.Provider>;
};
