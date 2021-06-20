import { render, screen, cleanup } from '@testing-library/react'
import NumberInputSlider from '../components/NumberInputSlider'

afterEach(() => {
    // Cleanup after run
    cleanup()
})

const setup = () => {
    let value = 10
    const setValue = (value: string | number) => {
        value = Number(value)
    }
    const inputSlider = render(
        <NumberInputSlider
            value={value}
            onNumberInputChange={setValue}
            onSliderChange={setValue}
            onSliderChangeEnd={() => {}}
            title="Test Title"
            symbol="£"
            min={0}
            sliderMax={1000}
        />
    )
    return {
        value,
        setValue,
        inputSlider,
    }
}

test('renders the title', () => {
    setup()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
})


test('renders the symbol', () => {
    setup()
    expect(screen.getByText('£')).toBeInTheDocument()
})

// TODO: Add more tests (e.g. number input value change)