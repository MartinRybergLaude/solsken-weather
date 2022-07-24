import { Area, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

const COLOR = "#e0412f";

function GraphTempr({ chartHours }: GraphProps) {
  return (
    <ResponsiveContainer width="100%" height="88%">
      <ComposedChart width={300} height={100} data={chartHours}>
        <defs>
          <linearGradient id="colorTempr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLOR} stopOpacity={0.2} />
            <stop offset="95%" stopColor={COLOR} stopOpacity={0} />
          </linearGradient>
        </defs>
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
          dataKey="tempr"
          stroke={COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="feelslike"
          stroke={COLOR}
          strokeOpacity={0}
          fillOpacity={1}
          isAnimationActive={false}
          fill="url(#colorTempr)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
export default GraphTempr;
