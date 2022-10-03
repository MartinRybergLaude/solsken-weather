import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useThemeDetector } from "~/hooks/useThemeDetector";
import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

function GraphHumidity({ chartHours }: GraphProps) {
  const isDarkTheme = useThemeDetector();

  const LINE_COLOR = "#2f67e0";
  const TEXT_COLOR = isDarkTheme ? "#FFFFFF" : "#000000";

  return (
    <ResponsiveContainer width="100%" height="88%">
      <LineChart width={300} height={100} data={chartHours}>
        <YAxis
          type="number"
          domain={[0, 100]}
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
          dataKey="humidity"
          stroke={LINE_COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraphHumidity;
