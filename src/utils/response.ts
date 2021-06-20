'use strict'
/**
 * API Response builder
 ******************************/

import IResponse from 'src/interfaces/IResponse'

/**
 * Creates a standard API response (IResponse)
 * @param  {Boolean} isError        Whether an error occured
 * @param  {String}  message        Status message
 * @param  {Object || Array}  data  The requested data where applicable
 * @return {Object}                 Standard response
 */
export default function (isError: boolean, message: string, data?: Object | Array<Object>) {
  const response: IResponse = {
    status: {
      error: isError,
      message: message,
    },
  }

  if (data) response.data = data

  return response
}
