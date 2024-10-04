import axios from "axios";
import React, { useEffect, useState } from "react";

import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BuyModal } from "../Components/BuyModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import refreshTokenIfExpired from "../utils/refreshTokenIfExpired ";
import { GrDocumentTest } from "react-icons/gr";
import { HiStar } from "react-icons/hi2";
import { TbSquareRoundedPercentage } from "react-icons/tb";
import YourProgressSlider from "../Components/Dashboard/YourProgressSlider";
const data = [
  {
    title: "Number of Mocks ",

    performance: [
      {
        subTitle: "Attempted IPMAT Indore",
        optained: 5,
        total: 32,
      },
      {
        subTitle: "Attempted IPMAT Rohtak",
        optained: 3,
        total: 25,
      },
      {
        subTitle: "Attempted IPMAT Jammu",
        optained: 8,
        total: 24,
      },
      {
        subTitle: "Attempted IPMAT IMS",
        optained: 25,
        total: 35,
      },
    ],
    logo: <GrDocumentTest className="text-[#c49c2e] text-2xl" />,
    message: "Great, Keep  giving these mocks!",
  },
  {
    title: "Your Avg Scores in   ",

    performance: [
      {
        subTitle: "Full IPMAT IMS",
        optained: 125,
        total: 160,
      },
      {
        subTitle: "Full IPMAT Indore",
        optained: 120,
        total: 180,
      },
      {
        subTitle: "Full IPMAT Rohtak",
        optained: 12,
        total: 225,
      },
      {
        subTitle: "Full IPMAT Jammu",
        optained: 55,
        total: 535,
      },
    ],
    logo: <HiStar className="text-[#c49c2e] text-2xl" />,
    message: "Don’t worry if you have a low score",
  },
];

const leaderboard = [
  {
    user: "I5R2k6v4hkVcvZC1Gr7g1ij9ADD3",
    points: 168,
    end: "2024-04-13T07:55:49.177Z",
    name: "Pranav Bagade",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocJ7eO5p9Q542WpFfFuMh5KLN4MSrLcOneqxU-6RRSYJ=s96-c",
  },
  {
    user: "6KBmZHeAZbafcry7TfhBq1EJrUn1",
    points: 114,
    end: "2024-05-19T16:03:55.264Z",
    name: "Vishwesh Bhagchandani",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocL3oANSXYAG6ZFqvjPmksfFAMZdcgbqV5eBoPrmDJAqXWs_gD7Aiw=s96-c",
  },
  {
    user: "lONZFYoqEBdkeUsuH1XU2pEbPIG3",
    points: 110,
    end: "2024-05-19T17:25:39.153Z",
    name: "Nimal V",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocL0Pgwxs5QIOMIwGP-7DsRQDW_ajKGe57PoVHJdd1WLWB7JCPq-=s96-c",
  },
  {
    user: "K9av8bvXG2Xlg9IIArOWXgYbRvP2",
    points: 108,
    end: "2024-04-28T05:42:40.552Z",
    name: "Raajas Mulye",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocIGR7rbMcPF0_2kfaMqMgbeQyGw9EGtJUZK6qDpkAoRQDXVrA=s96-c",
  },
  {
    user: "6e9MFAuFyYYabfrgIQ9IIDmvJrA3",
    points: 107,
    end: "2024-04-12T14:32:49.395Z",
    name: "Kreiti Dhawan",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocKbLGQ6Gzcwd04zVNdF1uESW3Ddn2y_GJqZntygh_-SOmEKiw=s96-c",
  },
];

const AnalysisPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  let { token } = useSelector((state) => state.auth);
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const lastRefreshedToken = localStorage.getItem('lastRefreshed');
  const currentTime = Date.now();
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      if ( (currentTime - lastRefreshedToken > 120 * 60 * 1000)) {
        localStorage.setItem("lastRefreshed", currentTime);
        navigate('/');
        return;
      }
      const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
      
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
    refreshTokenIfExpired(dispatch).then((newToken) => {
      if (newToken) {
        token = newToken;
      }
      fetchDetails();
    });
  }, []);

  const isTestAttempted = (testId) => {
    return user?.attemptedTest.some((test) => test?._id === testId);
  };

  return (
    <div className="w-screen min-h-screen h-full mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto ">
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
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center w-full justify-center gap-x-12 gap-y-5">
                  {data.map((d, i) => {
                    return (
                      <YourProgressSlider
                        data={d}
                        title={d?.title}
                        message={d?.message}
                        icon={d?.logo}
                      />
                    );
                  })}
                  <div className="flex items-center justify-center">
                  <div className=" flex flex-col w-[250px] justify-end  h-full bg-[#E5E5E5] text-black rounded-2xl p-[1rem] font-bold">
                    <p className="text-xl font-kreon ">Closer to</p>
                    <p>Dream University</p>
                    <div className="flex items-center gap-x-3">
                      <TbSquareRoundedPercentage className="text-[#c49c2e] text-2xl" />
                      <p className="text-2xl font-bold">{`38.9 %`}</p>
                    </div>
                    <p>Yaaay, getting closer to your dream university</p>
                  </div>
                  </div>
                </div>
          <div className="bg-[#333238]  h-full  rounded-t-3xl w-full  px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-center gap-x-5 gap-y-2">
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
