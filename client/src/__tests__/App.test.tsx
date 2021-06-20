import React from 'react'
import { render, screen, cleanup, queryByAttribute, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App'
import { API } from '../constants'
import { formatNumber } from '../utils'
import ICompoundInterestParams from '../interfaces/ICompoundInterestParams'
import ICompoundInterestData from '../interfaces/ICompoundInterestData'

// Timeout period for waitFor
const WAITFOR_TIMEOUT = 1000 // ms (1 sec)
// const getById = queryByAttribute.bind(null, 'id')
// Gets an input by its type and value
const getByInputTypeValue = (type: string, value: string) =>
    screen.getByDisplayValue((content, element) => {
        return element.type === type && element.value === value
    })
// Fix for issue https://github.com/reactchartjs/react-chartjs-2/issues/155
jest.mock('react-chartjs-2', () => ({
    Line: () => null,
}))

/**
 * Setup
 */

const { COMPOUND_INTEREST_API_ENDPOINT, COMPOUND_INTEREST_DEFAULT_PARAMS } = API

type CompoundInterestTestCase = {
    PARAMS: ICompoundInterestParams
    STATS: number[]
    SERIES: number[]
}


// Compound Interest Test cases
const COMPOUND_INTEREST_TEST_CASES: CompoundInterestTestCase[] = [
    // Default Params case
    {
        PARAMS: COMPOUND_INTEREST_DEFAULT_PARAMS,
        STATS: [100223.61, 92223.61, 1153],
        SERIES: [
            500, 2305.31, 4117.85, 5937.65, 7764.75, 9599.17, 11440.94, 13290.09, 15146.66,
            17010.66, 18882.13, 20761.1, 22647.6, 24541.66, 26443.31, 28352.58, 30269.5, 32194.11,
            34126.42, 36066.48, 38014.32, 39969.96, 41933.44, 43904.78, 45884.03, 47871.2, 49866.34,
            51869.48, 53880.64, 55899.86, 57927.18, 59962.61, 62006.21, 64057.99, 66118, 68186.26,
            70262.81, 72347.68, 74440.9, 76542.52, 78652.55, 80771.04, 82898.03, 85033.53, 87177.59,
            89330.25, 91491.53, 93661.47, 95840.1, 98027.47, 100223.61,
        ],
    },
]

// Use Mock Service Worker to mock our server
const server = setupServer(
    // Mock our compound interest endpoint
    // Respond with whichever COMPOUND_INTEREST_TEST_CASES matches or just empty
    rest.post('*' + COMPOUND_INTEREST_API_ENDPOINT, (req, res, ctx) => {
        let response: ICompoundInterestData = {
            total: 0,
            totalSeries: [],
            returnTotal: 0,
            returnOnInvestment: 0,
        }

        const params = req.body

        // Find test case with params supplied if it exists
        const ciTestCase = COMPOUND_INTEREST_TEST_CASES.find(
            // TODO: Do a deeper comparison
            (testCase) => JSON.stringify(testCase.PARAMS) === JSON.stringify(params)
        )

        if (ciTestCase) {
            // Repond with test case's expected values
            response.total = ciTestCase.STATS[0]
            response.totalSeries = ciTestCase.SERIES
            response.returnTotal = ciTestCase.STATS[1]
            response.returnOnInvestment = ciTestCase.STATS[2]
        }

        return res(ctx.json(response))
    })
)

// Run before every test
const setup = () => {
    const appEls = render(<App />)
    return appEls
}


// Test hooks
beforeAll(() => server.listen())
beforeEach(setup)
afterEach(() => {
    // Cleanup after run
    cleanup()
    server.resetHandlers()
})
afterAll(() => server.close())

/**
 * Tests
 */
test('renders the heading', () => {
    expect(screen.getByText('Compound Interest Calculator')).toBeInTheDocument()
})

test('renders the stats panel', () => {
    expect(screen.getByText('Expected Savings')).toBeInTheDocument()
    expect(screen.getByText('Expected Return')).toBeInTheDocument()
    expect(screen.getByText('Expected ROI')).toBeInTheDocument()
})

test('renders the param panel', () => {
    expect(screen.getByText('Initial Savings Amount')).toBeInTheDocument()
    expect(screen.getByText('Monthly Deposit')).toBeInTheDocument()
    expect(screen.getByText('Interest Rate')).toBeInTheDocument()
})

test('renders the default params in the params panel', () => {
    expect(
        getByInputTypeValue('text', COMPOUND_INTEREST_DEFAULT_PARAMS.initialSavings.toString())
    ).toBeInTheDocument()
    expect(
        getByInputTypeValue('text', COMPOUND_INTEREST_DEFAULT_PARAMS.monthlyDeposit.toString())
    ).toBeInTheDocument()
    expect(
        getByInputTypeValue('text', COMPOUND_INTEREST_DEFAULT_PARAMS.interestRate.toString())
    ).toBeInTheDocument()
})

test('renders the correctly calculated compound interest stats for the default params in the stat panel', () => {
    COMPOUND_INTEREST_TEST_CASES[0].STATS.forEach(async (num) => {
        const formatted = formatNumber(num)
        // Wait until the correct compound interest stat is fetched from the API and rendered formatted
        // Or hit a timeout :(
        await waitFor(() => expect(screen.getByText(formatted)).toBeInTheDocument(), {
            timeout: WAITFOR_TIMEOUT,
        })
    })
})

test('formats the stat numbers correctly', () => {
    expect(formatNumber(20)).toBe('20') // small
    expect(formatNumber(1350)).toBe('1,350') // medium
    expect(formatNumber(150420.13)).toBe('150,420.13') // large
    expect(formatNumber(3492852960.21)).toBe('3,492,852,960.21') // very large
})

// TODO: Add more tests (e.g. number input value change)
