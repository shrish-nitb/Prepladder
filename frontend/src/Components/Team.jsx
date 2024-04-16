import React from "react";

import Air2 from "../assets/AIR_2.jpeg";
import Air4 from "../assets/AIR_4.jpeg";
import Air8 from "../assets/AIR_8.png";
import Air9 from "../assets/AIR_9.jpeg";
import Air13 from "../assets/AIR_13.png";

const data = [
  {
    name: "Mahek Choudhary",
    Air: "2",
    image: Air2,
  },
  {
    name: "Vamshi Krishna Reddy",
    Air: "4",
    image: Air4,
  },
  {
    name: "Sharmin Sabri",
    Air: "8",
    image: Air8,
  },
  {
    name: "Shounak Banerjee",
    Air: "9",
    image: Air9,
  },
  {
    name: "Vatsal Jain",
    Air: "13",
    image: Air13,
  },
];
const Team = () => {
  return (
    <div className="w-full flex flex-col text-black mt-12 mb-20">
      <p className="text-3xl text-[#bdf9a2] font-bold text-center">
        We have on board with us<span></span>
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-x-9 gap-y-14 mx-auto w-full mt-6 ">
        {data.map((user, i) => {
          return (
            <div
              key={i}
              className="flex flex-col w-full items-center justify-center text-center  text-black relative "
            >
              <img
                src={user?.image}
                alt=""
                className=" aspect-[3/4] w-[95%] hover:scale-[1.02] duration-500 transition-all object-cover scale-90 z-[2] rounded-lg"
              />
              <div className="flex flex-col absolute bottom-0 pt-10 pb-3 z-0 translate-y-16 w-full items-center justify-center text-black rounded-lg bg-[#bdf9a2] bg-opacity-40 ">
                <p className="font-extrabold text-lg">AIR {user?.Air}</p>
                <p className="font-semibold text-xl">{user?.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
