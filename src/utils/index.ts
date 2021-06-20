import APIError from './APIError'
import response from './response'

/**
 * Returns if the server running in production
 * @returns boolean
 */
const isProd = (): boolean => process.env.NODE_ENV === 'production'

export { isProd, APIError, response }
