import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import BarChart from "./BarChart";
const TimeTakenGraph = ({ report }) => {
  // console.log(report);
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div className="w-full h-full  px-10 py-3 flex flex-col items-center justify-between bg-white rounded-md">
      <div className="flex items-end justify-end w-full">
        <div className="bg-[#1D2129] items-center justify-center flex px-3 py-1 rounded-md relative z-[5]">
          <button
            onClick={() => {
              setSelectOpen(!selectOpen);
            }}
            className="flex items-center justify-center gap-x-3 transition-all duration-300"
          >
            <p>{report?.sections[currentSection]?.name}</p>
            {!selectOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
          {selectOpen && (
            <div className="w-full absolute top-0 translate-y-10 left-0 gap-y-1 flex flex-col rounded-xl bg-[#1D2129]">
              {report?.sections.map((section, index) => {
                return (
                  <button
                    className="bg-[#1D2129] items-center justify-center flex  px-3 py-2 hover:bg-[#0D9AA6]"
                    onClick={() => {
                      setCurrentSection(index);
                      setSelectOpen(false);
                    }}
                  >
                    <p>{section?.name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full ">
        <h2>Time Taken vs Question Number</h2>
        <BarChart questions={report?.sections[currentSection]?.questions} />
      </div>
    </div>
  );
};

export default TimeTakenGraph;
