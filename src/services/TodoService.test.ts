import TodoService from './TodoService';
import ApiService from './ApiService';
jest.mock('./ApiService');

// ToDo: clean this shit out.

function mockApi(call: Function) {
    // @ts-ignore
    ApiService.mockImplementation(() => {
        return {
            call,
        };
    });
}
describe('ToDoService', () => {
    beforeEach(() => {
        // @ts-ignore
        ApiService.mockClear();
    });

    test('get todos successfully', async () => {
        mockApi(async () => {
            return [
                { id: '1', name: '1', completed: false },
                { id: '2', name: '2', completed: true }
            ];
        });
        const apiService = new ApiService();
        const todoService: TodoService = new TodoService(apiService);
        const user = await todoService.getTodos();
        expect(user).toEqual([
            { id: '1', name: '1', completed: false },
            { id: '2', name: '2', completed: true }
        ]);
    });

    test('get user fail', async () => {
        const error = new Error('Api Error');
        mockApi(async () => {
            throw error;
        });
        const apiService = new ApiService();
        const todoService: TodoService = new TodoService(apiService);

        expect(todoService.getTodos()).rejects.toEqual(error);
    });
});
