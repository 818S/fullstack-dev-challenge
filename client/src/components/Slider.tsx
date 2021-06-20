import React from 'react'
import { Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { theme } from '../theme'
import images from '../images'

type Props = {
    value: number
    onChange: (value: string | number) => void
    onChangeEnd: (value: string | number) => void
    min: number
    max: number
    step?: number
}

const OurSlider = ({ value, onChange, onChangeEnd, min, max, step }: Props) => {
    return (
        <Slider
            value={value}
            onChange={onChange}
            onChangeEnd={onChangeEnd}
            flex="1"
            focusThumbOnChange={false}
            size="lg"
            min={min}
            max={max}
            step={step}
            mr={8}
        >
            <SliderTrack>
                <SliderFilledTrack bg={theme.colors.primary} />
            </SliderTrack>
            <SliderThumb boxSize={9}>
                <Image src={images.brandIcon} width={5} pointerEvents="none" />
            </SliderThumb>
        </Slider>
    )
}

export default OurSlider
