import React, { useEffect, useState } from "react";
import refreshTokenIfExpired from "../../utils/refreshTokenIfExpired ";
import { useDispatch } from "react-redux";

const Questions = ({
  data,
  currentQuestion,
  setCurrentQuestion,
  numberOfQuestions,
  timeLeft,
  setData,
}) => {
  const [markedOption, setMarkedOption] = useState(data?.marked || null);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [markedValue, setMarkedValue] = useState(data?.marked || "");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [componentDuration, setComponentDuration] = useState(0);
  const [statement, setStatement] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log("Button pressed:", buttonPressCount);
    // Add your logic here that should run whenever a button is pressed
  }, [buttonPressCount]);

  useEffect(() => {
    // console.log(data?.duration);
    setMarkedOption(data?.marked || null);
    // Set markedValue to the marked value of the current question
    setMarkedValue(data?.marked || "");
    // Start the timer when the current question changes
    setStartTime(new Date());
    // Set component duration from data duration
    setComponentDuration(data?.duration || 0);

    if (data && data?._id && data?._id?.statement) {
      const pattern = /#(.*?)#/g;

      // Store the components in an array
      const tempComponents = [];

      // Split the statement into parts
      const parts = data?._id?.statement.split(pattern);

      // Iterate through the parts and add them to tempComponents
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.startsWith("http")) {
          // Image URL
          tempComponents.push({ type: "image", content: part });
        } else {
          // Plain text
          tempComponents.push({ type: "p", content: part });
        }
      }
      // Update the state with the components
      setStatement(tempComponents);
    }
    // console.log(statement);
  }, [data, currentQuestion]);

  useEffect(() => {
    data.duration = data.duration + 1;
    // console.log("current question: ",currentQuestion , " ", data.duration);
  }, [timeLeft]);

  useEffect(() => {
    if (data && data?.marked === "") {
      data.status = 4; // Update the status inside the if condition
    }
  }, [data]);

  const handleOptionChange = (optionId) => {
   
    setMarkedOption(optionId);
    // console.log(optionId);
    // data.marked = optionId;
    // if (optionId !== null) {

    //     data.status = 1;

    // } else {
    //     data.status = 4;
    // }
    setButtonPressCount((prevCount) => prevCount + 1);
  };

  const handleMarkedForReview = async(optionId, markedValue) => {
    const refreshToken = await refreshTokenIfExpired(dispatch);
    if (optionId !== null && data?._id?.type === "SINGLE") {
      setMarkedOption(optionId);
      data.marked = optionId;
      if (optionId !== null) {
        data.status = 2;
      } else {
        data.status = 3;
      }
    } else {
      setMarkedValue(markedValue);
      data.marked = markedValue;
      if (markedValue !== "") {
        data.status = 2;
      } else {
        data.status = 3;
      }
    }
    setCurrentQuestion(
      currentQuestion < numberOfQuestions - 1
        ? currentQuestion + 1
        : currentQuestion
    );
    setButtonPressCount((prevCount) => prevCount + 1);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setMarkedValue(newValue.trim());
    // console.log(markedValue);
    // Update the marked value in the data object
    // data.marked = newValue;
    // if (data.marked !== "") data.status = 1;
  };

  const handleSaveAndNext = async(optionId, markedValue) => {
    await refreshTokenIfExpired(dispatch);
      

    // console.log(optionId,markedValue);
    if (optionId !== null && data?._id?.type === "SINGLE") {
      // setMarkedOption(optionId);
      data.marked = optionId;
      if (optionId !== null) {
        data.status = 1;
      } else {
        data.status = 4;
      }
    } else {
      // setMarkedValue(markedValue);
      data.marked = markedValue.trim();
      if (markedValue !== "") {
        data.status = 1;
      } else {
        data.status = 4;
      }
    }
    setCurrentQuestion(
      currentQuestion < numberOfQuestions - 1
        ? currentQuestion + 1
        : currentQuestion
    );
    setButtonPressCount((prevCount) => prevCount + 1);
  };

  return (
    data && <div className="w-full">
    <p className="font-bold text-sm py-1 unselectable pl-2">
      Question Type: {data?._id?.type}{" "}
    </p>
    <div className="pl-2 border-[1px] border-richblack-50 language bg-[#3B82F6]">
      <p className="text-white">Project Ascend Mock</p>
    </div>
    <div className="pl-2 border-[1px] border-richblack-50 ">
      <p className="font-bold text-sm">Question No. {currentQuestion + 1}</p>
    </div>
    <div className="border-[1px] border-richblack-50 h-96 overflow-auto">
      <div className="p-5 overflow-auto">
        <div className="p-2">
          <p>{data?._id?.directions}</p>
          <div className="flex flex-wrap items-center">
            {statement.map((question, index) => {
              if (question?.type === "p") {
                return <span key={index}>{question.content}</span>;
              } else if (question?.type === "image") {
                return <img key={index} src={question.content} />;
              } else return <></>;
            })}
          </div>
          <img src={data?._id?.media} alt="" />
        </div>
        <form action="">
          {data?._id?.type === "SINGLE" ? (
            data?._id?.options.map((option) => (
              <label key={option?._id} className="flex py-1 content-center">
                <input
                  type="radio"
                  name={data?._id}
                  className=""
                  value={option?._id}
                  checked={markedOption === option?._id}
                  onChange={() => handleOptionChange(option?._id)}
                />
                <div className="pl-2">
                  <span className="__Latex__">{option?.value}</span>
                </div>
              </label>
            ))
          ) : (
            <input
              type="text"
              name={data?._id}
              className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              value={markedValue}
              onChange={handleInputChange}
            />
          )}
        </form>
      </div>
    </div>
    {/* bottom controller */}
    <div className="flex content-center justify-between px-2 mt-16 border-[1px] border-richblack-50">
      <div>
        <button
          className="py-1 px-4 border-[1px] border-richblack-50 m-1"
          onClick={() => handleMarkedForReview(markedOption, markedValue)}
        >
          Mark for Review &amp; Next
        </button>
        <button
          className="py-1 px-4 border-[1px] border-richblack-50 m-1"
          onClick={() => {
            handleOptionChange(null);
            setMarkedValue("");
          }}
        >
          Clear Response
        </button>
      </div>
      <div className="">
        <button
          className="py-1 px-4 border-[1px] border-richblack-50 m-1"
          onClick={() => {
            setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : 0);
          }}
        >
          Previous
        </button>
        <button
          className="py-1 px-4 border-[1px] border-richblack-50 m-1 bg-[#3B82F6] text-white"
          onClick={() => {
            handleSaveAndNext(markedOption, markedValue);
            setEndTime(new Date());
          }}
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  </div>
  );
};

export default Questions;
