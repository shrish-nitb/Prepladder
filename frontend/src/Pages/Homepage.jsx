import React from "react";

import bg from "../assets/homeBg.jpg";
import { Link } from "react-router-dom";
import Team from "../Components/Team";
import TryCards from "../Components/TryCards";
import About from "../Components/About";
import FaqAccordian, {
  AccordionCustomIcon,
  AccordionCustomStyles,
} from "../Components/FaqAccordian";
// import { Accordion } from "@material-tailwind/react";

const Homepage = () => {
  return (
    <div className="w-screen h-full relative flex flex-col justify-center items-center bg-white ">
      <div className="homeBg w-screen h-full relative flex flex-col justify-center items-center ">
        <div className="  h-[70vh] w-11/12 flex flex-col justify-center  items-center gap-y-5 text-center ">
          <div className=" bg-white rounded-3xl py-2 px-3 mt-20 hover:scale-[1.02] duration-500 transition-all">
            <p className="text-gradient font-bold text-2xl ">
              {" "}
              Bringing together the next batch of IPMers
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <p className="font-semibold text-xl">
              Your IPMAT blueprint by IPMers
            </p>
            <Link
              to={"/login"}
              className=" bg-[#fff] text-lg bg-opacity-90 py-2 px-3 rounded-xl text-[#bdf9a2] font-semibold hover:scale-105 duration-300 transition-all "
            >
              Join Now
            </Link>
          </div>
        </div>
        <div className="mt-[15rem] flex md:flex-row flex-col w-11/12 md:items-start md:justify-start  justify-center items-center gap-y-3 pb-[12rem]">
          <div className="flex flex-col lg:w-[30%] md:w-[60%] w-[90%]  gap-x-3  ">
            <div className="bg-white/[0.75]  shadow-lg rounded-xl py-4 px-8 hover:scale-[1.02] duration-500 transition-all">
              <p className="text-[28px] font-bold border-b-2 border-b-grey-500 pb-2">
                Want Just IPMAT-I Mocks?
              </p>
              <div className="flex justify-between mt-5">
                <p className="text-lg text-gray-500">25 Mocks</p>
                <Link
                  to={"/login"}
                  class="bg-richblack-50 rounded-xl px-5 font-bold hover:scale-95 duration-300 transition-all"
                >
                  ₹1299 →
                </Link>
              </div>
              <div className="flex justify-between mt-5">
                <p className="text-lg text-gray-500">5 Mocks</p>
                <Link
                  to={"/login"}
                  class="bg-richblack-50 rounded-xl px-6 font-bold hover:scale-95 duration-300 transition-all"
                >
                  ₹299 →
                </Link>
              </div>
            </div>
            <div className="bg-white/[0.75]  hover:scale-[1.02] duration-500 transition-all shadow-lg rounded-xl py-4 px-8 mt-4">
              <p class="text-[28px] font-bold border-b-2 border-b-grey-500 pb-2">
                Something free to try out?
              </p>
              <p className="text-lg text-gray-500 mt-5">
                Break your inertia: <br></br>We have 1 free mocks!
              </p>
              <p className="text-lg text-gray-500">
                <a class="underline" href="/login">
                  Register now
                </a>{" "}
                to attempt and learn.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl  hover:scale-[1.02] duration-500 transition-all shadow-lg py-5 px-8 mx-7 w-[90%] lg:w-[30%] md:w-[60%]">
            <p className="text-[28px] font-extrabold border-b-2 border-b-grey-500 pb-2">
              All Access 🎯
            </p>
            <p className="font-semibold mt-3 text-lg">
              Practise for IPMAT Indore
            </p>
            <p className=" text-gray-500 ">Learn: Adaptive Topic Wise Tests</p>
            <p className=" text-gray-500">
              Practice: Unlimited Sectional Mocks
            </p>
            <p className="font-semibold mt-3 text-lg">
              Engage in Full-Length Mock Tests
            </p>
            <p className="text-gray-500">
              Benefit from 25 IPMAT Indore Practice Tests
            </p>
            <p className="text-gray-500">
              Access 25 Mock Exams for IPMAT Rohtak
            </p>
            <p className="text-gray-500">
              Avail yourself of 25 JIPMAT Mock Assessments
            </p>
            <div className="flex mt-4">
              <div className="w-2/5 px-3 py-1 border-2 border-[#EDEDED] rounded-lg">
                <p className="text-sm text-gray-500 line-through">₹4000</p>
                <p className="text-[32px] font-semibold">₹2999</p>
              </div>
              <div className="w-3/5 flex items-center px-3 py-1 border-2 border-[#EDEDED] rounded-lg ml-5">
                {/* <img alt="Orange" loading="lazy" width="33" height="45" decoding="async" data-nimg="1" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=48&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=96&amp;q=75" style="color: transparent;"></img> */}
                <p className="text-m ml-3">The lowest price so far!</p>
              </div>
            </div>
            <button className="bg-[#bdf9a2] rounded-3xl py-3 w-full text-white mt-2 font-bold">
              Buy Now: Crack IPMAT Today!
            </button>
            <button className="border  rounded-3xl py-3 w-full text-gray-500 mt-3 text-sm">
              2025 Aspirants? Grab All Access for ₹5499
            </button>
          </div>
        </div>
      </div>
      <div className="w-11/12 h-full relative ">
        <div className="redBlur w-[1000px] h-[500px] absolute right-0 top-[50%] translate-x-[20rem] hidden lg:block"></div>
        <p class="md:text-4xl text-2xl text-center font-extrabold">
          The IPMAT landscape is evolving, <br /> and so is the approach to
          preparation:
        </p>
        <p className="text-center text-xl font-semibold py-3">
          Become part of first ever initiative by class of 2023 IPM IIM Indore
        </p>
        <Team />
        <TryCards />
      </div>

      <About />
      <div className="faqBg w-screen overflow-x-hidden">
        <FaqAccordian />
      </div>
    </div>
  );
};

export default Homepage;
