import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';

function fancyTimeFormat(duration: number): string {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;
  // Output like "1:01" or "4:03:59" or "123:03:59"
  let result = "";
  if (hrs > 0) {
    result += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  result += "" + mins + ":" + (secs < 10 ? "0" : "");
  result += "" + secs;
  return result;
}

type Props = {
  dynamicData: IChartDataPoint[],
}

export const MultiStackedBar = (props: Props) => {


  const result = props.dynamicData;


  const firstChartPoints: IChartDataPoint[] = result;




  const hideRatio: boolean[] = [true, true];

  const data: IChartProps[] = [
    {
      chartTitle: 'Таймлайн фильма: ',
      chartData: firstChartPoints,
      chartDataAccessibilityData: { ariaLabel: 'number 40 out of 63' },
    },

  ];

  return (
    <MultiStackedBarChart
      barHeight={20}
      data={data}
      hideRatio={hideRatio}
      width={600}
    />
  );
};

export default MultiStackedBar;
