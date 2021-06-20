'use strict'
/**
 * Error handler (and reporter)
 ******************************/

import { response } from '../utils'

const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Delegate to the default Express error handler,
  // When the headers have already been sent to the client
  if (res.headersSent) {
    return next(err)
  }

  // TODO: Pass to an error reporter (e.g. Sentry)

  // Respond with 500 Internal Server error by default
  const statusCode = err.statusCode || 500
  res.status(statusCode).json(response(true, err.message))
}

export default errorHandler
