'use strict'
/**
 * Calculator
 ******************************/

import APIError from '../utils/APIError'
import { CALCULATIONS } from '../constants'
import ICompoundInterestData from 'src/interfaces/ICompoundInterestData'
const { DEFAULT_COMPOUND_INTEREST_PERIOD, DEFAULT_COMPOUND_FREQUENCY } = CALCULATIONS
export default class Calculator {
  /**
   * Calculates the percentage increase between an initial and final value
   *
   * @param   {number} initialValue
   * @param   {number} finalValue
   * @returns {number} percentIncrease
   */
  public static percentIncrease(initialValue: number, finalValue: number): number {
    if (initialValue > finalValue) return 0 // Avoid negative percent
    return ((finalValue - initialValue) / initialValue) * 100
  }

  /**
   * Rounds a given number to two decimal places
   *
   * @param   {number} num The number to round
   * @returns {number} rounded number
   */
  public static roundToTwo(num: number): number {
    return +num.toFixed(2)
  }

  /**
   * Calculates the compound interest on an invested initial savings amount with
   * monthly-recurring deposits and the total yield, using the formula:
   * https://en.wikipedia.org/wiki/Compound_interest#Investing:_monthly_deposits
   * https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
   *
   * Checked against:
   * https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
   *
   * @param  {number} principal          The initial savings amount
   * @param  {number} monthlyDeposit     The monthly-recurring deposit amount
   * @param  {number} interestRate       The compound interest rate
   * @param  {number} time               The total investment period in years (default: DEFAULT_COMPOUND_INTEREST_PERIOD)
   * @param  {number} compoundFrequency  The number of times that interest is compounded per unit time (default: DEFAULT_COMPOUND_FREQUENCY)
   * @return ICompoundInterestData
   */
  public static compoundInterest(principal: number, monthlyDeposit: number, interestRate: number, time: number = DEFAULT_COMPOUND_INTEREST_PERIOD, compoundFrequency: number = DEFAULT_COMPOUND_FREQUENCY): ICompoundInterestData {
    // Ensure we do not divide by zero
    if (interestRate === 0) throw new APIError('Interest rate must be above zero', 400)
    if (compoundFrequency === 0) throw new APIError('Compound frequency must be above zero', 400)

    const totalSeries: number[] = [principal], // Init with zeroth value (principal)
      n = compoundFrequency,
      r = interestRate / 100, // Rate of return
      P = principal,
      M = monthlyDeposit

    // Calculate the cumulative total series
    for (let t = 1; t <= time; t++) {
      const interest = Math.pow(1 + r / n, t * n)
      const principalGain = P * interest
      const depositGain = M * ((interest - 1) / (r / n))
      const currentTotal = depositGain + principalGain

      totalSeries.push(this.roundToTwo(currentTotal))
    }

    // Last item in the series is the final amount
    const total = totalSeries[totalSeries.length - 1]
    // Calculate the total amount put in
    const investmentTotal = P + M * time
    // Calculate the total amount earned from investment (net profit)
    const returnTotal = this.roundToTwo(total - investmentTotal)
    // Calculate the percent increase if there is one
    const returnOnInvestment = total > 0 ? Math.round(this.percentIncrease(investmentTotal, total)) : 0

    return { total, totalSeries, returnTotal, returnOnInvestment }
  }
}
