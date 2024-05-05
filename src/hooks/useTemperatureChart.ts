import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import type { IWeather } from '@/services/frontend';

/**
 * 温度折线图
 * @param container 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例
 * @param data 数据
 */
export default function useTemperatureChart(container: HTMLElement | string, data?: IWeather[]) {
  const chart = useRef<Chart>();

  useEffect(() => {
    return () => {
      chart.current && chart.current.destroy();
    };
  }, []);

  useEffect(() => {
    // fix 第一次不渲染
    setTimeout(() => {
      if (!chart.current) {
        chart.current = new Chart({
          container,
          autoFit: true,
        });
      }

      if (!data) {
        chart.current.clear();
      } else {
        const chartData = data.reduce((result, item) => {
          result.push({
            date: item.date,
            time: '白天',
            temperature: parseFloat(item.dayTemp),
          });

          result.push({
            date: item.date,
            time: '晚上',
            temperature: parseFloat(item.nightTemp),
          });
          return result;
        }, []);

        chart.current
          .data(chartData)
          .encode('x', 'date')
          .encode('y', 'temperature')
          .encode('color', 'time')
          .scale('x', {
            range: [0, 1],
          })
          .scale('y', {
            nice: true,
          })
          .axis('x', { title: '日期' })
          .axis('y', { title: '气温', labelFormatter: (d) => d + '°C' });

        chart.current
          .line()
          .encode('shape', 'smooth')
          .tooltip({
            title: (d) => d.date,
            items: [
              (_d, i, _data, column) => ({
                name: 'temperature',
                value: column.y.value[i] + '°C',
              }),
            ],
          });

        chart.current.point().encode('shape', 'point').tooltip(false);

        chart.current.render();
      }
    }, 0);
  }, [data]);
}
