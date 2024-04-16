import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    question:
      "The average age of 7 members of Ambani’s family is 30 years. The average age of the same family 5 years ago was:",
    a: "30 Years",
    b: "25 Years",
    c: "20 Years",
    d: "27 Years",
  },
  {
    question:
      "The average of 7 consecutive odd numbers is 21. What is the largest number in the series?",
    a: "23",
    b: "25",
    c: "29",
    d: "27",
  },
  {
    question:
      "There are n persons whose average height is 160cm. If m more persons, whose average height is 172cm, enter the room, then the average height becomes 164cm. Then m: n is",
    a: "1:2",
    b: "1:3",
    c: "2:3",
    d: "3:2",
  },
  {
    question:
      "The class’s average weight (40 students) is 40 kgs. ‘m’ new students join, whose average weight is ‘n’ kgs. m + n = 50, what is the max possible average weight of the class?",
    a: "45.23 kgs",
    b: "46.17 kgs",
    c: "43.67 kgs",
    d: "40.56 kgs",
  },
];

const TryCards = () => {
  const [index, setindex] = useState(0);

  return (
    <div className="w-full flex flex-col text-black mt-[16rem]  mb-[10rem] gap-y-5">
      <p class="md:text-6xl text-4xl  text-center font-extrabold">
        Even if you're starting <br /> from scratch in mathematics,
      </p>
      <p className="text-center text-xl">
        We simplify the exam syllabus into 29 topics and 4 levels of difficulty.
      </p>
      <div class="border-2 border-richblack-50 rounded-3xl mt-12 mx-96 py-5 bg-white hidden lg:block">
        <div class="flex justify-center mx-auto absolute t-0 left-0 right-0 -mt-10">
          <div class="rounded-3xl bg-[#F0F2F3] px-6 py-2 mr-4 hover:scale-95 duration-300 transition-all ">
            <button class="text-xl text-gray-500" onClick={() => setindex(0)}>
              Conceptual
            </button>
          </div>
          <div class="rounded-3xl bg-[#BBF7D0] px-6 py-2 mx-4 hover:scale-95 duration-300 transition-all">
            <button class="text-xl text-green-500" onClick={() => setindex(1)}>
              Easy
            </button>
          </div>
          <div class="rounded-3xl bg-[rgb(254,249,195)] px-6 py-2 mx-4 hover:scale-95 duration-300 transition-all">
            <button class="text-xl text-yellow-500" onClick={() => setindex(2)}>
              Medium
            </button>
          </div>
          <div class="rounded-3xl bg-[#FECACA] px-6 py-2 ml-4 hover:scale-95 duration-300 transition-all">
            <button class="text-xl text-pink-100" onClick={() => setindex(3)}>
              Hard
            </button>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div>
            <p class="text-[20px] text-black pt-8 max-w-[28em] break-word">
              {data[index]?.question}
            </p>
            <div class="flex flex-col pt-3 mb-5">
              <div>
                <label class="pt-1 text-richblack-100 text-[20px]">
                  <input type="radio" name="30 years" id="a" disabled={true} />
                  <span class="ml-2">{data[index]?.a}</span>
                </label>
                <label class="mt-1 ml-10 text-richblack-100 text-[20px]">
                  <input type="radio" name="20 years" id="a" disabled={true} />
                  <span class="ml-2">{data[index]?.b}</span>
                </label>
              </div>
              <div>
                <label class="mt-1 text-richblack-100 text-[20px]">
                  <input type="radio" name="27 years" id="a" disabled={true} />
                  <span class="ml-2">{data[index]?.c}</span>
                </label>
                <label class="mt-1 ml-10 text-richblack-100 text-[20px]">
                  <input type="radio" name="25 years" id="a" disabled={true} />
                  <span class="ml-2">{data[index]?.d}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to={"/login"}
        class="bg-[#bdf9a2] text-center rounded-2xl py-[10px] w-fit mx-auto px-5 text-white text-[28px] font-bold hover:scale-95 duration-300 transition-all"
      >
        Learn from Adaptive Topic-Tests
      </Link>
    </div>
  );
};

export default TryCards;
