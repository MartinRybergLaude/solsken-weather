import { Area, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

const COLOR = "#55ad91";

function GraphWind({ chartHours }: GraphProps) {
  return (
    <ResponsiveContainer width="100%" height="88%">
      <ComposedChart width={300} height={100} data={chartHours}>
        <defs>
          <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLOR} stopOpacity={0.2} />
            <stop offset="95%" stopColor={COLOR} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis
          type="number"
          domain={[0, "dataMax"]}
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
          dataKey="wind"
          stroke={COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          dot={<WindDirDot />}
          connectNulls
        />
        <Area
          type="monotone"
          dataKey="gusts"
          strokeOpacity={0}
          fillOpacity={1}
          isAnimationActive={false}
          fill="url(#colorWind)"
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default GraphWind;

function WindDirDot({ cx, cy, payload }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      x={cx - 10}
      y={cy - 10}
      height="24"
      viewBox="-12 -12 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"wind-icon"}
    >
      <g transform={`rotate(${payload.windDir} 12 12)`}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </g>
    </svg>
  );
}
