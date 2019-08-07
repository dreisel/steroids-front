import ApiService from "./ApiService";
import AuthService from "./AuthService";
import TodoService from "./TodoService";
import MockAuthService from "./MockAuthService";
import MockTodoService from "./MockTodoService";

const apiService = new ApiService();
let authService: AuthService;
let todoService: TodoService;

// todo: remove logic from code and move to build time resolution
if (process.env.NODE_ENV === 'development') {
    authService = new MockAuthService(apiService);
    todoService = new MockTodoService(apiService);
} else {
    authService = new AuthService(apiService);
    todoService = new TodoService(apiService);
}

export { apiService, authService, todoService };
