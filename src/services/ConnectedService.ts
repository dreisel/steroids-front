import ApiService from "./ApiService";

export default class ConnectedService {
    protected apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }
}
