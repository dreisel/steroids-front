import AuthService from "./AuthService";
import {LoginRequest} from "../types/auth";

export default class MockAuthService extends AuthService {

    public async login({ username, password }: LoginRequest): Promise<boolean> {
        return Promise.resolve(username === 'user' &&  password === 'pass');
    }
}
