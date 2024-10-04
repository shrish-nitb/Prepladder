import React, { useEffect, useState } from "react";

const MockAnalysis = ({ data, currentQuestion, setCurrentQuestion }) => {
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // console.log(data);
  const [statement, setStatement] = useState([]);

  useEffect(() => {
    if (data?.questions[currentQuestion]?._id?.statement) {
      const pattern = /#(.*?)#/g;

      // Store the components in an array
      const tempComponents = [];

      // Split the statement into parts
      const parts =
        data?.questions[currentQuestion]?._id?.statement.split(pattern);

      // Iterate through the parts and add them to tempComponents
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.startsWith("http")) {
          // Image URL
          tempComponents.push({ type: "image", content: part });
        } else {
          // Plain text
          tempComponents.push({ type: "p", content: part });
        }
      }
      // Update the state with the components
      setStatement(tempComponents);
    }
  }, [data?.questions[currentQuestion]]);

  return (
    <>
      {data === undefined ? (
        <div className="w-full bg-[#333238] rounded-2xl h-full p-5 gap-5 flex flex-col items-start text-center ">
          Something went wrong. Please try again later.
        </div>
      ) : (
        <div className="w-full bg-[#333238] rounded-2xl h-full p-5 gap-5 flex flex-col items-start">
          {/* meta tag bar */}
          <div className="flex items-center gap-x-5">
            <p className="font-semibold">{`Q ${currentQuestion + 1}:`}</p>
            <p className="">{`${Math.floor(
              data?.questions[currentQuestion]?.duration / 60
            )}m ${data?.questions[currentQuestion]?.duration % 60}s`}</p>
            <p
              className={`
              ${
                data?.questions[currentQuestion]?._id?.meta?.tag === "EASY"
                  ? "bg-[#D1FAE5] "
                  : data?.questions[currentQuestion]?._id?.meta?.tag ===
                    "MEDIUM"
                  ? "bg-[#FEF3C7]"
                  : "bg-[#FECACA]"
              }  rounded-2xl px-2 text-black font-semibold capitalize`}
            >{`${data?.questions[currentQuestion]?._id?.meta?.tag.toLowerCase()}`}</p>
            <p className="bg-[#DBEAFE] rounded-2xl px-3 text-[#2563EB] font-semibold capitalize">{`${data?.questions[currentQuestion]?._id?.meta?.subtopic}`}</p>
          </div>
          <div className="w-full flex lg:flex-row flex-col-reverse gap-5 ">
            {/* left section */}
            <div className="lg:w-4/5 w-full  flex flex-col gap-y-5 text-lg">
              <div className="border border-richblack-100 rounded-xl p-3 flex flex-col gap-y-3">
                <p>
                  <b>Directions : </b>{" "}
                  {data?.questions[currentQuestion]?._id?.directions}{" "}
                </p>
                <div className="flex flex-wrap items-center">
                  {statement.map((question, index) => {
                    if (question.type === "p") {
                      return <span key={index}>{question.content}</span>;
                    } else if (question.type === "image") {
                      return <img key={index} src={question.content} />;
                    } else return <></>;
                  })}
                </div>
                <img
                  src={data?.questions[currentQuestion]?._id?.media}
                  alt=""
                />

                {data?.questions[currentQuestion]?._id?.type === "SINGLE" ? (
                  <>
                    {data?.questions[currentQuestion]?._id?.options.map(
                      (option) => (
                        <label
                          key={option._id}
                          className="flex py-1 content-center"
                        >
                          <input
                            type="radio"
                            name={data._id}
                            className=""
                            value={option._id}
                            checked={
                              data?.questions[currentQuestion]?.marked ===
                              option._id
                            }
                          />
                          <div className="pl-2">
                            <span className="__Latex__">{option.value}</span>
                          </div>
                        </label>
                      )
                    )}
                    <div className="flex gap-x-3 items-center text-pure-greys-50">
                      <p className=" text-pure-greys-50"> Correct Answer:</p>
                      <p className=" bg-[#58575e]  px-3 rounded-md">
                        {
                          data?.questions[currentQuestion]?._id.options.find(
                            (option) =>
                              option._id ===
                              data?.questions[currentQuestion]?.answer
                          ).value
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-x-3 items-center text-pure-greys-50">
                      <p className=" text-pure-greys-50"> Entered Answer:</p>
                      <p className=" bg-[#58575e]  px-3 rounded-md">
                        {data?.questions[currentQuestion]?.marked}
                      </p>
                    </div>
                    <div className="flex gap-x-3 items-center text-pure-greys-50">
                      <p className=" text-pure-greys-50"> Correct Answer:</p>
                      <p className=" bg-[#58575e]  px-3 rounded-md">
                        {data?.questions[currentQuestion]?.answer}
                      </p>
                    </div>
                  </>
                )}
                <div className="flex flex-col gap-x-3 text-pure-greys-50 w-full">
                  <p className=" text-pure-greys-50"> Solution:</p>
                  {data?.questions[currentQuestion]?.solution.startsWith(
                    "http"
                  ) ? (
                    <img
                      src={data.questions[currentQuestion].solution}
                      alt="Solution"
                    />
                  ) : (
                    <p>{data.questions[currentQuestion].solution}</p>
                  )}
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="lg:w-1/5 w-full grid grid-cols-4 mx-auto gap-3 h-fit">
              {data?.questions.map((question, index) => {
                return (
                  <button
                    key={index}
                    className={` ${
                      question?.marked === ""
                        ? "bg-[#D9D9D9]"
                        : question?.marked == question?.answer
                        ? "bg-[#A7F3D0]"
                        : "bg-[#FECDD3]"
                    } rounded-lg h-[3rem] w-[3rem] text-black`}
                    onClick={() => {
                      setCurrentQuestion(index);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MockAnalysis;
