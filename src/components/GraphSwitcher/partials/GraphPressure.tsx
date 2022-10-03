import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useThemeDetector } from "~/hooks/useThemeDetector";
import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

function GraphPressure({ chartHours }: GraphProps) {
  const isDarkTheme = useThemeDetector();

  const LINE_COLOR = "#8755ad";
  const TEXT_COLOR = isDarkTheme ? "#FFFFFF" : "#000000";
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
          tick={{ fill: TEXT_COLOR }}
          allowDecimals={false}
        />
        <XAxis
          dataKey="hourText"
          padding={{ right: 4, left: 4 }}
          axisLine={false}
          tickLine={false}
          fontSize={12}
          fontWeight={500}
          tick={{ fill: TEXT_COLOR }}
        />
        <Line
          type="monotone"
          dataKey="pressure"
          stroke={LINE_COLOR}
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
