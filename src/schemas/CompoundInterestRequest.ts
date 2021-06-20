// AJV Schema
export default {
  title: 'CompoundInterestRequest',
  description: 'Request body for Compound Interest endpoint',
  type: 'object',
  properties: {
    initialSavings: {
      description: 'The initial savings amount',
      type: 'number',
      minimum: 0,
    },
    monthlyDeposit: {
      description: 'The monthly-recurring deposit amount',
      type: 'number',
      minimum: 0,
    },
    interestRate: {
      description: 'The compound interest rate',
      type: 'number',
      minimum: 0,
    },
    time: {
      description: 'The investment time period in years',
      type: 'number',
      minimum: 1,
    },
  },
  required: ['initialSavings', 'monthlyDeposit', 'interestRate'],
  additionalProperties: false,
}
