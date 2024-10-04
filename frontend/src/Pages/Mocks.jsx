import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BuyModal } from "../Components/BuyModal";
import Loader from "../Components/Loader";
import { FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import refreshTokenIfExpired from "../utils/refreshTokenIfExpired ";
import toast from "react-hot-toast";

const Mocks = () => {
 
 
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [index, setIndex] = useState(0);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastRefreshedToken = localStorage.getItem('lastRefreshed');
  const currentTime = Date.now();
  useEffect(() => {
     // Check if the last refresh was more than an hour ago
     if ( (currentTime - lastRefreshedToken > 120 * 60 * 1000)) {
      localStorage.setItem("lastRefreshed", currentTime);
      navigate('/');
      return;
    }
  
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const plansData = await axios.get(`${BASE_URL}/plans`);
        setPlans(plansData?.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const userData = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.localStorage.setItem("user", JSON.stringify(userData?.data));
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please Go to Dashboard.");
      } finally {
        setLoading(false);
      }
    };

    refreshTokenIfExpired(dispatch).then((newToken) => {
      fetchDetails();
    });
  }, [ ]);

  const isTestAttempted = (testId) => {
    return user?.attemptedTest.some((test) => test._id === testId) ?? false;
  };

  const getPlanStatus = useMemo(() => {
    return (planId) => {
      if (planId && user?.plans && user?.plans?.length > 0) {
        const plansWithId = user.plans.filter((plan) =>plan?.plan?._id === planId);
        if (plansWithId.length > 0) {
          const now = Date.now();
          const activePlan = plansWithId.find((plan) => Date.parse(plan?.expiryDate) >= now);
          return activePlan ? 'active' : 'expired';
        }
      }
      return 'inactive';
    };
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-screen min-h-screen h-full mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto">
      <div className="w-10/12 h-full flex flex-col items-center justify-center mx-auto lg:pt-10 pt-20 gap-y-10">
        <div className="flex justify-start items-center w-full gap-x-5 font-bold text-2xl">
          {plans.map((plan, i) => (
            <button
              key={i}
              className={`border-[#bdf9a2] ${index === i && "border-b-[4px]"}`}
              onClick={() => setIndex(i)}
            >
              {plan?.name}
            </button>
          ))}
        </div>
        <div className="bg-[#333238]  h-full rounded-t-3xl w-full px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2">
          {plans[index]?.test.map((data, i) => {
            const status = getPlanStatus(plans[index]?._id);
            return (
              <div
                key={i}
                className={`w-full h-[12rem] ${status === "active" ? "activeMock" : "notActiveMock"} rounded-xl py-3 px-4 text-white mx-auto flex flex-col justify-end`}
              >
                <p className="font-bold text-2xl w-full text-wrap">{data?.name}</p>
                <div className="flex justify-between font-semibold text-lg">
                  <p>M: {data?.maximum}</p>
                  <p>Q: {data?.size}</p>
                  <div className="flex gap-x-3 items-center justify-center">
                    <FaRegClock />
                    <p>{data?.duration / 60} mins</p>
                  </div>
                </div>
                {status === "active" ? (
                  !isTestAttempted(data?._id) ? (
                    <Link
                      to={`/mocks/mock/${data?._id}`}
                      className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl"
                    >
                      <p className="hover:scale-105 duration-500 transition-all">Attempt</p>
                      <MdArrowForwardIos />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl">
                      <p>Already Attempted</p>
                      <MdArrowForwardIos />
                    </div>
                  )
                ) : (
                  <button
                    className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl"
                    onClick={() => setBuyModalOpen(true)}
                  >
                    <p className="hover:scale-105 duration-500 transition-all">{status === "expired" ? "Plan Expired" : "Buy"}</p>
                    <MdArrowForwardIos />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {buyModalOpen && <BuyModal setBuyModalOpen={setBuyModalOpen}  plan={plans[index]}/>}
     
    </div>
  );
};

export default Mocks;
