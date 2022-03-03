import http, {RequestListener, Server} from 'http'
import {RequestOptions, Test, BodyType, RequestResponse } from "./Test";

export default function fetchtest(app: RequestListener | Server, defaultOptions: RequestOptions = {}) {

    if(typeof app === 'function'){
        app = http.createServer(app);
    }

    return new Test(app, defaultOptions);
}

export { RequestOptions, BodyType, RequestResponse }
