export type TAuthSubscriber = () => void;

export default class ApiService {

    protected unauthorisedSubscribers: Array<TAuthSubscriber> = [];

    public  subscribeToUnauthorized(listener: TAuthSubscriber): void {
        this.unauthorisedSubscribers.push(listener);
    }

    protected  emitUnauthorised():void {
        this.unauthorisedSubscribers.forEach(subscriber => subscriber());
    }

    public get<T>(url: string) {
        return this.call<T>(new Request(url, { method: 'get' }));
    }

    public post<T>(url: string, data: object) {
        return this.call<T>(new Request(url, { method: 'post', body: JSON.stringify(data) }));
    }

    public put<T>(url: string, data: object) {
        return this.call<T>(new Request(url, { method: 'put', body: JSON.stringify(data) }));
    }

    public delete<T>(url: string) {
        return this.call<T>(new Request(url, { method: 'delete' }));
    }

    protected async call<T>(request: Request): Promise<T> {
        const res = await fetch(request);
        if (res.status === 401) {
            this.emitUnauthorised();
            throw new Error('Unauthorized');
        }
        if (res.status !== 200) {
            throw new Error('Api Error');
        }
        return res.json();
    }
}
