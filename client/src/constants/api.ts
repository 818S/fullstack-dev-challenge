const API = {
    JSON_MIME_TYPE: 'application/json',
    PROD_HOST: 'https://www.finimize.com',
    DEV_HOST: 'http://localhost:3001',
    COMPOUND_INTEREST_API_ENDPOINT: '/api/v1/calculations/compound-interest',
    COMPOUND_INTEREST_DEFAULT_PARAMS: {
        initialSavings: 500,
        monthlyDeposit: 150,
        interestRate: 0.4,
    }
}

export default API
