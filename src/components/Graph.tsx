import React, { useRef, useEffect } from 'react'
import Chart, { LinearScale, LinearTickOptions } from 'chart.js';

interface Props {
    data: {} | undefined
    barType: string
    precision: number
    max?: number
    min?: number
}
Chart.defaults.global.defaultFontColor = "#fff"
Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif"

export default function LineGraph(props: Props) {
    const chartRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const current = chartRef.current
        if (!current) return
        const context = current.getContext("2d")
        if (!context) return
        new Chart(context, {
            type: props.barType,
            data: props.data,
            options: {
                aspectRatio: 1.6,
                responsive: true,
                scales: {
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            suggestedMax: props.max,
                            suggestedMin: props.min,
                            precision: props.precision
                        } as LinearTickOptions,
                        gridLines: {
                            zeroLineWidth: 0,
                            color: "#292929"
                        }
                    }],
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            zeroLineWidth: 0,
                            drawBorder: false, 
                            color: "#292929"
                        }
                    }]
                } as LinearScale,
                tooltips: {
                    enabled: false
                },
                elements: {
                    point:{
                        pointStyle: "rectRounded",
                        borderWidth: 2,
                        radius: 0
                    },
                    line: {
                        tension: 0.2
                    }
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        fontStyle: "bold",
                        fontSize: 14
                    }
                }
            }
        })
        
    }, [props])
    return (
        <canvas ref={chartRef}/>
    )
}
