import React, { useEffect, useState } from "react";
import MockAnalysis from "./MockAnalysis";
import Report from "./Report";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
const Analysis = () => {
  const [currentSelected, setCurrentSelected] = useState("report");
  const [currentSection, setCurrentSection] = useState(0);
  const { id } = useParams();
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let { token } = useSelector((state) => state.auth);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [sectionData, setSectionData] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [difficulty, setDifficulty] = useState([]);
  const [currentDifficultySection, setCurrentDifficultySection] = useState(0);
  const location = useLocation();

  // Extract state from location object
  const testName = location.state?.testName;
  // console.log(location);

  useEffect(() => {
    // console.log(report); // Log report state after it's updated
  }, [report]); // Run this effect whenever the report state changes

  useEffect(() => {
    // console.log(correct, incorrect, skipped, sectionData); // Log other state variables after they're updated
  }, [correct, incorrect, skipped, sectionData]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/report/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.request(config);
        setReport(res.data);
        // console.log(res.data);
        const transformedSections = res?.data?.sections.map((section) => {
          const easyQuestions = [];
          const mediumQuestions = [];
          const hardQuestions = [];
    
          section.questions.forEach((question, index) => {
            const status =
              question?.status === 1
                ? question?.marked == question?.answer ? "correct" : "incorrect"
                : "unattempted"
    
            switch (question?._id?.meta?.tag) {
              case "EASY":
                easyQuestions.push({
                  questionNumber: (index + 1).toString(),
                  status: status,
                });
                break;
              case "MEDIUM":
                mediumQuestions.push({
                  questionNumber: (index + 1).toString(),
                  status: status,
                });
                break;
              case "HARD":
                hardQuestions.push({
                  questionNumber: (index + 1).toString(),
                  status: status,
                });
                break;
              default:
                break;
            }
          });
    
          return {
            name: section.name,
            easy: easyQuestions,
            medium: mediumQuestions,
            hard: hardQuestions,
          };
        });
    
        // console.log(transformedSections);
        setDifficulty(transformedSections)
        let markedAsAnswerCount = 0;
        let notMarkedAsAnswerCount = 0;
        let skippedQuestions = 0;
        let sectionCounts = {};

        // Loop through sections
        res.data.sections.forEach((section, index) => {
          let correctCount = 0;
          let incorrectCount = 0;
          let missedCount = 0;

          // Loop through questions in the section
          section.questions.forEach((question) => {
            // Check if question is marked as answer
            if (question?.marked == question?.answer) {
              markedAsAnswerCount++;
              correctCount++;
            } else if (
              question?.marked != "" &&
              question?.marked != question?.answer
            ) {
              // Check if question is marked but not as the answer
              notMarkedAsAnswerCount++;
              incorrectCount++;
            }
            if (
              question?.status === 3 ||
              question?.status === 4 ||
              question?.status === 0
            ) {
              skippedQuestions++;
              missedCount++;
            }
          });

          sectionCounts[section?.name] = {
            correct: correctCount,
            incorrect: incorrectCount,
            missed: missedCount,
          };
        });

        setCorrect(markedAsAnswerCount);
        setIncorrect(notMarkedAsAnswerCount);
        setSkipped(skippedQuestions);
        const sectionCountsArray = Object.entries(sectionCounts).map(
          ([sectionName, counts]) => ({
            sectionName,
            ...counts,
          })
        );
        setSectionData(sectionCountsArray);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, []);

  const handleSectionChange = (event) => {
    setCurrentSection(event.target.value);
  };

  return (
    <div className="w-screen h-full mx-auto relative bg-[#181818] flex flex-col items-center min-h-screen mb-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:pt-10 pt-20 flex flex-col w-10/12 text-white gap-y-5">
          {/* mock name */}
          <div className="w-full justify-end flex">
            <p className="py-2 px-11 bg-[#0A1CFC] uppercase font-semibold text-lg">
              {testName}
            </p>
          </div>
          {/* report or analysis slider */}
          <div className="w-full justify-between flex  ">
            <div
              className={`${
                currentSelected === "report" ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="bg-[#1D2129] items-center justify-center flex px-3 py-1 rounded-md relative">
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
                            setCurrentQuestion(0);
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
            <div className="flex gap-x-3  bg-[#1D2129] py-1 px-1 rounded-3xl">
              <button
                className={`py-1 px-3 rounded-3xl ${
                  currentSelected === "report" ? "bg-[#0D9AA6]" : ""
                } `}
                onClick={() => {
                  setCurrentSelected("report");
                  // console.log(
                  //   "Current selected after clicking Report:",
                  //   currentSelected
                  // );
                }}
              >
                Report
              </button>
              <button
                className={`py-1 px-3 rounded-3xl ${
                  currentSelected === "analysis" ? "bg-[#0D9AA6]" : ""
                }`}
                onClick={() => {
                  setCurrentSelected("analysis");
                  // console.log(
                  //   "Current selected after clicking Analysis:",
                  //   currentSelected
                  // );
                }}
              >
                Analysis
              </button>
            </div>
          </div>
          {currentSelected === "report" ? (
            <Report
              report={report}
              correct={correct}
              incorrect={incorrect}
              skipped={skipped}
              sectionData={sectionData}
              difficulty={difficulty}
              currentDifficultySection={currentDifficultySection}
              setCurrentDifficultySection={setCurrentDifficultySection}
            />
          ) : (
            <MockAnalysis
              data={report?.sections[currentSection]}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Analysis;
