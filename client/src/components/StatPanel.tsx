import React from 'react'
import { Stack } from '@chakra-ui/react'
import { formatNumber } from '../utils'
import StatCard from './StatCard'

type Props = {
    isLoaded: boolean
    total: number
    returnTotal: number
    returnOnInvestment: number
}

const StatPanel = ({ isLoaded, total, returnTotal, returnOnInvestment }: Props) => (
    <Stack direction={'column'} spacing={6} borderWidth="1px" borderRadius="lg" p={8}>
        <StatCard
            isLoaded={isLoaded}
            statName="Expected Savings"
            statValue={`£${formatNumber(total)}`}
        />
        <StatCard
            isLoaded={isLoaded}
            statName="Expected Return"
            statValue={`£${formatNumber(returnTotal)}`}
        />
        <StatCard
            isLoaded={isLoaded}
            statName="Expected ROI"
            statValue={`${formatNumber(returnOnInvestment)}%`}
        />
    </Stack>
)

export default StatPanel
