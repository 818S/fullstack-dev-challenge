'use strict'
/**
 * API Request Validator middleware
 ******************************/

import Ajv from 'ajv'
import response from '../utils/response'
import { GLOBALS } from '../constants'

const ajv = new Ajv()

type opts = {
  schema: Object // A AJV JSON schema
  json?: boolean
}

/**
 * Middleware that validates the request content-type and body against the
 * specified AJV schema using AJV
 *
 * @param  {opts} opts  The validation options
 */
const validate = (opts: opts) => (req: any, res: any, next: any) => {
  // Ensure request is JSON by default or if set explicitly to true
  if ((opts.json || opts.json === undefined) && !req.is(GLOBALS.JSON_MIME_TYPE)) return res.status(400).json(response(true, 'Content must be JSON'))

  // TODO: cache the compilation
  const validate = ajv.compile(opts.schema)
  const { body } = req

  // Validate request body against the schema provided
  // Reject request with 400 Bad Request code if invalid
  if (!validate(body)) return res.status(400).json(response(true, 'Invalid or missing params'))

  // Otherwise, passthrough
  next()
}

export default validate
