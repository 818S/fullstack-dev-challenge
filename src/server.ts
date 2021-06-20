'use strict'
/**
 * Server
 ******************************/
import express from 'express'
import cors from 'cors'
import { GLOBALS } from './constants'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import { isProd } from './utils'

// Init express
const app = express()

app.set('port', process.env.PORT || GLOBALS.PORT)

// Parse body params and attach them to req.body
app.use(express.json())

// Enable All CORS Requests
// TODO: lockdown to only certain routes for production
app.use(cors())

// Express only serves static assets in production
if (isProd()) {
  app.use(express.static('client/build'))
}

/**
 * Register the routes
 */
app.use('/', routes)

// Error handler middleware to catch em all!
app.use(errorHandler)

export default app