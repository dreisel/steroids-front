// @ts-ignore
import UserService from "./UserService";
import ApiService from "./ApiService";
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
describe('UserService', () => {
    beforeEach(() => {
        // @ts-ignore
        ApiService.mockClear();
    });

    test('get user successfully', async () => {
        mockApi(async () => {
            return { id: '1', avatar: '1', name: 'daniel' };
        });
        const apiService = new ApiService();
        const userService: UserService = new UserService(apiService);
        const user = await userService.getUser();
        expect(user).toEqual({ id: '1', avatar: '1', name: 'daniel' });
    });

    test('get user fail', async () => {
        const error = new Error('Api Error');
        mockApi(async () => {
            throw error;
        });
        const apiService = new ApiService();
        const userService: UserService = new UserService(apiService);

        expect(userService.getUser()).rejects.toEqual(error);
    });
});
