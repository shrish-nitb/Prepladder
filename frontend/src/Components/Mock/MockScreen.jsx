import React, { useEffect, useState } from "react";
// import { data } from '../../utils/data';
import Questions from "./Questions";
import userImage from "../../assets/candidateImg.webp";
import "./mock.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Calculator from "../Calculator/Calculator";
import refreshTokenIfExpired from "../../utils/refreshTokenIfExpired ";

const MockScreen = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let { token } = useSelector((state) => state.auth);
  const dispatch= useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data"))); // State to hold data
  const reportId = data?._id;
  // console.log(reportId);
  const storedSection = localStorage.getItem("currentSection");
  const storedStartTime = localStorage.getItem("testStartTime");
  const [currentSection, setCurrentSection] = useState(
    storedSection ? parseInt(storedSection) : 0
  );
  const duration = data?.sections[currentSection]?.duration / 60;
  const [startTime, setStartTime] = useState(
    storedStartTime ? parseInt(storedStartTime) : null
  );
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    data?.sections[currentSection]?.questions.length
  );
  const [palette, setPalette] = useState({
    notVisited: numberOfQuestions,
    answered: 0,
    answeredAndMarkedForReview: 0,
    markedForReview: 0,
    notAnswered: 0,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const origin= location?.state ? location.state.origin : null;
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is F5 (keyCode 116) or the Refresh key (keyCode 82) and prevent the default action
      if (event.keyCode === 116 || (event.ctrlKey && event.keyCode === 82)) {
        event.preventDefault();
      }
    };

    const handleUnload = (event) => {
      event.preventDefault();
      // Chrome requires the event to be set to an empty string
      event.returnValue = "";

      // Prompt the user with a confirmation dialog
      const confirmationMessage = "Are you sure you want to leave this page?";

      // Call the function if the user confirms
      // const confirmed = window.confirm(confirmationMessage);
      // console.log(confirmed);

      if (window.confirm(confirmationMessage)) {
        console.log("calling");
        helper2();
      }

      // Set the return value for different browsers
      (event || window.event).returnValue = confirmationMessage; // For IE and Firefox
      return confirmationMessage; // For Chrome and Safari
    };

    window.addEventListener("beforeunload", handleUnload);

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    // Update localStorage when data changes
    localStorage.setItem("data", JSON.stringify(data));
  }, [timeLeft]);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
      localStorage.setItem("testStartTime", Date.now());
    } else {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = duration * 60 - elapsedTime;
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        // Timer has expired
        setTimeLeft(0);
      }
    }
  }, [duration, startTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(intervalId);
            // Handle timer completion, like submitting the test
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const sectionData = async (response) => {
    try {
      let res = JSON.stringify({
        report: `${reportId}`,
        data: response,
      });
      // console.log(res);
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/report/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: res,
      };

      return await axios.request(config);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReport = async () => {
    try {
      let res = JSON.stringify({
        report: `${reportId}`,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/report/save`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: res,
      };

      return await axios.request(config);
    } catch (err) {
      console.log(err);
    }
  };
  // end old start new
  const helper = async () => {
    const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;;
    const newData = { ...data };
    // console.log(newData);
    newData.sections[currentSection]?.questions.forEach((question) => {
      question._id = question._id._id;
    });
    // console.log(newData.sections[currentSection]);
    // console.log(`${currentSection + 1} ending request sent on `, (new Date()).toISOString())
    let response = await sectionData(newData.sections[currentSection]);
    // console.log(response)
    // console.log(`${currentSection + 1} ending response received on `, (new Date()).toISOString())
    // console.log("prevSection", currentSection);
    // console.log(
    //   "localStorage prev",
    //   parseInt(localStorage.getItem("currentSection"))
    // );
    setCurrentQuestion(0);
    localStorage.setItem("currentSection", currentSection + 1);
    // console.log(
    //   "localStorage current",
    //   parseInt(localStorage.getItem("currentSection"))
    // );
    const newSection = parseInt(localStorage.getItem("currentSection"));
    setCurrentSection(parseInt(localStorage.getItem("currentSection")));
    // console.log("CurrentSection", newSection);
    setNumberOfQuestions(data?.sections[newSection]?.questions.length);
    setPalette({
      notVisited: data?.sections[newSection]?.questions.length,
      answered: 0,
      answeredAndMarkedForReview: 0,
      markedForReview: 0,
      notAnswered: 0,
    });

    setTimeLeft(data?.sections[newSection]?.duration);
    localStorage.setItem("testStartTime", Date.now());
    // console.log(`${newSection + 1} starting request sent on `, (new Date()).toISOString())
    response = await sectionData(data?.sections[newSection]);
    // console.log(response)
    // console.log(`${newSection + 1} starting response received on `, (new Date()).toISOString())
  };

  const helper2 = async () => {
    const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
    const newData = { ...data };
    newData.sections[currentSection]?.questions.forEach((question) => {
      question._id = question._id._id;
    });
    // console.log(newData.sections[currentSection]);

    await sectionData(newData.sections[currentSection]);
    setSubmitClicked(true);
    await submitReport();

    localStorage.removeItem("testStartTime");
    localStorage.removeItem("data");
    localStorage.removeItem("currentSection");
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentSection === data?.sections?.length - 1) {
        helper2();
        return;
      }
      helper();
      // const newData = { ...data };
      // // console.log(newData);
      // newData.sections[currentSection]?.questions.forEach(question => {
      //         question._id = question._id._id;
      //     });
      // console.log(newData.sections[currentSection])
      // sectionData(newData.sections[currentSection])

      // setCurrentSection(currentSection < data?.sections.length - 1 ? currentSection + 1 : currentSection);
      // setNumberOfQuestions(data?.sections[currentSection + 1]?.questions.length);
      // setPalette({
      //     notVisited: data?.sections[currentSection + 1]?.questions.length,
      //     answered: 0,
      //     answeredAndMarkedForReview: 0,
      //     markedForReview: 0,
      //     notAnswered: 0
      // });
      // setCurrentQuestion(0);
      // setTimeLeft(data?.sections[currentSection + 1]?.duration);
      // localStorage.setItem('testStartTime', Date.now());
      // localStorage.setItem('currentSection', currentSection+1);
      // sectionData(data?.sections[currentSection+1])
    }
  }, [timeLeft]);

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const SubmitHandler = async () => {
    try {
      helper2();
      // submitReport();
      localStorage.removeItem("testStartTime");
      localStorage.removeItem("data");
      localStorage.removeItem("currentSection");
      // console.log(data);
      if(origin) navigate(origin);
      else navigate("/mocks");
      // window.location.reload(false);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  };

  useEffect(() => {
    // Initialize variables to track status counts
    let notVisitedCount = 0;
    let answeredCount = 0;
    let answeredAndMarkedForReviewCount = 0;
    let markedForReviewCount = 0;
    let notAnsweredCount = 0;

    // Iterate over each section in data
    data?.sections[currentSection].questions.forEach((question) =>
      // Iterate over each question in the section
      {
        // Check the status of each question and update counts accordingly
        switch (question.status) {
          case 1: // Answered
            answeredCount++;
            break;
          case 2: // Marked for Review
            answeredAndMarkedForReviewCount++;
            break;
          case 3: // Not Answered
            markedForReviewCount++;
            break;
          case 4: // Not Visited
            notAnsweredCount++;
            break;
          default:
            notVisitedCount++;
            break;
        }
      }
    );

    // Update the palette state with the counts
    setPalette({
      notVisited: notVisitedCount,
      answered: answeredCount,
      answeredAndMarkedForReview: answeredAndMarkedForReviewCount,
      markedForReview: markedForReviewCount,
      notAnswered: notAnsweredCount,
    });
  }, [currentQuestion]);

  return (
    <div className="w-scree h-screen bg-white relative">
      <div className="h-screen ">
        <div className="bg-[#1E293B] flex justify-between">
          <p className="text-yellow-200 px-2">IPMAT Indore</p>
          <button
            className="px-2 text-white"
            onClick={() => setCalculatorOpen(!calculatorOpen)}
          >
            Calculator
          </button>
        </div>
        <div className="flex  w-screeen ">
          {/* left section */}
          <div className="w-5/6 h-full">
            <div className="px-2 border-richblack-50 border-[1px] flex items-center justify-between">
              <p>IPMAT Indore</p>
            </div>
            <div className="px-2 border-richblack-50 border-[1px] flex justify-between">
              <p className="unselectable">Sections</p>
              <p className="flex unselectable">
                Time Left:{" "}
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timeLeft % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <div className="border-richblack-50 border-[1px] sections px-2">
              {data?.sections.map((section, i) => {
                return (
                  <button
                    key={section?._id}
                    value={section?._id}
                    className={`border-richblack-50 border-[1px] ${
                      currentSection === i
                        ? "bg-[#3B82F6] text-white"
                        : " text-black"
                    }   px-2 py-2`}
                    // onClick={() => setCurrentSection(i)}
                  >
                    {section?.name}
                  </button>
                );
              })}
            </div>
            <Questions
              data={data?.sections[currentSection]?.questions[currentQuestion]}
              currentSection={currentSection}
              currentQuestion={currentQuestion}
              setCurrentQuestion={handleQuestionChange}
              numberOfQuestions={numberOfQuestions}
              palette={palette}
              setPalette={setPalette}
              timeLeft={timeLeft}
              setData={setData}
            />
          </div>
          {/* right section */}
          <div className="w-1/6">
            <div className="profile flex p-5 gap-x-2">
              <img
                alt="Candidate profile picure"
                src={userImage}
                loading="lazy"
                width="100"
                height="100"
                decoding="async"
                data-nimg="1"
              />
              <div className="flex flex-col items-start justify-start">
                <div className=" ">User</div>
                <p>{user?.name}</p>
              </div>
            </div>
            <div className="sample border-richblack-50 border-[1px] border-t-4 border-l-4 border-slate-400 p-3 ">
              <div className="ansnotans flex">
                <div className="p-1 flex">
                  <div className="Exam_answeredStatic__d9Sum px-3 pl-2.5 pt-1 text-sm">
                    {palette?.answered}
                  </div>
                  <p className="px-2 text-xs text-slate-800 ">Answered</p>
                </div>
                <div className="p-1 flex">
                  <div className="Exam_notAnsweredStatic__ktPbw px-3 pl-2.5 pt-1 text-sm">
                    {palette?.notAnswered}
                  </div>
                  <p className="px-2 text-xs text-slate-800 ">Not Answered</p>
                </div>
              </div>
              <div className="notvismarkrev flex">
                <div className="p-1 flex">
                  <div className="Exam_notVisitStatic__ayeEd px-3 pl-1.5 pt-1 text-sm">
                    {palette?.notVisited}
                  </div>
                  <p className=" text-xs text-slate-800 pl-2 pr-5">
                    Not Visited
                  </p>
                </div>
                <div className="p-1 flex">
                  <div className="Exam_reviewStatic__Wnv8q px-3 pl-2.5 pt-1 text-sm text-white">
                    {palette?.markedForReview}
                  </div>
                  <p className="px-2 text-xs text-slate-800">
                    Marked For Review
                  </p>
                </div>
              </div>
              <div className="ansmarkrev flex p-1">
                <div className="Exam_answeredReviewStatic__Jpp1S px-3 pl-2.5 pt-1 text-sm text-white">
                  {palette?.answeredAndMarkedForReview}
                </div>
                <p className="px-2 text-xs text-slate-800 ">
                  Answered and Marked For Review (will be considered for
                  evaluation)
                </p>
              </div>
            </div>
            <div className="examName bg-[#3B82F6] border-l-4 border-richblack-50 border-[1px] text-xl text-white px-3">
              IPMAT Indore
            </div>
            <div className="questions h-72 overflow-auto border-l-4 border-richblack-50 border-[1px] ">
              <p className="p-2 text-sm font-bold">Choose a Question</p>
              <div className="questions grid grid-cols-4 gap-3 pl-2 pr-10 pb-4">
                {data?.sections[currentSection]?.questions.map(
                  (question, i) => (
                    <button
                      key={i}
                      className={`${
                        question?.status === 0
                          ? "Exam_notVisitMain__fvd9y"
                          : question?.status === 1
                          ? "Exam_answeredMain__ei4UW"
                          : question?.status === 2
                          ? " Exam_answeredReviewMain__Le0LQ"
                          : question?.status === 3
                          ? "Exam_reviewMain__bY6Xu"
                          : "Exam_notAnsweredMain__bzf_d"
                      }`}
                      onClick={async() => {
                         const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
                        setCurrentQuestion(i)
                      }}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="submit bg-[#DBEAFE] py-2 flex justify-center content-center">
              <button
                className={`bg-[#3B82F6] text-white h-10 w-20 ${
                  currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  setSubmitClicked(true);
                }}
                // disabled={currentSection === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {submitClicked && (
        <div className="bg-black fixed  z-[50] h-full w-screen bg-opacity-60 top-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl relative flex flex-col items-center justify-center gap-y-3 mt-3">
            <p>Thank you for attempting the Mock</p>
            <button
              onClick={() => {
                SubmitHandler();
              }}
              className={`border-[1px] px-3 py-2 border-richblack-200 ${
                currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div
        className={`absolute -top-9 scale-75 -right-9 ${
          calculatorOpen ? "block" : "hidden"
        }`}
      >
        <Calculator />
      </div>
    </div>
  );
};

export default MockScreen;
