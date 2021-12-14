import express from 'express';
import fetchtest from "./lib";
import {RequestMethods} from "./Test";

const methods = [
    'get',
    'post',
    'put',
    'patch',
    'delete'
] as RequestMethods[];

describe('fetchtest', () => {
    describe('express server', () => {
        describe.each(methods)('all method tests', function (m) {
            const method = m as RequestMethods;

            it('will submit a request', async () => {
                const app = express()
                const response = { data: true }
                app[method]('/', (req, res) => res.json(response));
                const result = await fetchtest(app)[method]('/')
                expect(result.json).toEqual(response);
            })

            it('will submit a request with headers', async () => {
                const app = express()
                let headers = {}
                app[method]('/', (req, res) => {
                    headers = {...req.headers}
                    return res
                        .status(200)
                        .json({})
                });
                const reqHeaders = {
                    'authorization': 'Bearer token123',
                    'accept': 'application/json'
                }
                const result = await fetchtest(app)[method]('/', undefined, {
                    headers: reqHeaders
                })
                expect(headers).toEqual(expect.objectContaining(reqHeaders));
                expect(result.status).toEqual(200);
            })

            it('will submit a request with defaultHeaders', async () => {
                const app = express()
                let headers = {}
                app[method]('/', (req, res) => {
                    headers = {...req.headers}
                    return res
                        .status(200)
                        .json({})
                });
                const reqHeaders = {
                    'authorization': 'Bearer token123',
                    'accept': 'application/json'
                }
                const result = await fetchtest(app, {
                    headers: reqHeaders
                })[method]('/')
                expect(headers).toEqual(expect.objectContaining(reqHeaders));
                expect(result.status).toEqual(200);
            })

        });
        it.each([
            'post',
            'put',
            'patch',
            'delete'
        ])('will submit a %s with body', async (m) => {
            const method = m as RequestMethods;
            let body = {};
            const app = express()
            app.use(express.json())
            app[method]('/', (req, res) => {
                body = req.body
                return res.json({})
            });
            const payload = {
                data: 1,
                body: 'Test test',
                boolean: false,
            }
            const result = await fetchtest(app)[method]('/', payload)
            expect(body).toEqual(expect.objectContaining(payload));
            expect(result.status).toEqual(200);
        })

        it('will attach query params for get requests', async() => {
            let query = {};
            const app = express()
            app.use(express.json())
            app.get('/', (req, res) => {
                query = req.query
                return res.json({})
            });
            const payload = {
               test: "Test Data"
            }
            const result = await fetchtest(app).get('/', payload)
            expect(query).toEqual(expect.objectContaining(payload));
            expect(result.status).toEqual(200);
        })
    })


})
