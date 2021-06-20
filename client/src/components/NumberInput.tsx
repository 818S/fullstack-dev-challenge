import React from 'react'
import { InputGroup, InputLeftElement, NumberInput, NumberInputField } from '@chakra-ui/react'
import { theme } from '../theme'

type Props = {
    value: number
    onChange: (value: string | number) => void
    symbol: string
    min: number
    precision?: number
    step?: number
}

const OurNumberInput = ({ symbol, ...numberInputProps }: Props) => {
    return (
        <InputGroup maxW="100px">
            <InputLeftElement pointerEvents="none" children={symbol} p={0} />
            <NumberInput {...numberInputProps} pattern="\d+">
                <NumberInputField
                    textAlign={'right'}
                    focusBorderColor={theme.colors.primary}
                    pl={7}
                />
            </NumberInput>
        </InputGroup>
    )
}

export default OurNumberInput
