import http, {RequestListener, Server} from 'http'
import {RequestOptions, Test, BodyType } from "./Test";

export default function fetchtest(app: RequestListener | Server, defaultOptions: RequestOptions = {}) {

    if(typeof app === 'function'){
        app = http.createServer(app);
    }

    return new Test(app, defaultOptions);
}

export { RequestOptions, BodyType }
