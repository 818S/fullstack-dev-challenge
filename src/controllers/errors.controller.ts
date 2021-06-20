'use strict'
/**
 * Errors Controller
 ******************************/
import response from '../utils/response'

const errors = {
  notFound: (req: any, res: any, next: any) => {
    res.status(404).json(response(true, 'Not Found'))
  },
}

export default errors
