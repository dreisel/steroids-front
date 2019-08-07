import ApiService from "./ApiService";

export default class ApiServiceBase {
    protected apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }
}
