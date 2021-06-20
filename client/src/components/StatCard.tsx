import React from 'react'
import { Stat, StatLabel, StatNumber, StatHelpText, Skeleton } from '@chakra-ui/react'

type Props = {
    isLoaded: boolean
    statName: string
    statValue: string | number | React.ReactNode
    statHelpText?: string | React.ReactNode
}

const StatCard = ({ isLoaded, statName, statValue, statHelpText }: Props) => (
    <Stat textAlign={'center'}>
        <StatLabel fontWeight={'normal'} fontSize={['sx', 'sm']}>
            {statName}
        </StatLabel>
        <Skeleton isLoaded={isLoaded} mt={2}>
            <StatNumber>{statValue}</StatNumber>
            <StatHelpText>{statHelpText}</StatHelpText>
        </Skeleton>
    </Stat>
)

export default StatCard
