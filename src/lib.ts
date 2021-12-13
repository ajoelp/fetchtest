import http, {RequestListener, Server} from 'http'
import {Test} from "./Test";

export default function fetchtest(app: RequestListener | Server) {

    if(typeof app === 'function'){
        app = http.createServer(app);
    }

    return new Test(app);
}
