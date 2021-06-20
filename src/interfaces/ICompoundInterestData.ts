'use strict'
/**
 * Compound Interest Data Format
 ******************************/
export default interface ICompoundInterestData {
  total: number
  totalSeries: number[]
  returnTotal: number
  returnOnInvestment: number
}