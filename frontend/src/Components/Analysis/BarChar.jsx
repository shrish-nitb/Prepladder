import React, { useState } from 'react';
import './BarChart.css';

const BarChart = ({heading,section1,data1,section2,data2,section3,data3}) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const data = [
    { label: section1, value: data1 },
    { label:section2, value: data2 },
    { label: section3, value: data3 },
  ];

  const handleBarHover = (index) => {
    setHoveredBar(index);
  };

  return (
    <div className='w-full flex flex-col justify-between h-full' >
      <p className='text-center font-semibold text-xl'>{heading}</p>
     <div className="chart w-full flex items-end justify-between ">
     {data.map((bar, index) => (
        <div
          key={index}
          className="bar"
          style={{
            height: `${bar.value}px`,
            backgroundColor: hoveredBar === index ? '#4A90E2' :'#69CA7D' ,
          }}
          onMouseEnter={() => handleBarHover(index)}
          onMouseLeave={() => handleBarHover(null)}
        >
          {hoveredBar === index && (
            <div className="tooltip text-[13px] text-center">
              {bar.label}: {bar.value}%
            </div>
          )}
        </div>
      ))}
     </div>
    </div>
  );
};

export default BarChart;
