import React from 'react'
import { VStack } from '@chakra-ui/react'
import NumberInputSlider from './NumberInputSlider'
import ICompoundInterestParams from '../interfaces/ICompoundInterestParams'

type ICompoundInterestParamsKey = keyof ICompoundInterestParams

type Props = {
    setParamsState: React.Dispatch<React.SetStateAction<ICompoundInterestParams>>
    calculateCompoundInterest: (newParamsState?: ICompoundInterestParams) => void
    paramsState: ICompoundInterestParams
}

const ParamsPanel = ({ setParamsState, calculateCompoundInterest, paramsState }: Props) => {
    /**
     * Returns a function that handles the {@link NumberInputSlider} value
     * changes for a specified param. It validates the input, updates the
     * paramsState and calls {@link calculateCompoundInterest}, appropriately
     *
     * @param  {ICompoundInterestParamsKey}     paramKey The parameter name
     * @param  {boolean}                        calcCompIntOnChange Whether to call calculateCompoundInterest when param value changes
     * @returns (value: {string | number})
     */
    const handleParamChangeFactory =
        (paramKey: ICompoundInterestParamsKey, calcCompIntOnChange: boolean) =>
        (value: string | number) => {
            const oldValue = paramsState[paramKey]
            // Parse as number
            let newValue = Number(value)
            // Validation: Ensure it is a valid number and not negative
            if (isNaN(newValue) || newValue < 0) return

            setParamsState((prevState) => {
                const newState = {
                    ...prevState,
                    [paramKey]: newValue,
                }

                // Trigger calculateCompoundInterest if value has changed
                // Used primarily for the NumberInput changes
                if (oldValue !== newValue && calcCompIntOnChange) {
                    calculateCompoundInterest(newState)
                }

                return newState
            })
        }

    return (
        <VStack spacing={8} align="stretch" height="100%" justifyContent="center">
            <NumberInputSlider
                value={paramsState.initialSavings}
                onNumberInputChange={handleParamChangeFactory('initialSavings', true)}
                onSliderChange={handleParamChangeFactory('initialSavings', false)}
                onSliderChangeEnd={() => calculateCompoundInterest()}
                title="Initial Savings Amount"
                symbol="£"
                min={0}
                sliderMax={1000}
                step={10}
            />
            <NumberInputSlider
                value={paramsState.monthlyDeposit}
                onNumberInputChange={handleParamChangeFactory('monthlyDeposit', true)}
                onSliderChange={handleParamChangeFactory('monthlyDeposit', false)}
                onSliderChangeEnd={() => calculateCompoundInterest()}
                title="Monthly Deposit"
                symbol="£"
                min={0}
                sliderMax={1000}
                step={10}
            />
            <NumberInputSlider
                value={paramsState.interestRate}
                onNumberInputChange={handleParamChangeFactory('interestRate', true)}
                onSliderChange={handleParamChangeFactory('interestRate', false)}
                onSliderChangeEnd={() => calculateCompoundInterest()}
                title="Interest Rate"
                symbol="%"
                min={0}
                sliderMax={10}
                precision={2}
                step={0.1}
            />
        </VStack>
    )
}

export default ParamsPanel
