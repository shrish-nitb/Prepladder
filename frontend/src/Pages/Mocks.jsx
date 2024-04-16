import axios from "axios";
import React, { useEffect, useState } from "react";

import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { BuyModal } from "../Components/BuyModal";
import Loader from "../Components/Loader";
import { FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import refreshTokenIfExpired from "../utils/refreshTokenIfExpired ";
const Mocks = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [index, setIndex] = useState(0);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await refreshTokenIfExpired(dispatch)
      try {
        const data = await axios.get(`${BASE_URL}/plans`);
        setPlan(data?.data);
        // console.log(data?.data)
      } catch (error) {
        console.log(error);
      }
      const data = await axios.post(`${BASE_URL}/user`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      window.localStorage.setItem("user", JSON.stringify(data?.data));
      setLoading(false);
    };
    fetchDetails();
  }, []);

  const isTestAttempted = (testId) => {
    if (testId && user && user?.attemptedTest.length > 0) {
      // console.log(user?.attemptedTest.some(test => test._id === testId))
      return user?.attemptedTest.some((test) => test._id === testId);
    }
    return false;
  };
  const isPlanActive = (planId) => {
    // console.log(planId)
    if (planId && user && user.plans.length > 0) {
      // console.log(user?.plans.some(plan => plan._id === planId))
      return user?.plans.some((plan) => plan.plan._id === planId);
    }
    return false;
  };

  return (
    <div className="w-screen h-full mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto ">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-10/12  h-full flex flex-col items-center justify-center mx-auto lg:pt-10 pt-20 gap-y-10">
          <div
            className={`flex justify-start items-center w-full gap-x-5 font-bold text-2xl `}
          >
            {plan.map((plan, i) => {
              return (
                <button
                  key={i}
                  className={`  border-[#bdf9a2] ${
                    index === i && "border-b-[4px]"
                  }  `}
                  onClick={() => setIndex(i)}
                >
                  {plan?.name}
                </button>
              );
            })}
          </div>
          <div className="bg-[#333238] min-h-screen h-full  rounded-t-3xl w-full  px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-x-5 gap-y-2">
            {!isPlanActive(plan[index]?._id) ? (
              <>
                {plan[index]?.test.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-[12rem] notActiveMock  rounded-xl py-3 px-4 text-white mx-auto  flex flex-col justify-end "
                    >
                      {/* <p>{data?.name}</p> */}
                      <p className="font-bold text-3xl">{data?.name}</p>
                      <div className="flex justify-between font-semibold text-lg ">
                        <p>M: {data?.maximum}</p>
                        <p>Q: {data?.size}</p>
                        <div className="flex gap-x-3 items-center justify-center">
                          <FaRegClock />
                          <p>{data?.duration} mins</p>
                        </div>
                      </div>
                      <button
                        className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl "
                        onClick={() => setBuyModalOpen(true)}
                      >
                        <p className="hover:scale-105 duration-500 transition-all">
                          Buy
                        </p>
                        <MdArrowForwardIos />
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              plan[index]?.test.map((data, i) => {
                return (
                  <>
                    {
                      <div
                        key={i}
                        className="w-full h-[12rem] activeMock rounded-xl py-3 px-4 text-white mx-auto flex flex-col justify-end "
                      >
                        <p className="font-bold text-3xl">{data?.name}</p>
                        <div className="flex justify-between font-semibold text-lg ">
                          <p>M: {data?.maximum}</p>
                          <p>Q: {data?.size}</p>
                          <div className="flex gap-x-3 items-center justify-center">
                            <FaRegClock />
                            <p>{data?.duration/60} mins</p>
                          </div>
                        </div>
                        {!isTestAttempted(data?._id) ? (
                          <Link
                            to={`/mocks/mock/${data?._id}`}
                            className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl  "
                          >
                            <p className="hover:scale-105 duration-500 transition-all">
                              Attempt
                            </p>
                            <MdArrowForwardIos />
                          </Link>
                        ) : (
                          <div className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl  ">
                            <p className="">Already Attempted</p>
                            <MdArrowForwardIos />
                          </div>
                        )}
                      </div>
                    }
                  </>
                );
              })
            )}
          </div>
        </div>
      )}
      {buyModalOpen && <BuyModal setBuyModalOpen={setBuyModalOpen} />}
    </div>
  );
};

export default Mocks;
