import React, { useEffect, useState } from 'react';
import './BarChart.css';

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

  const [hoveredBar, setHoveredBar] = useState(null);

  const handleBarHover = (index) => {
    setHoveredBar(index);
  };

  return (
    <div className="w-full flex flex-col justify-between h-[200px]">
      <div className="chart w-full flex items-end justify-between">
        {data.map((bar, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${bar.value / 10}px`,
              backgroundColor: hoveredBar === index ? '#4A90E2' : '#69CA7D',
            }}
            onMouseEnter={() => handleBarHover(index)}
            onMouseLeave={() => handleBarHover(null)}
          >
            {hoveredBar === index && (
              <div className="tooltip text-[13px] text-center">
                {bar.label}: {bar.value}ms {/* Adjust as per your data */}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
