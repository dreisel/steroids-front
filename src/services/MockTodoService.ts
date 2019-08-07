import TodoService from './TodoService';
import {CreateToDoRequest, ToDo} from '../types/todos';

const delay = async (seconds: number): Promise<void> => {
    return new Promise<void>((resolve => {
        setTimeout(resolve, seconds * 1000);
    }));
};

export default class MockTodoService extends TodoService {
    private todos: ToDo[] = [];

    public async getTodos(): Promise<ToDo[]> {
        return this.todos;
    }

    public async addTodo({ name }: CreateToDoRequest): Promise<ToDo> {
        await delay(3); // just to get a nicer feeling...
        const todo = { id: Math.random().toString(), name, completed: false };
        this.todos = [...this.todos, todo];
        return todo;
    }

    public async deleteTodo(id: string): Promise<void> {
        await delay(3); // just to get a nicer feeling...
        this.todos = this.todos.filter(todo => todo.id === id);
    }

    public async updateTodo(todo: ToDo): Promise<ToDo> {
        await delay(3); // just to get a nicer feeling...
        this.todos = this.todos.map(t => t.id === todo.id ? todo : t);
        return todo;
    }
}
