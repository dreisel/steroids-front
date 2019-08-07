import ApiServiceBase from "./ApiServiceBase";
import {LoginRequest, User} from "../types/auth";

export default class AuthService extends ApiServiceBase {

    public async login(form: LoginRequest): Promise<User> {
        const user = await this.apiService.post<User>('/login', {form});
        return user;
    }

    public async getUser(): Promise<User> {
        const user = await this.apiService.get<User>('/me');
        return user;
    }
}
