import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import { ChakraProvider, Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import { errors } from './utils'
import CompoundInterestAPI from './api/CompoundInterestAPI'
import ICompoundInterestParams from './interfaces/ICompoundInterestParams'
import { defaultTheme } from './theme'
import StatPanel from './components/StatPanel'
import ParamsPanel from './components/ParamsPanel'
import { API } from './constants'

function App() {
    // TODO: move into state to allow user to specify a year range in the future
    const xAxis = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        48, 49, 50,
    ]
    // Store and update the CompoundInterestParams needed for the calculation
    const [paramsState, setParamsState] = useState<ICompoundInterestParams>(
        API.COMPOUND_INTEREST_DEFAULT_PARAMS
    )
    const [yAxis, setYAxis] = useState<number[]>([])
    const [total, setTotal] = useState<number>(0)
    const [returnTotal, setReturnTotal] = useState<number>(0)
    const [returnOnInvestment, setReturnOnInvestment] = useState<number>(0)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    /**
     * Uses the {@link CompoundInterestAPI} client to get the calculated compound
     * interest from the API and updates the UI accordingly
     *
     * @param  {ICompoundInterestParams} newParamsState A fresh parameter state
     */
    const calculateCompoundInterest = (newParamsState?: ICompoundInterestParams): void => {
        // Use the fresh params if supplied, or current ones if not
        const compoundInterestParams = newParamsState || paramsState

        // Show loaders and initiate the API request with the params
        setIsLoaded(false)
        CompoundInterestAPI(compoundInterestParams)
            .then((data) => {
                setIsLoaded(true)
                setYAxis(data.totalSeries)
                setTotal(data.total)
                setReturnTotal(data.returnTotal)
                setReturnOnInvestment(data.returnOnInvestment)
            })
            .catch((err) => {
                setIsLoaded(true)
                // Show error
                errors.show(err.message)
            })
    }

    // Should usually only fire once on load like componentDidMount
    // See https://css-tricks.com/run-useeffect-only-once/
    useEffect(() => {
        // Calculate the compound interest on initial load with the intial state
        calculateCompoundInterest()
    }, [])

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container p={8} maxW="container.lg">
                    <Grid templateRows="repeat(3, auto-fit)" templateColumns="4fr 1.2fr" gap={10}>
                        <GridItem rowSpan={1} colSpan={2} rowStart={1}>
                            <Heading as="h1" size="xl" mb={4} mt={6}>
                                Compound Interest Calculator
                            </Heading>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={2} rowStart={2}>
                            <LineChart
                                title="Savings Over Time"
                                xAxisData={xAxis}
                                yAxisData={yAxis}
                                xLabel="Years"
                                yLabel="Amount"
                                isLoaded={isLoaded}
                                aria-label="savings-chart"
                            />
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={[2, 1]} rowStart={[3, 2]}>
                            <StatPanel
                                isLoaded={isLoaded}
                                total={total}
                                returnTotal={returnTotal}
                                returnOnInvestment={returnOnInvestment}
                            />
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={2} rowStart={[4, 3]}>
                            <ParamsPanel
                                calculateCompoundInterest={calculateCompoundInterest}
                                setParamsState={setParamsState}
                                paramsState={paramsState}
                            />
                        </GridItem>
                    </Grid>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
