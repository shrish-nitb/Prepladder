import React, { useState } from "react";

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "What Project Ascend is about ?",
      content:
        "Project Ascend in an initiative by the students of IPM'23 batch, IIM Indore for the next batch of IPMers. We, at project ascend are dedicated to support IPMAT aspirants in their final stages of preparation. Whether you are enrolled in a course or just started preparing for the exam, Project Ascend is all about making your way right.",
    },
    {
      title: "What is Project Ascend offering to IPMAT aspirents ?",
      content:
        "We are currently in the pilot phase of developing a program that suits your preparation needs. We plan to offer this soon to the larger IPMAT community once we finish finalising the nitty-gritty of the program structure. This is specially being curated by the top IPMAT rankers to cater the relevant problems faced by IPMAT aspirants. ",
    },
    {
      title: "How can I enroll in the Program ?",
      content:
        "We suggest you to fill the waitlist form for now so that you remain informed about the coming updates. ",
    },
    {
      title: "When does the program commence ?",
      content:
        "We plan to commence the program from the first week of April, 2024.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto  gap-y-5 flex flex-col items-center ">
      <p className="font-bold lg:text-6xl text-4xl text-center mb-5">
        Frequently asked questions
      </p>
      <div className="lg:w-[60%] w-11/12 flex flex-col gap-y-10">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className="border rounded-md overflow-hidden mb-2 transition-all duration-500"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-4 py-6 bg-[#bdf9a2] text-white font-semibold flex justify-between items-center text-lg"
            >
              <span>{item.title}</span>
              <svg
                className={`w-6 h-6  transform transition-all duration-500 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-100 transition-all duration-500">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
