import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { BuyModal } from "../Components/BuyModal";
import Loader from "../Components/Loader";
import refreshTokenIfExpired from "../utils/refreshTokenIfExpired ";

const exerciseData = [
  {
    name: "Quantitive Aptitude",
    cards: [
      {
        topic: "algebra",
        Subtopic: [
          "progression and series",
          "inequalities and quadratic equations",
          "function: maxima and minima",
          "indices",
        ],
        _id: "id",
      },
      {
        topic: "arithmetic",
        Subtopic: [
          "Time, Speed, and Distance",
          "Time and Work",
          "Averages and Alligations",
          "Profit and Loss",
          "Simple Interest and Compound Interest",
          "Percentages",
          "Ratio, Proportions, and Variations",
        ],
        _id: "id",
      },
      {
        topic: "modern maths",
        Subtopic: [
          "Binomial Theorem",
          "Permutation and Combinations",
          "Trigonometry",
          "Set Theory",
          "Matrices and Determinants",
          "Logarithms",
        ],
        _id: "id",
      },
      {
        topic: "number systems",
        Subtopic: [
          "HCF and LCM",
          "Divisibility Rules",
          "Factorization",
          "Remainder Theory",
          "Integral Solutions",
          "Finding Unit, Tens, and Hundred Digits",
        ],
        _id: "id",
      },
      {
        topic: "geometry",
        Subtopic: [
          "Coordinate Geometry",
          "Circles",
          "Triangles",
          "Solids",
          "Conic Section",
          "Polygons",
          "Quadrilaterals",
        ],
        _id: "id",
      },
    ],
  },
  {
    name: "Verbal Ability",
    cards: [
      {
        topic: "reading comprehension",
        Subtopic: [],
        _id: "id",
      },
      {
        topic: "fill ups",
        Subtopic: ["idioms", "words", "phrasal verbs"],
        _id: "id",
      },
      {
        topic: "sentence correction",
        Subtopic: ["grammar"],
        _id: "id",
      },
      {
        topic: "para-completion",
        Subtopic: [],
        _id: "id",
      },
      {
        topic: "para-jumbles",
        Subtopic: [],
        _id: "id",
      },
      {
        topic: "incorrect word usage",
        Subtopic: ["commonly confused words"],
        _id: "id",
      },
    ],
  },
];

const Exercise = () => {
  const navigate = useNavigate();
  const lastRefreshedToken = localStorage.getItem('lastRefreshed');
  const currentTime = Date.now();
  const [index, setIndex] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"));
  const [exerciseData,setExerciseData] = useState([])
  useEffect(() => {
    if ( (currentTime - lastRefreshedToken > 120 * 60 * 1000)) {
      localStorage.setItem("lastRefreshed", currentTime);
      navigate('/');
      return;
    }
    const fetchDetails = async () => {
      setLoading(true);
      const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
      
      const algoData = await axios.get(`${BASE_URL}/question/algos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(algoData.data?.algos)
      setExerciseData(algoData.data?.algos)

      const data = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      window.localStorage.setItem("user", JSON.stringify(data?.data));
      setLoading(false);
    };
    refreshTokenIfExpired(dispatch).then((newToken) => {
      if (newToken) {
        token = newToken;
      }
      fetchDetails();
    });
  }, []);


  const getAlgoStatus = useMemo(() => {
    return (algoId) => {
      if (algoId && user?.plans && user?.plans.length > 0) {
        const plansWithAlgo = user.plans.filter(plan => 
          plan?.plan?.algo?.includes(algoId)
        );
        if (plansWithAlgo.length > 0) {
          const now = Date.now();
          const activePlan = plansWithAlgo.find(plan => Date.parse(plan?.expiryDate) >= now);
          return activePlan ? 'active' : 'expired';
        }
      }
      return 'inactive';
    };
  }, [user]);
  

  return (
    <div className="w-screen min-h-screen h-full relative mx-auto  bg-[#181818] text-white overflow-x-hidden overflow-y-auto  ">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-10/12 h-full flex flex-col items-center justify-center mx-auto lg:pt-10 pt-20 gap-y-10">
          <div
            className={`flex justify-start items-start w-full gap-x-5 font-bold text-2xl `}
          >
            {exerciseData.map((exercise, i) => {
              return (
                <button
                  key={i}
                  className={`  border-[#bdf9a2] ${
                    index === i && "border-b-[4px]"
                  }  `}
                  onClick={() => setIndex(i)}
                >
                  {exercise?.name}
                </button>
              );
            })}
          </div>
          <div className="bg-[#333238] h-full  rounded-t-3xl w-full  px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-x-5 lg:gap-y-5 gap-y-4">
            {exerciseData[index]?.topics.map((topic) => {
              const status = getAlgoStatus(exerciseData[index]?._id);
              return (
                <div
                  key={topic?._id}
                  className={`w-full bg-[#181818] rounded-2xl flex flex-col py-3 px-4 h-full justify-between`}
                >
                  <div>
                    <p className="text-center text-2xl font-semibold text-[#bdf9a2] mb-3 capitalize">
                      {topic?.name}
                    </p>
                    <table className="w-full">
                      <tbody>
                        {topic?.subtopic.map((subTopic, i) => (
                          <tr key={i} className="flex items-start">
                            <td className="pr-3 pt-1">
                              <FaArrowRightLong className="text-gray-500" />
                            </td>
                            <td className="capitalize">{subTopic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-center">
                    {
                    status==="active" ? (
                      <Link
                        to={{ pathname: `/exercise/${topic?.name}` }}
                        state={{ topic: topic?.name,id:exerciseData[index]?._id }}
                        key={topic?.name}
                        className="py-2 px-3 bg-[#bdf9a2] text-black rounded-lg font-semibold text-lg mt-3 w-fit hover:scale-105 duration-300 transition-all"
                      >
                        Practice Now
                      </Link>
                    ) : (
                      <Link to={'/courses'}
                        className="py-2 px-3 flex items-center justify-center bg-[#bdf9a2] text-black rounded-lg font-semibold text-lg mt-3 w-fit hover:scale-105 duration-300 transition-all"
                        // onClick={() => setBuyModalOpen(true)}
                      >
                        <p className="hover:scale-105 duration-500 transition-all">
                          Buy
                        </p>
                        <MdArrowForwardIos />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {buyModalOpen && <BuyModal setBuyModalOpen={setBuyModalOpen} />}
    </div>
  );
};

export default Exercise;
