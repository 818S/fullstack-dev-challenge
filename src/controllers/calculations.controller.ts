'use strict'
/**
 * Calculations Controller
 ******************************/
import response from '../utils/response'
import Calculator from '../services/Calculator'

const calculations = {
  compoundInterest: (req: any, res: any) => {
    const { initialSavings, monthlyDeposit, interestRate, time } = req.body
    const cIData = Calculator.compoundInterest(initialSavings, monthlyDeposit, interestRate, time)
    res.status(200).json(response(false, 'Success', cIData))
  },
}

export default calculations
