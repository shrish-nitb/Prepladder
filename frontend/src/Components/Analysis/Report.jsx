import React, { useRef, useState } from "react";
import BarChart from "./BarChar";
import StackedChart from "./StackedChart";
import TimeTakenGraph from "./TimeTakenGraph";
import RadialChart from "../Dashboard/RadialChart";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Report = ({ report, correct, incorrect, skipped, sectionData, difficulty, currentDifficultySection, setCurrentDifficultySection }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [difficultyOptionOpen, setDifficultyOptionOpen] = useState(false);
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
  // console.log(report);
  // console.log(user);

  return (
    <div className="w-full flex flex-col lg:flex-row items-start gap-5 ">
      {/* <div className="lg:w-[25%] w-full  flex md:flex-row flex-col  lg:flex-col gap-3 ">
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
      <div className=" lg:w-1/4 w-full  flex md:flex-row flex-col  lg:flex-col gap-3 ">
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
      <div className="lg:w-1/2 w-full  flex  flex-col  lg:flex-col gap-3 ">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 min-h-[15rem]">
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 min-h-[13rem]">
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
      </div> */}
      {/* left section */}
      <div className="lg:w-[75%] w-full  flex  flex-col  lg:flex-col gap-3">
        {/* leaderBoard and overview */}
        <div className=" flex lg:flex-row flex-col gap-6">
          {/* leaderboard */}
          <div className="lg:w-[30%] w-full bg-[#000000] p-2 px-5 rounded-xl text-white  shadow-black shadow-md flex flex-col justify-between max-h-[27rem] overflow-hidden">
            {/* user details */}
            <div className=" w-full  h-fit flex  justify-between gap-x-5">
              <div className="flex flex-col items-start justify-between">
                <p className="flex flex-wrap items-center text-2xl font-[400]">
                  {user?.name}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-6">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl">{report?.points}</p>
                    <p className="text-sm font-thin ">Marks</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl">{report?.rank}</p>
                    <p className="text-sm font-thin">Rank</p>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={user?.picture}
                  alt=""
                  className="rounded-2xl  w-40   object-cover"
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-white my-1">
              <p className="opacity-0">a</p>
            </div>
            <div className="grid grid-cols-3 gap-5 items-center text-sm">
              <p className="opacity-0">a</p>
              <p className="font-thin">Score</p>
              <p className="font-thin">Rank</p>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-center">
              {report?.leaderboard.slice(0, 4).map((user, i) => (
                <>
                  <div
                    key={`${user?.id}-image`}
                    className="col-start-1 col-end-2 "
                  >
                    <img
                      src={user?.picture}
                      alt=""
                      className="rounded-lg w-20 h-[3.5rem] object-cover "
                    />
                  </div>
                  <div
                    key={`${user?.id}-points`}
                    className="col-start-2 col-end-3 text-2xl "
                  >
                    <p>{user?.points}</p>
                  </div>
                  <div
                    key={`${user?.id}-rank`}
                    className="col-start-3 col-end-4 text-2xl"
                  >
                    <p>{i + 1}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* overview */}
          <div className="lg:w-[70%] w-full bg-[#000000] p-2 px-5 rounded-xl text-white  shadow-black shadow-md flex flex-col max-h-[27rem] overflow-hidden">
            <p className="text-3xl">Overview</p>
            <p className="text-[#6F6F6F] pt-6">Good Shit</p>
            <div className="flex items-center justify-end gap-x-3">
              <div className="flex items-center gap-x-1">
                <div className="w-3 h-3 bg-[#28a475] gap-x-1"></div>
                <p>Correct</p>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-3 h-3 bg-[#dc3545] gap-x-"></div>
                <p>Incorrect</p>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-3 h-3 bg-[#ffc107] gap-x-3"></div>
                <p>Unattempted</p>
              </div>
            </div>
            <div className="w-full px-5 flex gap-x-6 items-center justify-center">
              <StackedChart data={sectionData} />
            </div>
          </div>
        </div>
        {/* section Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-fit gap-8 my-5">
          {report?.sections.map((section, i) => {
            return (
              <div
                className="bg-[#E7FFEC] rounded-xl w-full flex flex-col items-start justify-start px-5 py-2 text-black gap-5 "
                key={i}
              >
                <p className="">{section?.name}</p>
                <div className="flex justify-evenly items-center w-full">
                  <div className="border-[3px] border-black px-8 py-2 rounded-2xl items-center justify-center flex flex-col ">
                    <p className="text-2xl">8</p>

                    <p>Rank</p>
                  </div>
                  <div className="border-[3px] border-black px-10 py-2 rounded-2xl items-center justify-center flex flex-col">
                    <p className="text-2xl">{section?.points}</p>
                    <p>Score</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* timetaken Graph */}
        <div className="w-full flex items-center justify-center mb-5">
          <TimeTakenGraph report={report} />
        </div>
      </div>
      {/* right section */}
      <div className="lg:w-[25%] w-full  flex flex-col  lg:flex-col gap-3">
        {/* accuracy and negetive marks block */}
        <div className="grid grid-cols-2 gap-2 ">
          <div className="bg-black h-full flex flex-col px-5 py-2 rounded-xl gap-y-5">
            <p className="text-sm">Your Accuracy</p>
            <p className="w-full text-[#CAFFC9] text-5xl">{` ${Math.round((correct / (correct + incorrect)) * 100)
                ? Math.round((correct / (correct + incorrect)) * 100)
                : 0
              }%`}</p>
            <div className="w-full h-5 rounded-md relative bg-white">
              <div
                className="bg-[#0054DB] h-5 absolute top-0 left-0 rounded-sm"
                style={{
                  width: `${Math.round(
                    (correct / (correct + incorrect)) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="bg-black h-full flex flex-col px-5 py-2 rounded-md gap-y-5">
            <p className="text-sm">Lost in Negative</p>
            <div className="flex items-center justify-between">
              <p className="w-full text-[#E99A9A] text-5xl">{incorrect} </p>
              <span className="text-sm text-white"> Marks</span>
            </div>
            <p className="text-sm">Your rank could have been</p>
          </div>
        </div>
        {/* radial percetile */}
        <div className="w-full rounded-xl bg-black flex flex-col px-6 py-3 justify-center ">
          <div className="p-6 flex items-center justify-center">
            <RadialChart subscribed={100} taken={85} title={"Percentile"} />
          </div>
          <div className="flex items-center justify-between">
            <p>Targeted Percentile </p>
            <p>100</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Result Percentile</p>
            <p>85</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Left to Achieve Your Target </p>
            <p>15</p>
          </div>
        </div>
        {/* difficulty Section */}
        <div className="w-full rounded-xl bg-black flex flex-col px-6 py-3 justify-center ">
          <div className="flex items-center justify-between">
          <p className="py-3">Difficulty Analysis</p>
          <div className="bg-[#1D2129] items-center justify-center flex px-3 py-1 rounded-md relative">
            <button
              onClick={() => {
                setDifficultyOptionOpen(!difficultyOptionOpen);
              }}
              className="flex items-center justify-center gap-x-3 transition-all duration-300"
            >
              <p>{difficulty[currentDifficultySection]?.name}</p>
              {!difficultyOptionOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {difficultyOptionOpen && (
              <div className="w-full absolute top-0 translate-y-10 left-0 gap-y-1 flex flex-col rounded-xl bg-[#1D2129]">
                {difficulty.map((section, index) => {
                  return (
                    <button
                      className="bg-[#1D2129] items-center justify-center flex  px-3 py-2 hover:bg-[#0D9AA6]"
                      onClick={() => {
                        setCurrentDifficultySection(index);
                        setDifficultyOptionOpen(false);
                        // setCurrentQuestion(0);
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
          <div className="mt-3 gap-y-3 flex flex-col"  >
              <p>Easy</p>
              <div className="bg-white w-full h-[1px] my-1"></div>
              <div className=" w-full grid grid-cols-6 mx-auto gap-3 h-fit">
              {difficulty[currentDifficultySection]?.easy.map((question, index) => {
                return (
                  <div
                    key={index}
                    className={` ${
                      question?.status === "unattempted"
                        ? "bg-[#ffc107]"
                        :  question?.status === "correct"
                        ? "bg-[#31e452]"
                        : "bg-[#dc3545]"
                    } rounded-md h-[2rem] w-[2rem] text-black flex items-center justify-center`}
                  >
                    {question?.questionNumber}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 gap-y-3 flex flex-col"  >
              <p>Medium</p>
              <div className="bg-white w-full h-[1px] my-1"></div>
              <div className=" w-full grid grid-cols-6 mx-auto gap-3 h-fit">
              {difficulty[currentDifficultySection]?.medium.map((question, index) => {
                return (
                  <div
                    key={index}
                    className={` ${
                      question?.status === "unattempted"
                        ? "bg-[#ffc107]"
                        :  question?.status === "correct"
                        ? "bg-[#31e452]"
                        : "bg-[#dc3545]"
                    } rounded-md  h-[2rem] w-[2rem] text-black flex items-center justify-center`}
                  >
                    {question?.questionNumber}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 gap-y-3 flex flex-col"  >
              <p>Hard</p>
              <div className="bg-white w-full h-[1px] my-1"></div>
              <div className=" w-full grid grid-cols-6 mx-auto gap-3 h-fit">
              {difficulty[currentDifficultySection]?.hard.map((question, index) => {
                return (
                  <div
                    key={index}
                    className={` ${
                      question?.status === "unattempted"
                        ? "bg-[#ffc107]"
                        :  question?.status === "correct"
                        ? "bg-[#31e452]"
                        : "bg-[#dc3545]"
                    } rounded-md  h-[2rem] w-[2rem] text-black flex items-center justify-center`}
                  >
                    {question?.questionNumber}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Report;
