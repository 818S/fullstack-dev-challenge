'use strict'
/**
 * API tests
 ******************************/
import { expect } from 'chai'
import { ROUTES } from '../constants'
import { HTTP_CODE_NOT_FOUND, NOT_FOUND_JSON } from './common'
import TestServer from './TestServer'
const request = require('supertest')

const HTTP_CODE_OK = 200
const HTTP_CODE_BAD_REQUEST = 400

const { API } = ROUTES
const API_ROUTE = API.BASE
const CALCULATIONS_ROUTE = API.CALCULATIONS.BASE
const COMPOUND_INTEREST_ROUTE = API_ROUTE + CALCULATIONS_ROUTE + API.CALCULATIONS.COMPOUND_INTEREST

type TestCase = {
  REQUEST: Object
  RESPONSE: Object
}

// Compound Interest Test cases
const COMPOUND_INTEREST_TEST_CASES: TestCase[] = [
  // Default Params case
  {
    REQUEST: {
      initialSavings: 500,
      monthlyDeposit: 150,
      interestRate: 0.4,
    },
    RESPONSE: { status: { error: false, message: 'Success' }, data: { total: 100223.61, totalSeries: [500, 2305.31, 4117.85, 5937.65, 7764.75, 9599.17, 11440.94, 13290.09, 15146.66, 17010.66, 18882.13, 20761.1, 22647.6, 24541.66, 26443.31, 28352.58, 30269.5, 32194.11, 34126.42, 36066.48, 38014.32, 39969.96, 41933.44, 43904.78, 45884.03, 47871.2, 49866.34, 51869.48, 53880.64, 55899.86, 57927.18, 59962.61, 62006.21, 64057.99, 66118, 68186.26, 70262.81, 72347.68, 74440.9, 76542.52, 78652.55, 80771.04, 82898.03, 85033.53, 87177.59, 89330.25, 91491.53, 93661.47, 95840.1, 98027.47, 100223.61], returnTotal: 92223.61, returnOnInvestment: 1153 } },
  },
  {
    REQUEST: { initialSavings: 100000, monthlyDeposit: 10000, interestRate: 10 },
    RESPONSE: { status: { error: false, message: 'Success' }, data: { total: 187780900.29, totalSeries: [100000, 236126.99, 386508.25, 552636.4, 736160.33, 938901.62, 1162872.56, 1410296.2, 1683628.32, 1985581.89, 2319153.94, 2687655.34, 3094743.66, 3544459.44, 4041266.34, 4590095.42, 5196394.07, 5866180.11, 6606101.51, 7423502.34, 8326495.72, 9324044.31, 10426049.27, 11643448.56, 12988325.45, 14474028.53, 16115304.14, 17928442.75, 19931440.66, 22144178.63, 24588619.19, 27289024.61, 30272197.76, 33567748.13, 37208385.68, 41230245.56, 45673246.73, 50581488.17, 56003686.63, 61993660.13, 68610862.13, 75920971.64, 83996545.15, 92917736.72, 102773093.64, 113660435.2, 125687823.7, 138974636.94, 153652753.15, 169867859.94, 187780900.29], returnTotal: 187180900.29, returnOnInvestment: 31197 } },
  },
  {
    REQUEST: { initialSavings: 500, monthlyDeposit: 0, interestRate: 1.6 },
    RESPONSE: { status: { error: false, message: 'Success' }, data: { total: 1112.18, totalSeries: [500, 508.06, 516.25, 524.57, 533.02, 541.61, 550.34, 559.21, 568.23, 577.39, 586.69, 596.15, 605.76, 615.52, 625.44, 635.52, 645.77, 656.17, 666.75, 677.5, 688.42, 699.51, 710.79, 722.24, 733.88, 745.71, 757.73, 769.95, 782.36, 794.97, 807.78, 820.8, 834.03, 847.47, 861.13, 875.01, 889.11, 903.44, 918.01, 932.8, 947.84, 963.11, 978.64, 994.41, 1010.44, 1026.72, 1043.27, 1060.09, 1077.17, 1094.54, 1112.18], returnTotal: 612.18, returnOnInvestment: 122 } },
  },
  {
    REQUEST: { initialSavings: 0, monthlyDeposit: 180, interestRate: 0.9 },
    RESPONSE: { status: { error: false, message: 'Success' }, data: { total: 136331.44, totalSeries: [0, 2168.93, 4357.47, 6565.78, 8794.05, 11042.45, 13311.18, 15600.41, 17910.32, 20241.11, 22592.97, 24966.08, 27360.64, 29776.83, 32214.86, 34674.93, 37157.23, 39661.96, 42189.32, 44739.53, 47312.78, 49909.29, 52529.26, 55172.91, 57840.46, 60532.11, 63248.08, 65988.6, 68753.88, 71544.16, 74359.65, 77200.59, 80067.2, 82959.72, 85878.38, 88823.41, 91795.06, 94793.56, 97819.16, 100872.11, 103952.65, 107061.02, 110197.49, 113362.3, 116555.71, 119777.98, 123029.37, 126310.15, 129620.57, 132960.92, 136331.44], returnTotal: 127331.44, returnOnInvestment: 1415 } },
  },
  {
    REQUEST: { initialSavings: 0, monthlyDeposit: 0, interestRate: 0.4 },
    RESPONSE: { status: { error: false, message: 'Success' }, data: { total: 0, totalSeries: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], returnTotal: 0, returnOnInvestment: 0 } },
  },
  {
    REQUEST: { initialSavings: 200, monthlyDeposit: 150, interestRate: 0 },
    RESPONSE: { status: { error: true, message: 'Interest rate must be above zero' } },
  },
  {
    REQUEST: { initialSavings: 0, monthlyDeposit: 0, interestRate: 0 },
    RESPONSE: { status: { error: true, message: 'Interest rate must be above zero' } },
  },
  {
    REQUEST: { initialSavings: 0, monthlyDeposit: 0 },
    RESPONSE: { status: { error: true, message: 'Invalid or missing params' } },
  },
  {
    REQUEST: {},
    RESPONSE: { status: { error: true, message: 'Invalid or missing params' } },
  },
  {
    REQUEST: { initialSavings: 'b', monthlyDeposit: 't', interestRate: 'c' },
    RESPONSE: { status: { error: true, message: 'Invalid or missing params' } },
  },
]

