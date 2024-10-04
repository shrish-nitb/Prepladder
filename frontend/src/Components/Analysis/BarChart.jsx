// BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ questions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const newData = questions.map((question, i) => ({
        label: `Question ${i + 1}`,
        value: question.duration, // Assuming duration is the property you want to use
      }));
      // console.log(newData);
      setData(newData);
    }
  }, [questions]);

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Time Taken (seconds)",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Time Taken per Question",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Time Taken (seconds)",
        },
        ticks: {
          beginAtZero: true,
          callback: (value) => `${value} s`,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
