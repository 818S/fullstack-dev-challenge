'use strict'
/**
 * Test Server
 * A server wrapper for testing
 ******************************/
import app from '../server'

class TestServer {
  private server: any
  
  constructor() {
    this.server = null
  }

  get() {
    return this.server
  }
  
  // Sets up a server if not already setup 
  setup(done: () => void) {
    if (!this.server) {
      // Use random port
      this.server = app.listen(0, done)      
      return
    }
    done()
  }
  
  // Teardown the server at the end
  // See https://github.com/visionmedia/supertest/issues/437
  teardown(done: () => void) {
    this.server.close(() => {
      this.server = null
      done()
    })
  }
}


export default TestServer
