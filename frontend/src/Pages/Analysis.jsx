import axios from "axios";
import React, { useEffect, useState } from "react";

import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { BuyModal } from "../Components/BuyModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import refreshTokenIfExpired from "../utils/refreshTokenIfExpired ";

const AnalysisPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useSelector((state) => state.auth);
  const dispatch= useDispatch()
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await refreshTokenIfExpired(dispatch);
      try {
        // const data= await axios.get(`${BASE_URL}/plans`)
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/report/list`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.request(config);
        // console.log(res?.data)
        setReport(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchDetails();
  }, []);

  const isTestAttempted = (testId) => {
    return user?.attemptedTest.some((test) => test._id === testId);
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
            <button className={` border-b-[4px] border-[#bdf9a2]  `}>
              Analysis
            </button>
          </div>
          <div className="bg-[#333238] min-h-screen h-full  rounded-t-3xl w-full  px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-center gap-x-5 gap-y-2">
            {report.map((data, i) => {
              return (
                <div
                  key={i}
                  className="w-full h-[12rem] activeMock rounded-xl py-3 px-4 text-white mx-auto flex flex-col justify-end "
                >
                  <p className="font-bold text-3xl">{data?.test?.name}</p>
                  <Link
                    to={{ pathname: `/analysis/${data?._id}` }}
                    state={{ testName: data?.test?.name }}
                    key={data?._id}
                    className="flex items-center justify-center gap-x-3 mt-5 border-dashed border-[2px] font-semibold py-3 rounded-2xl text-xl  "
                  >
                    <p className="hover:scale-105 duration-500 transition-all">
                      Review
                    </p>
                    <MdArrowForwardIos />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
