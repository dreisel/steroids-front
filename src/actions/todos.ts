import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, SET_TODOS, ToDosActionTypes} from '../types/actions/todos';
import {ToDo} from '../types/todos';

export const addTodo = (todo: ToDo): ToDosActionTypes => ({ type: ADD_TODO, todo });
export const deleteTodo = (id: string): ToDosActionTypes => ({ type: DELETE_TODO, id });
export const completeTodo = (id: string): ToDosActionTypes => ({ type: COMPLETE_TODO, id });
export const setTodos = (todos: ToDo[]): ToDosActionTypes => ({ type: SET_TODOS, todos });
