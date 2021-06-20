'use strict'
/**
 * API routes
 ******************************/
import express from 'express'
import { ROUTES } from '../constants'
import calculationsRouter from './calculations.route'

const apiRouter = express.Router()

apiRouter.use(ROUTES.API.CALCULATIONS.BASE, calculationsRouter)

export default apiRouter