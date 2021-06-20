'use strict'
/**
 * Server routes
 ******************************/
import express from 'express'
import apiRouter from './api.route'
import errorsController from '../controllers/errors.controller'
import { ROUTES } from '../constants'

const router = express.Router()

router.use(ROUTES.API.BASE, apiRouter)

router.use('*', errorsController.notFound)

export default router