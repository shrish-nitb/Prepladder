import React from "react";
import TeamPhoto from "../assets/team.png";

const About = () => {
  return (
    <div className="w-full md:h-screen h-full flex flex-col lg:flex-row items-center justify-center bg-[#FAFAFA]">
      <div className="w-11/12 flex flex-col lg:flex-row items-center justify-center gap-x-5 gap-y-5">
        <div className="lg:w-[50%] flex items-center justify-center">
          <img
            src={TeamPhoto}
            alt=""
            className="w-[70%]  hover:scale-[1.02] duration-500 transition-all rounded-xl border-dashed border-black border-[2px] shadow-xl shadow-richblack-600"
          />
        </div>
        <div className="w-[80%] flex flex-col items-center justify-start  ">
          <h1 className="font-bold text-4xl mb-5 text-center">
            What we're all about:
          </h1>
          <p className=" leading-8 font-edu-sa">
            We are students of the IPM ’23 batch at IIM Indore, and it is our
            aim to create an impact. An impact in the IPMAT community for years
            to come by creating a community which selflessly helps all aspirants
            by connecting them with those who have already excelled at this
            exam. We hope to help them juggle their academics, relieve their
            stress and more. We hope to connect a dedicated, ambitious group of
            students who are there for each other at all times.
          </p>
          <p className="leading-8 mt-2 font-edu-sa">
            Starting on a small scale so as to maintain an impeccable close-knit
            community, we are taking only a limited number of students
            presently. However, our ambition is to finally make a ripple (even a
            small one) in the education forums of India, and we will keep
            scaling up as the community grows to reach out to more and more
            aspirants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
