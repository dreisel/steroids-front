import ApiServiceBase from "./ApiServiceBase";

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}

export default class UserService extends ApiServiceBase {
    public async getUser(): Promise<IUser> {
        const user: IUser = await this.apiService.get<IUser>('/me');
        return user;
    }
}
