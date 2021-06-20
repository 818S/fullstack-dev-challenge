'use strict'
/**
 * Routes tests
 ******************************/
import { expect } from 'chai'
import { GLOBALS } from '../constants'
import { HTTP_CODE_NOT_FOUND, NOT_FOUND_JSON } from './common'
const request = require('supertest')
import TestServer from './TestServer'

// Use a test server
const server = new TestServer()
// Before all
before(function (done) {
  server.setup(done)
})
// After all
after(function (done) {
  server.teardown(done)
})

describe('Test unregistered routes', () => {
  it('It should respond with a Not Found message to GET /', async () => {
    const res = await request(server.get()).get('/')
    expect(res.statusCode).to.equal(HTTP_CODE_NOT_FOUND)
    expect(res.body).to.deep.equal(NOT_FOUND_JSON)
  })
  it('It should respond with a Not Found message to any arbitrary route for any method', async () => {
    const randomRoute = '/xyz'
    // Test all major methods
    const reqs = [request(server.get()).get(randomRoute), request(server.get()).post(randomRoute), request(server.get()).put(randomRoute), request(server.get()).delete(randomRoute), request(server.get()).patch(randomRoute)]
    for (const req of reqs) {
      const res = await req
      expect(res.statusCode).to.equal(HTTP_CODE_NOT_FOUND)
      expect(res.body).to.deep.equal(NOT_FOUND_JSON)
    }
  })
  it('It should respond to a request with the correct JSON headers', (done) => {
    request(server.get()).get('/123/456').set('Accept', GLOBALS.JSON_MIME_TYPE).expect('Content-Type', /json/).expect(HTTP_CODE_NOT_FOUND, done)
  })
})
