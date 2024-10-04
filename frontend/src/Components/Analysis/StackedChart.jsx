import React, { useState } from "react";
import "./StackedBarChart.css"; // Import your CSS file for styling

const StackedChart = ({ data }) => {
  // Calculate totals for each category
  const totals = data.map(
    (item) => item?.correct + item?.incorrect + item?.missed
  );

  // State to track hover state
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="stacked-bar-chart h-full">
      {data.map((item, index) => (
        <div key={index} className="bar h-[90%] w-full relative">
          <div className="bar-label w-full">{item.sectionName}</div>

          {/* Bar segments with hover effect */}
          <div
            className="bar-segment bg-[#ffc107] rounded-t-lg min-h-fit "
            style={{ height: `${(item?.missed / totals[index]) * 100}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          ></div>
          <div
            className="bar-segment bg-[#dc3545] min-h-fit "
            style={{ height: `${(item?.incorrect / totals[index]) * 100}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          ></div>

          <div
            className="bar-segment bg-[#28a745] min-h-fit "
            style={{ height: `${(item?.correct / totals[index]) * 100}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          ></div>
          {hoveredIndex === index && (
            <div
              className="top-[20%] left-5 bg-white text-black bg-opacity-100 absolute px-5 py-2 rounded-md flex flex-col justify-between w-fit z-[5]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-center gap-x-3">
                <div className="w-3 h-3 rounded-full border-black border-[1px] bg-[#28a745]"></div>
                <p>Correct</p>
                <p>{data[index]?.correct}</p>
              </div>
              <div className="flex justify-between items-center gap-x-3">
                <div className="w-3 h-3 rounded-full border-black border-[1px] bg-[#dc3545]"></div>
                <p>Incorrect</p>
                <p>{data[index]?.incorrect}</p>
              </div>
              <div className="flex justify-between items-center gap-x-3">
                <div className="w-3 h-3 rounded-full border-black border-[1px] bg-[#ffc107]"></div>
                <p>Unattempted</p>
                <p>{data[index]?.missed}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StackedChart;
