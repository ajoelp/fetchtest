## fetchtest

A wrapper for making HTTP request with fetch.


## Getting Started

Install fetchtest

```
npm install --savedev fetchtest
```

## Example

Pass an express or http.Server to fetchtest. This example assumes you are using express and jest.

```ts

import fetchtest from "fetchtest";
import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ status: ok }))

it('will succeed', async () => {
    const response = await fetchtest(app).get('/')
    expect(response.status).toEqual(200)
    expect(response.json).toEqual({ status: ok })
})

```


### Supported Methods

```ts
// GET
const payload = { test: true }
const response = fetchTest(app).get('/endpoint', queryParams) // Will output to /endpoint?test=true

// POST
const payload = { test: true }
const response = fetchTest(app).post('/endpoint', payload)

// PUT
const payload = { test: true }
const response = fetchTest(app).put('/endpoint', payload)

// PATCH
const payload = { test: true }
const response = fetchTest(app).patch('/endpoint', payload)

// DELETE
const payload = { test: true }
const response = fetchTest(app).delete('/endpoint', payload)
```
