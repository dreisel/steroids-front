export interface ToDo {
    id: string;
    name: string;
    completed: boolean;
}

export interface CreateToDoRequest {
    name: string;
}
