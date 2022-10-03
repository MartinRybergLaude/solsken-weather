import { useEffect, useState } from "react";
import { Area, Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useThemeDetector } from "~/hooks/useThemeDetector";
import { ChartHour } from "~/types/formattedWeather";

interface GraphProps {
  chartHours?: ChartHour[];
}

function GraphRain({ chartHours }: GraphProps) {
  const [hoursData, setHoursData] = useState<ChartHour[] | undefined>(undefined);
  const isDarkTheme = useThemeDetector();

  const LINE_COLOR = "#2f67e0";
  const TEXT_COLOR = isDarkTheme ? "#FFFFFF" : "#000000";

  // Makes sure that "edges" are smooth (otherwise null gets a cutoff)
  useEffect(() => {
    if (chartHours) {
      for (let i = 0; i < chartHours.length; i++) {
        if (
          chartHours[i].precMax === 0 &&
          !chartHours[i - 1]?.precMax &&
          !chartHours[i + 1]?.precMax
        ) {
          chartHours[i].precMax = null;
        }
      }
      setHoursData(chartHours);
    }
  }, [chartHours]);

  return (
    <ResponsiveContainer width="100%" height="88%">
      <ComposedChart width={300} height={100} data={hoursData}>
        <defs>
          <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={LINE_COLOR} stopOpacity={0.2} />
            <stop offset="95%" stopColor={LINE_COLOR} stopOpacity={0} />
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
        <Area
          type="monotone"
          dataKey="precMax"
          stroke={LINE_COLOR}
          strokeOpacity={0}
          fillOpacity={1}
          isAnimationActive={false}
          fill="url(#colorRain)"
          connectNulls
        />
        <Bar dataKey="precMean" barSize={10} fill={LINE_COLOR} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
export default GraphRain;
