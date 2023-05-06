import React from "react";
import { Chart } from 'chart.js/auto';

export function MapTemperatureToGraph(props) {
  console.log(props.readings);
  const timestamps = props.readings.map((reading) => 
      new Date(reading.modifiedDate)
        .toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' }));
  const temperatures = props.readings.map((reading) => reading.temperature);

  const chartRef = React.useRef();

  React.useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: [
            {
              type: 'time',
              time: {
                tooltipFormat: 'HH:mm:ss', // format the tooltip to show only time
                unit: 'minute',
              },
            },
          ],
          y: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [timestamps, temperatures]);

  return <canvas ref={chartRef} />;
}