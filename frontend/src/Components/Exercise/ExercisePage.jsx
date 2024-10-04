import { React, useState, useEffect } from "react";
import Questions from "./Questions";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";
import axios from "axios";
import { FaInfinity } from "react-icons/fa6";

const ExercisePage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const location = useLocation();
  const [counter, setCounter] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Extract state from location object
  const topic = location.state?.topic;
  const algoId= location.state?.id
  // console.log(location);
  // const [index,setIndex] = useState(0)
  useEffect(() => {
    // console.log(exerciseData)
    // setNumberOfQuestions(exerciseData.length)
  }, [exerciseData]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let data = JSON.stringify({
          topic: `${topic}`,
          algo:algoId
          
        });
        setLoading(true);
        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/question/list`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        const res = await axios.request(config);
        // console.log(res)
        setExerciseData(res.data?.questions);
        setNumberOfQuestions(res.data?.questions.length);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, []);

  return (
    <div className="w-screen h-screen relative mx-auto  bg-[#181818] text-white overflow-hidden ">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-10/12 h-full flex flex-col items-center justify-center mx-auto lg:pt-10 pt-20 gap-y-10">
          <p className="text-[#bdf9a2] flex justify-start items-start w-full gap-x-5 font-bold text-2xl capitalize ">
            {`# ${id}`}{" "}
          </p>
          {numberOfQuestions > 0 ? (
            <div
              className={` bg-pure-greys-25  h-full  rounded-t-3xl w-full  px-10 py-5 flex flex-col overflow-y-auto  gap-y-3`}
            >
              <div className="w-full flex justify-between items-end h-[40px]">
                <p className="text-pure-greys-25 select-none">.</p>
                <div className="text-black font-semibold flex items-center gap-x-3">
                  {`Question ${counter} of`}
                  <FaInfinity />
                </div>
                <Link
                  to={"/exercise"}
                  className="bg-black py-2 px-5 rounded-lg font-semibold"
                >
                  COMPLETE
                </Link>
              </div>
              <Questions data={exerciseData[currentQuestion]} algoId={algoId} submitted={submitted} setSubmitted={setSubmitted}/>
              <div className="flex items-center justify-center gap-x-5 text-2xl font-bold">
              {!submitted ? (
            <div
              className="flex items-center justify-center text-white duration-300 transition-all"
              onClick={() => {
                setSubmitted(true);
              }}
            >
              <button
                className="bg-black py-2 px-5 rounded-lg font-semibold w-fit text-xl "
                onClick={() => setSubmitted(true)}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center text-black duration-300 transition-all ">
              <button className="border-2 py-2 px-5 rounded-lg font-semibold w-fit cursor-not-allowed select-none text-xl">
                Submit
              </button>
            </div>

          )}
              </div>
              <div className="flex items-center justify-center gap-x-5 text-2xl font-bold ">
                <button
                  className={`bg-black p-3 font-semibold rounded-full h-full aspect-square ${
                    currentQuestion === 0 && counter === 1 ? "hidden" : "block"
                  }`}
                  onClick={() => {
                    if (currentQuestion === 0) {
                      setCurrentQuestion(numberOfQuestions - 1); // Reset currentQuestion to 0 if last currentQuestion is reached
                    } else {
                      setCurrentQuestion(currentQuestion - 1); // Increment currentQuestion otherwise
                    }
                    if (counter <= 1) {
                      setCounter(1);
                    } else setCounter(counter - 1);
                  }}
                >
                  <MdOutlineKeyboardArrowLeft />
                </button>
                <button
                  className="bg-black p-3 font-semibold rounded-full h-full aspect-square"
                  onClick={() => {
                    if (currentQuestion === numberOfQuestions - 1) {
                      setCurrentQuestion(0); // Reset currentQuestion to 0 if last currentQuestion is reached
                    } else {
                      setCurrentQuestion(currentQuestion + 1); // Increment currentQuestion otherwise
                    }
                    setCounter(counter + 1);
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </div>
          ) : (
            <div
              className={` bg-pure-greys-25  h-full  rounded-t-3xl w-full text-black text-2xl text-center font-bold  px-10 py-5 flex flex-col overflow-y-auto  gap-y-3`}
            >
              NO EXERCISE AVAILABLE FOR THIS TOPIC YET...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
