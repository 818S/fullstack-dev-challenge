'use strict'
/**
 * Calculations API routes
 ******************************/
import express from 'express'
import validate from '../middlewares/validate'
import calculationsController from '../controllers/calculations.controller'
import CompoundInterestSchema from '../schemas/CompoundInterestRequest'
import { ROUTES } from '../constants'

const calcRouter = express.Router()

calcRouter.post(ROUTES.API.CALCULATIONS.COMPOUND_INTEREST, validate({ schema: CompoundInterestSchema, json: true }), calculationsController.compoundInterest)

export default calcRouter
