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

const MyProfile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  let { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const lastRefreshedToken = localStorage.getItem('lastRefreshed');
  const currentTime = Date.now();
  const navigate= useNavigate();
  useEffect(() => {
    if ( (currentTime - lastRefreshedToken > 120 * 60 * 1000)) {
      localStorage.setItem("lastRefreshed", currentTime);
       refreshTokenIfExpired(dispatch);
      navigate('/');
      return;
    }
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
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
            {/* Unlock the Full Experience section */}
            {user?.plans.length === 0 && (
              <div className="w-full rounded-2xl py-4 lg:px-6 px-1 flex flex-col lg:flex-row justify-center items-center bg-[#333238] gap-x-6 gap-y-2 ">
                <p className="font-bold text-3xl w-3/5 text-center capitalize">
                  Crack IPMAT in the next 60 days <br />
                  <span className="font-normal text-lg">
                    We provide interactive hackbooks, quizzes, and IPMAT level
                    mocks, unlimited questions to practice, and fun sessions
                    with your future IPM seniors.{" "}
                  </span>
                </p>
                <button
                  className="bg-[#bdf9a2] py-2 px-4 rounded-xl font-bold text-2xl text-black flex items-center justify-center gap-x-3 hover:scale-105 duration-300 transition-all"
                  onClick={() => {
                    setBuyModalOpen(!buyModalOpen);
                  }}
                >
                  <p>Get Now </p>
                  <BsFillArrowRightCircleFill className="" />
                </button>
              </div>
            )}

            {/* User profile section */}
            <div className="w-full h-full bg-[#333238] flex flex-col md:flex-row py-10 px-3 lg:justify-center justify-center gap-5 lg:gap-x-10 rounded-2xl relative">
              <div className="rounded-full md:w-1/3 w-full flex flex-col items-center justify-evenly mt-3 lg:mt-0  gap-y-10">
                <img
                  src={user?.picture}
                  alt=""
                  className="rounded-full  aspect-square object-cover scale-150 "
                />
                <p className="text-sm text-center ">
                  <b>Valid From:</b>
                  <br /> <span>27/03/24</span> to <span>23/05/24</span>
                </p>
              </div>
              <div className="w-1/2 mt-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-x-3 w-full">
                  <p className="font-bold text-lg ">Name :</p>
                  <p>{user?.name}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-x-3 w-full">
                  <p className="font-bold text-lg">Email Address :</p>
                  <p>{user?.email}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-x-3 w-full">
                  <p className="font-bold text-lg">Phone Number :</p>
                  {editOpen ? (
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter Your Phone No."
                      className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p>{user?.phone || "N/A"}</p>
                  )}
                </div>
                {/* <div className="flex flex-col items-start gap-x-3 w-full">
                  <p className="font-bold text-lg md:w-fit w-full">Bio :</p>
                  {editOpen ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Enter Your Bio"
                      className="text-black border md:w-[80%] w-full border-gray-300 mt-3 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="md:w-[80%] w-full">{user?.bio || "N/A"}</p>
                  )}
                </div> */}
              </div>
              {/* <button
                className="absolute top-2 hidden   right-3 bg-[#bdf9a2] md:flex items-center justify-center gap-x-3 text-black font-semibold py-2 px-3 rounded-xl"
                onClick={editOpen ? handleSaveProfile : handleEditToggle}
              >
                {editOpen ? (
                  <>
                    <FaSave />
                    Save Profile
                  </>
                ) : (
                  <>
                    <FaPen />
                    Edit Profile
                  </>
                )}
              </button>
              <button
                className="absolute bottom-2  md:hidden right-3 bg-[#bdf9a2] flex items-center justify-center gap-x-3 text-black font-semibold py-2 px-3 rounded-xl"
                onClick={editOpen ? handleSaveProfile : handleEditToggle}
              >
                {editOpen ? (
                  <>
                    <FaSave />
                    Save Profile
                  </>
                ) : (
                  <>
                    <FaPen />
                    Edit Profile
                  </>
                )}
              </button> */}
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-x-10 gap-y-10 h-full">
              <div className="lg:w-1/3 w-full  py-5 bg-[#333238] rounded-2xl flex items-center  justify-center px-5">
                <div className="h-full flex flex-col items-center justify-around">
                  <p className="text-[1.3rem]">
                    Your IPMAT heist's D-Day is in
                  </p>
                  <Countdown date={"2024-05-23T10:00:00"} />
                </div>
              </div>
              {/* <div className="lg:w-1/3 w-full  py-5 bg-[#333238] rounded-2xl flex items-start lg:justify-between justify-center px-5 text-white">
                
                <div className="h-full flex flex-col items-center justify-around">
                  <p className="text-2xl">Our program starts in</p>
                  <Countdown date={'2024-03-27T10:00:00'}/>
                </div>
              </div> */}
              <div className="lg:w-2/3 text-[#aefac3] w-full bg-[#333238] rounded-2xl flex flex-col justify-center md:px-8  px-4 py-5">
                <p className="text-[1.8rem] font-semibold mt-3 text-center">
                  👀 Don't Miss Out on Your Chance to Get into IIM!
                </p>
                <p className=" mt-2 text-white">
                  With IIMs already having limited intake, seizing the
                  opportunity requires more than just ambition—it demands
                  strategy. Get yourself the right resources and techniques to
                  maximize your chances. Don't just learn but also remember
                  concept with our quizzes, hackbooks and mocks. Prepare for
                  this exam heist the way designed to actually get you to
                  IIM📚🎓
                </p>
              </div>
              
            </div>
            
          </div>
          <div className="w-10/12 bg-[#333238] py-2 flex items-center justify-end gap-x-6  px-5 rounded-lg">
            <Link  to={"https://www.projectascend.in/refunds"} className="hover:text-[#bdf9a2]">
              <p>Refund Policy</p>
            </Link>
            <Link  to={"https://www.projectascend.in/privacy-policy"} className="hover:text-[#bdf9a2]">
             <p> Privacy Policy</p>
            </Link>
            <Link  to={"https://www.projectascend.in/terms"} className="hover:text-[#bdf9a2]">
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

export default MyProfile;
