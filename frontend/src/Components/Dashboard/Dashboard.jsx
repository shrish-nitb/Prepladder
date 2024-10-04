import React, { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaPen, FaSave } from "react-icons/fa";
import RadialChart from "./RadialChart";
import { IoLockOpen } from "react-icons/io5";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BuyModal } from "../BuyModal";
import Loader from "../Loader";
import Countdown from "./Countdown";
import refreshTokenIfExpired from "../../utils/refreshTokenIfExpired ";
import YourProgressSlider from "./YourProgressSlider";
import { GrDocumentTest } from "react-icons/gr";
import { HiStar } from "react-icons/hi2";
import { TbSquareRoundedPercentage } from "react-icons/tb";

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

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  let { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const lastRefreshedToken = localStorage.getItem("lastRefreshed");
  const currentTime = Date.now();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentTime - lastRefreshedToken > 120 * 60 * 1000) {
      localStorage.setItem("lastRefreshed", currentTime);
      refreshTokenIfExpired(dispatch);
      navigate("/");
      return;
    }
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const refreshToken = await refreshTokenIfExpired(dispatch);
        if (refreshToken) token = refreshToken;
        const data = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data?.data);
        window.localStorage.setItem("user", JSON.stringify(data?.data));
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

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user?.photoURL);
  const handleEditToggle = () => {
    setEditOpen(!editOpen);
  };

  const handleSaveProfile = () => {
    // Save the edited phone number and bio in localStorage
    const updatedUser = {
      ...user,
      phone: phoneNumber,
      bio: bio,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // After saving, close the edit mode
    setEditOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full min-h-screen mx-auto relative bg-[#181818] overflow-visible text-white flex flex-col items-center justify-between ">
          <div className="w-10/12 h-full flex flex-col items-center justify-center mx-auto py-20 lg:py-10 gap-y-10">
            {/* name and image */}
            <div className="flex items-start gap-x-5 w-full ">
              <p className=" font-kreon text-2xl">{`Welcome Back, ${user?.name}`}</p>
              <img
                src={user?.picture}
                alt=""
                className="w-20 rounded-lg bg-cover"
              />
            </div>
            {/* your progress */}
            <p className="uppercase w-full">Your Progress</p>
            {/* dashboard content */}
            <div className="w-full flex lg:flex-row flex-col items-start gap-10">
              {/* left section */}
              <div className="lg:w-[75%] w-full flex flex-col gap-y-5">
                {/* top section */}
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
                {/* bottom section -> leaderboard and calender */}
               <div className="flex md:flex-row flex-col justify-between gap-5 ">
                {/* leaderboard */}
               <div className="lg:w-[30%] w-full bg-[#000000] p-2 px-5 rounded-xl text-white  shadow-black shadow-md flex flex-col justify-between max-h-[27rem] overflow-hidden">
                  {/* user details */}
                  <div className=" w-full  h-fit flex  justify-between gap-x-5">
                    <div className="flex flex-col items-start gap-y-5">
                      <p className="flex flex-wrap items-center text-xl font-[400]">
                        {user?.name}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-5xl">{`52`}</p>
                          {/* <p className="text-sm font-thin ">Marks</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <img
                        src={user?.picture}
                        alt=""
                        className="rounded-2xl  w-40   object-cover"
                      />
                      <p className="text-sm font-thin">Highest Avg</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white my-1">
                    <p className="opacity-0">a</p>
                  </div>
                  <div className="grid grid-cols-3 gap-5 items-center text-sm">
                    <p className="opacity-0">a</p>
                    <p className="font-thin">Score</p>
                    <p className="font-thin">Rank</p>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-center">
                    {leaderboard.slice(0, 4).map((user, i) => (
                      <>
                        <div
                          key={`${user?.id}-image`}
                          className="col-start-1 col-end-2 "
                        >
                          <img
                            src={user?.picture}
                            alt=""
                            className="rounded-lg w-20 h-[3.5rem] object-cover "
                          />
                        </div>
                        <div
                          key={`${user?.id}-points`}
                          className="col-start-2 col-end-3 text-2xl "
                        >
                          <p>{user?.points}</p>
                        </div>
                        <div
                          key={`${user?.id}-rank`}
                          className="col-start-3 col-end-4 text-2xl"
                        >
                          <p>{i + 1}</p>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23ffffff&showTitle=0&showDate=0&showTabs=0&showPrint=0&showTz=0&showCalendars=0&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB" className="w-full" ></iframe>
               </div>
              </div>
              {/* right Section */}
              <div className=" flex flex-col items-center justify-between gap-y-10 h-[100%] lg:w-[20%] w-full">
              <div className=" flex flex-col justify-end bg-[#E5E5E5] text-black rounded-2xl p-[1rem] font-bold">
                    <p className="text-xl font-kreon opacity-0 ">Closer to</p>
                    <p className="opacity-0">Dream University</p>
                    <div className="flex items-center gap-x-3 opacity-0">
                      <TbSquareRoundedPercentage className="text-[#c49c2e] text-2xl opacity-0" />
                      <p className="text-2xl font-bold opacity-0">{`38.9 %`}</p>
                    </div>
                    <p className="opacity-0">Yaaay, getting closer to your dream university</p>
                  </div>
                 <div className=" flex flex-col justify-end bg-[#E5E5E5] text-black rounded-2xl p-[1rem] font-bold">
                    <p className="text-xl font-kreon opacity-0 ">Closer to</p>
                    <p className="opacity-0">Dream University</p>
                    <div className="flex items-center gap-x-3 opacity-0">
                      <TbSquareRoundedPercentage className="text-[#c49c2e] text-2xl opacity-0" />
                      <p className="text-2xl font-bold opacity-0">{`38.9 %`}</p>
                    </div>
                    <p className="opacity-0">Yaaay, getting closer to your dream university</p>
                  </div>
                 <div className=" flex flex-col justify-end bg-[#E5E5E5] text-black rounded-2xl p-[1rem] font-bold">
                    <p className="text-xl font-kreon opacity-0 ">Closer to</p>
                    <p className="opacity-0">Dream University</p>
                    <div className="flex items-center gap-x-3 opacity-0">
                      <TbSquareRoundedPercentage className="text-[#c49c2e] text-2xl opacity-0" />
                      <p className="text-2xl font-bold opacity-0">{`38.9 %`}</p>
                    </div>
                    <p className="opacity-0">Yaaay, getting closer to your dream university</p>
                  </div>

              </div>
            </div>
          </div>
          <div className="w-10/12 bg-[#333238] py-2 flex items-center justify-end gap-x-6  px-5 rounded-lg">
            <Link
              to={"https://www.projectascend.in/refunds"}
              className="hover:text-[#bdf9a2]"
            >
              <p>Refund Policy</p>
            </Link>
            <Link
              to={"https://www.projectascend.in/privacy-policy"}
              className="hover:text-[#bdf9a2]"
            >
              <p> Privacy Policy</p>
            </Link>
            <Link
              to={"https://www.projectascend.in/terms"}
              className="hover:text-[#bdf9a2]"
            >
              <p> Terms & Condition</p>
            </Link>
            <p>DIODE</p>
          </div>
          {buyModalOpen && <BuyModal setBuyModalOpen={setBuyModalOpen} />}
        </div>
      )}
    </>
  );
};

export default Dashboard;
