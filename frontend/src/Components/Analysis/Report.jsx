import React, { useRef, useState } from "react";
import BarChart from "./BarChar";
const Report = ({ report, correct, incorrect, skipped, sectionData }) => {
  const options = {
    title: {
      text: "Basic Column Chart",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 25 },
        ],
      },
    ],
  };
  // console.log(sectionData);
  return (
    <div className="w-full flex items-start gap-x-5 ">
      <div className="w-[25%] flex flex-col gap-y-3">
        <div className="w-full bg-[#9EE7BA] rounded-2xl text-black py-5 px-5 shadow-black shadow-lg flex flex-col justify-between min-h-[13rem]">
          <p className="font-semibold ">{`A message from your future IPM seniors :`}</p>
          <p className="text-[13.5px]">
            If you have got a good score, keep going on. <br />
            And if not, then DON'T WORRY. <br />
            keep practicing you will eventually get a good score {`:)`}
          </p>
        </div>
        <div className="w-full bg-[#333238] rounded-2xl text-white pt-5  shadow-black shadow-lg flex flex-col justify-between min-h-[15rem]">
          <p className="w-full text-center text-lg">Leaderboard</p>
          <div className="w-[full]  overflow-y-auto h-[180px] hide-scrollbar flex flex-col gap-y-2">
            {report?.leaderboard.map((user, i) => {
              return (
                <div
                  key={i}
                  className={`w-full flex justify-between items-center px-4 py-1 ${
                    i % 2 === 0 ? "bg-[#69CA7D]" : "bg-[#181818]"
                  } rounded-xl `}
                >
                  <img
                    src={user.picture}
                    alt="User"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <p>{user?.name}</p>
                  <p>{user?.points}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col gap-y-3">
        <div className="w-full bg-[#333238] rounded-2xl text-white py-5 px-5 shadow-black  flex flex-col justify-between min-h-[15rem]">
          <p className="w-full text-center text-lg">Your Score</p>
          <p className="w-full text-center text-lg">
            {report?.points !== undefined ? report?.points : "NA"}
          </p>
          <p className="w-full text-center text-lg">{`Out of ${
            report?.maximum ? report?.maximum : "NA"
          }`}</p>
          <div className="w-full flex items-center justify-between">
            <div>
              <p className="w-full text-center">Rank</p>
              <p className="w-full text-center">
                {report?.rank !== undefined ? report?.rank : "NA"}
              </p>
            </div>
            <div>
              <p className="w-full text-center">Accuracy</p>
              <p className="w-full text-center">{` ${Math.round(
                (correct / (correct + incorrect)) * 100
              )}%`}</p>
            </div>
            <div>
              <p className="w-full text-center">Percentage</p>
              <p className="w-full text-center">{` ${
                report?.points !== undefined
                  ? Math.round((report?.points / report?.maximum) * 100)
                  : "NA"
              }%`}</p>
            </div>
          </div>
        </div>
        <div className="w-full  text-white   grid grid-cols-2 justify-between min-h-[13rem] gap-2">
          <div className="w-full h-full rounded-xl bg-[#333238] flex flex-col items-center justify-between p-5  ">
            <p className="text-3xl font-semibold">{incorrect}</p>
            <p>Incorrect</p>
          </div>
          <div className="w-full h-full rounded-xl bg-[#D9D9D9] text-black flex flex-col items-center justify-between p-5  ">
            <p className="text-3xl font-semibold">{correct}</p>
            <p>Correct</p>
          </div>
          <div className="w-full h-full rounded-xl bg-[#D9D9D9]  text-black flex flex-col items-center justify-between p-5  ">
            <p className="text-3xl font-semibold">{skipped}</p>
            <p>Skipped</p>
          </div>
          <div className="w-full h-full rounded-xl bg-[#333238] flex flex-col items-center justify-between p-5 ">
            <p className="text-3xl font-semibold">
              {report?.negatives ? report?.negatives : 0}
            </p>
            <p>Negative</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-y-3">
        <div className="grid grid-cols-3 gap-x-3 min-h-[15rem]">
          {sectionData.map((section, i) => {
            return (
              <div
                key={i}
                className="w-full h-full rounded-2xl bg-[#333238] flex flex-col items-center justify-between p-5 "
              >
                <p className="text-lg text-center">{section?.sectionName}</p>
                <div className="flex justify-between w-full font-semibold text-lg">
                  <p className="text-[#16A34A]"> Correct</p>
                  <p>
                    {section?.correct !== undefined ? section?.correct : "NA"}
                  </p>
                </div>
                <div className="flex justify-between w-full font-semibold text-lg">
                  <p className="text-[#DC2626]"> Incorrect</p>
                  <p>
                    {section?.incorrect !== undefined
                      ? section?.incorrect
                      : "NA"}
                  </p>
                </div>
                <div className="flex justify-between w-full font-semibold text-lg">
                  <p className="text-[#FBBF40]"> Missed</p>
                  <p>
                    {section?.missed !== undefined ? section?.missed : "NA"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {sectionData.length === 3 && (
          <div className="grid grid-cols-2 gap-x-3 min-h-[13rem]">
            <div className="w-full h-full bg-[#333238] flex flex-col items-center justify-between p-5 rounded-2xl">
              <BarChart
                heading={"Your Accuracy"}
                section1={sectionData[0]?.sectionName}
                section2={sectionData[1]?.sectionName}
                section3={sectionData[2]?.sectionName}
                data1={
                  sectionData[0]?.correct !== undefined
                    ? Math.round(
                        (sectionData[0]?.correct * 100) /
                          (sectionData[0]?.correct + sectionData[0]?.incorrect)
                      )
                    : "NA"
                }
                data2={
                  sectionData[1]?.correct !== undefined
                    ? Math.round(
                        (sectionData[1]?.correct * 100) /
                          (sectionData[1]?.correct + sectionData[1]?.incorrect)
                      )
                    : "NA"
                }
                data3={
                  sectionData[2]?.correct !== undefined
                    ? Math.round(
                        (sectionData[2]?.correct * 100) /
                          (sectionData[2]?.correct + sectionData[2]?.incorrect)
                      )
                    : "NA"
                }
              />
            </div>
            <div className="w-full h-full bg-[#333238] flex flex-col items-center justify-between p-5 rounded-2xl">
              <BarChart
                heading={" Questions Attempted "}
                section1={sectionData[0]?.sectionName}
                section2={sectionData[1]?.sectionName}
                section3={sectionData[2]?.sectionName}
                data1={
                  sectionData[0]?.correct !== undefined
                    ? Math.round(
                        ((sectionData[0]?.correct + sectionData[0]?.incorrect) *
                          100) /
                          (sectionData[0]?.correct +
                            sectionData[0]?.incorrect +
                            sectionData[0]?.missed)
                      )
                    : "NA"
                }
                data2={
                  sectionData[1]?.correct !== undefined
                    ? Math.round(
                        ((sectionData[1]?.correct + sectionData[1]?.incorrect) *
                          100) /
                          (sectionData[1]?.correct +
                            sectionData[1]?.incorrect +
                            sectionData[1]?.missed)
                      )
                    : "NA"
                }
                data3={
                  sectionData[2]?.correct !== undefined
                    ? Math.round(
                        ((sectionData[2]?.correct + sectionData[2]?.incorrect) *
                          100) /
                          (sectionData[2]?.correct +
                            sectionData[2]?.incorrect +
                            sectionData[2]?.missed)
                      )
                    : "NA"
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
