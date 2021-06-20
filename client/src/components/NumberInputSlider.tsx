import React from 'react'
import {
    Flex,
    Heading,
    Box,
} from '@chakra-ui/react'
import NumberInput from './NumberInput'
import Slider from './Slider'

type Props = {
    value: number
    onNumberInputChange: (value: string | number) => void
    onSliderChange: (value: string | number) => void
    onSliderChangeEnd: (value: string | number) => void
    title: string
    symbol: string
    min: number
    sliderMax: number
    precision?: number
    step?: number
}

const NumberInputSlider = ({
    value,
    onNumberInputChange,
    onSliderChange,
    onSliderChangeEnd,
    title,
    symbol,
    min,
    sliderMax,
    precision,
    step,
}: Props) => {
    return (
        <Box>
            <Heading as="h3" size="sm" mb={2}>
                {title}
            </Heading>
            <Flex>
                <Slider
                    value={value}
                    onChange={onSliderChange}
                    onChangeEnd={onSliderChangeEnd}
                    min={min}
                    max={sliderMax}
                    step={step}
                />
                <NumberInput
                    value={value}
                    onChange={onNumberInputChange}
                    min={min}
                    precision={precision}
                    step={step}
                    symbol={symbol}
                />
            </Flex>
        </Box>
    )
}

export default NumberInputSlider
