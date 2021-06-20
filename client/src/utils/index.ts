import errors from './errors'

/**
 * Creates a human-readable reoresentation of the number
 * 
 * @param  {Number} num The number to be formatted
 */
const formatNumber = (num: Number): string => {
  return num.toLocaleString('en')
}

/**
 * Returns whether we are running in development mode or not
 * 
 * @returns boolean
 */
const isDev = (): boolean => !!(process.env.NODE_ENV === 'development')

export { formatNumber, isDev, errors }
