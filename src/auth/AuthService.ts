
interface LoginRequest {
    username: string;
    password: string;
}
interface CallResponse<T> {

}
export default class Api {
    public async login(form: LoginRequest): Promise<boolean> {
        try {

        }
    }
    private call<T>(request: RequestInfo): Promise<T> {
        return fetch(request)
        .then((res) => {
            return res.json()
        })
    }
}
