import React, { useRef, useEffect } from "react";
import Chart, { LinearScale, LinearTickOptions } from "chart.js";

interface Props {
  data: {} | undefined;
  barType: string;
  precision: number;
  max?: number;
  min?: number;
}
Chart.defaults.global.defaultFontColor = "#fff";
Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

export default function LineGraph(props: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPrefersDark) {
      var gridColor = "#292929";
      var legendColor = "#ffffff";
    } else {
      gridColor = "#e4e4e4";
      legendColor = "#212121";
    }
    const current = chartRef.current;
    if (!current) return;
    const context = current.getContext("2d");
    if (!context) return;
    new Chart(context, {
      type: props.barType,
      data: props.data,
      options: {
        responsive: true,
        animation: false,
        aspectRatio: 1.6,
        scales: {
          yAxes: [
            {
              stacked: false,
              ticks: {
                fontColor: legendColor,
                suggestedMax: props.max,
                suggestedMin: props.min,
                precision: props.precision,
              } as LinearTickOptions,
              gridLines: {
                zeroLineWidth: 0,
                color: gridColor,
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: legendColor,
              },
              gridLines: {
                zeroLineWidth: 0,
                drawBorder: false,
                color: gridColor,
              },
            },
          ],
        } as LinearScale,
        tooltips: {
          enabled: false,
        },
        elements: {
          point: {
            pointStyle: "rectRounded",
            borderWidth: 2,
            radius: 0,
          },
          line: {
            tension: 0.2,
          },
        },
        legend: {
          labels: {
            usePointStyle: true,
            padding: 20,
            fontStyle: "bold",
            fontSize: 14,
            fontColor: legendColor,
          },
        },
      },
    });
  }, [props]);
  return <canvas ref={chartRef} />;
}
