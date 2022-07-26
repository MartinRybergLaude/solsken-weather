import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

const COLOR = "#8755ad";

function GraphPressure({ chartHours }: GraphProps) {
  return (
    <ResponsiveContainer width="100%" height="88%">
      <LineChart width={300} height={100} data={chartHours}>
        <YAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          padding={{ top: 10, bottom: 10 }}
          width={30}
          axisLine={false}
          tickLine={false}
          fontSize={12}
          fontWeight={500}
          tick={{ fill: "#000000" }}
          allowDecimals={false}
        />
        <XAxis
          dataKey="hourText"
          padding={{ right: 4, left: 4 }}
          axisLine={false}
          tickLine={false}
          fontSize={12}
          fontWeight={500}
          tick={{ fill: "#000000" }}
        />
        <Line
          type="monotone"
          dataKey="pressure"
          stroke={COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraphPressure;
