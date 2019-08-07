import ApiServiceBase from "./ApiServiceBase";
import {LoginRequest} from "../types/auth";

export default class AuthService extends ApiServiceBase {

    public async login(form: LoginRequest): Promise<boolean> {
        try {
            await this.apiService.post<boolean>('/login', { form });
        } catch (e) {
            return false;
        }
        return true;
    }
}