// Use a test server
const server = new TestServer()
// Before all
before(function (done) {
  server.setup(done)
})
// After all
after(function (done) {
  server.teardown(done)
})

/**
 * Runs a Compound Interest Test Case {@link COMPOUND_INTEREST_TEST_CASES}
 * @param  {number} caseIdx       The {@link COMPOUND_INTEREST_TEST_CASES} index
 * @param  {number=200} httpCode  The expected response HTTP code
 */
const runCompoundInterestTestCase =
  (caseIdx: number, httpCode: number = 200) =>
  async () => {
    const TEST_CASE = COMPOUND_INTEREST_TEST_CASES[caseIdx]
    const res = await request(server.get()).post(COMPOUND_INTEREST_ROUTE).send(TEST_CASE.REQUEST).expect(httpCode)
    const { body } = res
    expect(body).to.be.an('object')
    expect(body).to.deep.equal(TEST_CASE.RESPONSE)
  }

describe('Test API', () => {
  // TODO: break up these up into their seperate files in the future
  describe('Test Compound Interest API', () => {
    it('It should respond with a Not Found message to GET /', async () => {
      const res = await request(server.get()).get(COMPOUND_INTEREST_ROUTE).expect(HTTP_CODE_NOT_FOUND)
      expect(res.body).to.deep.equal(NOT_FOUND_JSON)
    })

    it('It should respond with the correctly calculated compound interest for valid params', runCompoundInterestTestCase(0, HTTP_CODE_OK))

    it('It should respond with the correctly calculated compound interest for large valid params', runCompoundInterestTestCase(1, HTTP_CODE_OK))

    it('It should respond with the correctly calculated compound interest when Monthly Deposit is zero', runCompoundInterestTestCase(2, HTTP_CODE_OK))

    it('It should respond with the correctly calculated compound interest when Initial Savings Amount is zero', runCompoundInterestTestCase(3, HTTP_CODE_OK))

    it('It should respond with zero compound interest when Monthly Deposit and Initial Savings Amount is zero', runCompoundInterestTestCase(4, HTTP_CODE_OK))

    it('It should respond with an "Interest rate must be above zero" error when Interest Rate is zero', runCompoundInterestTestCase(5, HTTP_CODE_BAD_REQUEST))

    it('It should respond with an "Interest rate must be above zero" error when all params are zero', runCompoundInterestTestCase(6, HTTP_CODE_BAD_REQUEST))

    it('It should respond with an "Invalid or missing params" error when some params are missing', runCompoundInterestTestCase(7, HTTP_CODE_BAD_REQUEST))

    it('It should respond with an "Invalid or missing params" error when all params are missing', runCompoundInterestTestCase(8, HTTP_CODE_BAD_REQUEST))

    it('It should respond with an "Invalid or missing params" error when all params are invalid (strings)', runCompoundInterestTestCase(9, HTTP_CODE_BAD_REQUEST))

    // TODO: Add more test cases
  })
})
