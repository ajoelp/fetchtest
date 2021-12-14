import {Server} from "http";
import {AddressInfo} from "net";
import * as https from "https";
import path from 'path'

require('isomorphic-fetch');

export type RequestMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RequestOptions = {
    headers?: HeadersInit
}

type BodyType = Record<string, any>

export class Test {
    app: Server;
    _server?: Server;

    defaultHeaders = {
        'Content-Type': 'application/json',
    }
    private defaultOptions: RequestOptions;

    constructor(app: Server, defaultOptions: RequestOptions = {}) {
        this.app = app
        this.defaultOptions = defaultOptions
    }

    // Define methods
    get(url: string, body?: BodyType, options?: RequestOptions) {
        return this._makeRequest(url, 'get', body, options);
    }

    delete(url: string, body?: BodyType, options?: RequestOptions) {
        return this._makeRequest(url, 'delete', body, options);
    }

    post(url: string, body?: BodyType, options?: RequestOptions) {
        return this._makeRequest(url, 'post', body, options);
    }

    put(url: string, body?: BodyType, options?: RequestOptions) {
        return this._makeRequest(url, 'put', body, options);
    }

    patch(url: string, body?: BodyType, options?: RequestOptions) {
        return this._makeRequest(url, 'patch', body, options);
    }

    private async _makeRequest(url: string, method: RequestMethods, body?: Record<string, any> | null, options?: RequestOptions) {
        const query = method === 'get' && body ? `?${new URLSearchParams(body).toString()}` : '';
        const address = path.join(this._serverAddress(), url, query);

        const result = await fetch(address, {
            method,
            body: method === 'get' ? null : JSON.stringify(body),
            headers: {
                ...this.defaultHeaders,
                ...this.defaultOptions.headers,
                ...options?.headers ?? {}
            }
        })
        await this._close()
        return Test.buildResponse(result);
    }

    private static async buildResponse(response: Response) {
        return {
            headers: response.headers,
            status: response.status,
            json: await response.json(),
        }
    }

    private _serverAddress() {
        const address = this.app.address();
        if(!address) this._server = this.app.listen(0)
        const port = (this.app.address() as AddressInfo).port;
        const protocol = this.app instanceof https.Server ? 'https': 'http';
        return `${protocol}://127.0.0.1:${port}`;
    }

    private async _close() {
        if(this._server) await new Promise(res => this._server!.close(res));
    }
}
