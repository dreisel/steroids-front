import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, SET_TODOS, ToDosActionTypes} from '../types/actions/todos';
import {ToDo} from '../types/todos';

export interface TodosState {
    todos: ToDo[];
}

export function toDosReducer(state: TodosState, action: ToDosActionTypes): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.id)
            };
        case COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.id ? { ...t, completed: true } as ToDo : t)
            };
        case SET_TODOS:
            return {
                ...state,
                todos: action.todos
            };
    }
}
