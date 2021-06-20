'use strict'
/**
 * API Response
 ******************************/
export default interface IResponse {
  status: {
    error: boolean,
    message: string,
  }
  data?: Object
}