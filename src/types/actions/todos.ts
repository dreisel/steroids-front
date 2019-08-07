import {ToDo} from '../todos';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export interface SetTodoAction { type: typeof ADD_TODO, todo: ToDo }
export interface AddTodoAction { type: typeof DELETE_TODO, id: string }
export interface CompleteTodoAction { type: typeof COMPLETE_TODO, id: string }
export interface DeleteTodoAction { type: typeof SET_TODOS, todos: ToDo[] }

export type ToDosActionTypes = SetTodoAction | AddTodoAction | CompleteTodoAction | DeleteTodoAction
