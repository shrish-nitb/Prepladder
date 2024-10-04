import React, { useEffect, useState } from "react";
import testImage from "../../assets/testimage001.webp";
import { Link, useParams } from "react-router-dom";
import MockScreen from "./MockScreen";
import axios from "axios";
import toast from "react-hot-toast";
import refreshTokenIfExpired from "../../utils/refreshTokenIfExpired ";
import { useDispatch } from "react-redux";

const Instruction = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [mockStarted, setMockStarted] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));
  const [loading, setLoading] = useState(true);
  const startTime = localStorage.getItem("testStartTime");
  const { id } = useParams();
  let token = localStorage.getItem("token");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch= useDispatch()
  useEffect(() => {
    if (mockStarted === false) {
      localStorage.removeItem("data");
      localStorage.removeItem("currentSection");
      localStorage.removeItem("testStartTime");
    }
  }, [mockStarted]);

  useEffect(() => {}, [data]);

  const clickHandler = async () => {
    const toastId = toast.loading("Loading...");
    const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
    setIsDisabled(true);
    let data = JSON.stringify({
      test: `${id}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/test/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        localStorage.setItem("data", JSON.stringify(response?.data));
        localStorage.setItem("currentSection", 0);
        
        if (response?.data?.message === "Test Already Attempted") {
          toast.error("Test Already Attempted");
        }
        //    console.log(JSON.stringify(JSON.parse(localStorage.getItem("data")).sections[0]));
        try {
          let res = JSON.stringify({
            report: `${JSON.parse(localStorage.getItem("data"))._id}`,
            data: JSON.parse(localStorage.getItem("data")).sections[0],
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

          axios
            .request(config)
            .then((response) => {
              // console.log(JSON.stringify(response.data));
              setMockStarted(true);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log("console", error);
        toast.error(error.response.data.error);
      });
    toast.dismiss(toastId);
  };
  return (
    <>
      {!mockStarted || !data || data?.message === "Test Already Attempted" ? (
        <div className="flex justify-between w-screen bg-white">
          {/* left */}
          <div className="flex flex-col overflow-y-scroll h-screen w-4/5">
            <p className="w-full bg-[#BFDBFE] py-4 text-xl px-3">
              Instructions
            </p>
            <div className="flex justify-starr pt-5 ml-5">
              <p className="">Please read carefully.</p>
            </div>
            <div>
              <p class="text-md font-bold m-5">General Instructions:</p>
              <ol className="list-decimal pl-5 ml-5">
                <li>
                  The IPMAT Indore 2024 examination will last for 120 minutes.
                </li>
                <li>
                  You cannot switch sections or submit a section prematurely.
                  This rule applies throughout the exam to simulate exam
                  conditions effectively.
                </li>
                <li>
                  The SA section will initiate first. If it doesn't, refresh the
                  page. If encountering a lock during the mock, message us to
                  refresh your attempt.
                </li>
                <li>
                  To save an answer, enter/tick it, and click on "Save & Next".
                  Otherwise, the answer won't be submitted for evaluation.
                </li>
                <li>
                  A virtual calculator is available (no keyboard support, only
                  mouse clicks), similar to IPMAT Indore's setup.
                </li>
                <li>
                  The countdown timer at the top right corner indicates the time
                  remaining to complete the exam. When the timer ends, the exam
                  concludes automatically - no need to submit it.
                </li>
                <li>
                  The question palette on the right shows the status of each
                  question:
                  <ul>
                    <li>
                      <b>a.</b> Not visited{" "}
                    </li>
                    <li>
                      <b>b.</b> Not answered{" "}
                    </li>
                    <li>
                      <b>c.</b> Answered{" "}
                    </li>
                    <li>
                      <b>d.</b> Not answered but marked for review{" "}
                    </li>
                    <li>
                      <b>e.</b> Answered but marked for review.
                    </li>
                  </ul>
                  The "Marked for Review" status serves as a reminder. If an
                  answer is selected for a marked question, it will be
                  considered in the final evaluation.
                </li>
                <li>
                  Specific instructions will be provided during the exam. Focus
                  on the mock now! Sit in a quiet area and avoid distractions.
                </li>
              </ol>
              <br />
              <p class="text-md font-bold m-5">Navigating to a Question:</p>
              <ol className="pl-5 ml-5">
                <p>For multiple-choice questions:</p>
                <p>
                  a. Click on the question number on the palette to navigate
                  directly.
                </p>
                <p>
                  b. Use "Save and Next" to save the answer and move to the next
                  question.
                </p>
                <p>
                  c. Use "Mark for Review and Next" to save the answer, mark it
                  for review, and proceed to the next question.
                </p>
              </ol>
              <br />
              <p class="text-md font-bold m-5">Answering Questions:</p>
              <ol className="list-decimal pl-5 ml-5">
                <li>
                  For multiple-choice questions:
                  <ul>
                    <li>
                      - Select your answer by clicking on the option buttons.
                    </li>
                    <li>
                      - To change your answer, click on another desired option
                      button.
                    </li>
                    <li>- Save your answer by clicking on "Save & Next".</li>
                    <li>
                      - To deselect an answer, click on the chosen option again
                      or use the "Clear Response" button.
                    </li>
                    <li>
                      - Mark a question for review by clicking on "Mark for
                      Review & Next". Answered questions marked for review will
                      be considered in the final evaluation.
                    </li>
                  </ul>
                </li>
                <li>
                  To change an answer, select the question, choose a new option,
                  and click "Save & Next".
                </li>
                <li>Only saved or marked questions will be evaluated.</li>
              </ol>
              <br />

              <p class="text-md font-bold mx-5">Project Ascend Instructions:</p>
              <ol class="my-5 list-decimal pl-5 ml-5">
                <li>
                  1. Some images in the QA section may take a moment to load.{" "}
                  <br /> If the ‘sum of infinite GP formula' doesn't appear,
                  refresh the page (CTRL + R).
                </li>
                <img src={testImage} alt="" />
                <li>
                  If an image doesn't display in mock questions/options, switch
                  to a different question and return immediately.
                </li>
                <li>
                  Close other tabs, attempt the mock in full-screen (F11), and
                  disable notifications for accurate timing.{" "}
                </li>
                <li>
                  Do not reload or close the webpage after completing a section
                  to prevent locking your attempt. For technical issues, contact
                  us via WhatsApp.
                </li>
                <li>
                  Stay calm; mock scores aren't final IPMAT scores. Focus on
                  learning from mistakes. <br /> Release stress and approach the
                  test calmly.{" "}
                </li>
                <li class="underline">
                  <b>The mock starts when you click START MOCK.</b>
                </li>
              </ol>
            </div>
            <div className="w-full flex items-end justify-end px-3 mb-5">
              <button
                onClick={clickHandler}
                disabled={isDisabled}
                className={`p-2 border-[1px] font-semibold text-xl px-3 border-richblack-50 hover:bg-richblack-50/100 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                START MOCK{" "}
              </button>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col  w-1/5">
            <p>User Details</p>
            <div className="flex items-center gap-x-3">
              <p className="font-bold text-lg">
                Name : <span className="font-normal">{user?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <p className="font-bold text-lg w-full">
                Email Address :{" "}
                <span className="font-normal">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <MockScreen />
      )}
    </>
  );
};

export default Instruction;
