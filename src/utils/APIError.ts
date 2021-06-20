'use strict'
/**
 * Standard API Error
 ******************************/

class APIError extends Error {
    public readonly statusCode: number
    /**
     * APIError Constructor
     * 
     * @param  {string} message        Error message
     * @param  {number} statusCode=500 HTTP status code
     */
    constructor(message: string, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }

    get name() {
        return this.constructor.name
    }
}

export default APIError