import { Skeleton } from '@chakra-ui/react'
import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { theme } from '../theme'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    isLoaded: boolean
    title?: string
    xLabel?: string
    yLabel?: string
}

const LineChart = ({ xAxisData, yAxisData, isLoaded, title, xLabel, yLabel }: Props) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
    }

    const options: ChartOptions = {
        title: {
            display: !!title,
            text: title,
        },
        scales: {
            gridLines: { display: false },
            yAxes: [
                {
                    scaleLabel: { display: !!yLabel, labelString: yLabel },
                    gridLines: { display: false },
                },
            ],
            xAxes: [
                {
                    scaleLabel: { display: !!xLabel, labelString: xLabel },
                    ticks: { display: true },
                    gridLines: { display: false },
                },
            ],
        },
    }

    return (
        <Skeleton isLoaded={isLoaded}>
            <Line
                data={{
                    labels: xAxisData,
                    datasets: [
                        {
                            backgroundColor: theme.colors.blue100,
                            borderColor: theme.colors.primary,
                            data: yAxisData,
                        },
                    ],
                }}
                options={options}
                legend={legendOptions}
            />
        </Skeleton>
    )
}

export default LineChart
