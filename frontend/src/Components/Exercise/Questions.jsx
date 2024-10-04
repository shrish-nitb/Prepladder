import axios from "axios";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { RevolvingDot } from "react-loader-spinner";
import { HashLoader } from "react-spinners";
import refreshTokenIfExpired from "../../utils/refreshTokenIfExpired ";

// const data={
//     "question":"How do you handle upcoming BTs ?",
//     "options":[
//         "One verge of getting solved",
//         "Nothing getting solved soon",
//         "Will get solved + will give crazy returns",
//         "Get together and we will get together",
//     ],
//     "correct":2
// }

const Questions = ({ data,algoId ,submitted,setSubmitted}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [markedValue, setMarkedValue] = useState(null);
  const [statement, setStatement] = useState([]);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  let { token } = useSelector((state) => state.auth);
  const dispatch= useDispatch()
  useEffect(() => {
    setMarkedValue(null);
    setSubmitted(false);
    if (data?.statement) {
      const pattern = /#(.*?)#/g;

      // Store the components in an array
      const tempComponents = [];

      // Split the statement into parts
      const parts = data?.statement.split(pattern);

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
  }, [data]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setMarkedValue(newValue.trim());
  };

  const submitHandler = async () => {
    setLoading(true);
    const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
      const algoData={...data, algo:algoId};
      console.log(algoData);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question/solve/${algoData?._id}/${markedValue}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: algoData,
    };
    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setResponse(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  useEffect(()=>{
      if(submitted) submitHandler();
  },[submitted])
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full bg-opacity-45">
          {/* <RevolvingDot
           visible={true}
           height="80"
           width="80"
           color="#000"
           ariaLabel="revolving-dot-loading"
           wrapperStyle={{}}
           wrapperClass=""
           /> */}
          <HashLoader color="#000" size={150} />
        </div>
      ) : (
        <div className="w-full mt-3 overflow-auto flex flex-col gap-y-5 text-black font-semibold ">
          <p className="font-bold text-2xl text-black">{data?.directions}</p>
          <div className="font-semibold text-2xl text-black text-center flex flex-wrap items-center">
            {statement.map((question, index) => {
              if (question.type === "p") {
                return <span key={index}>{question.content}</span>;
              } else if (question.type === "image") {
                return (
                  <img key={index} src={question.content} alt="question" />
                );
              } else return <></>;
            })}
          </div>
          <img src={data?.media} alt="" />
          {data?.type === "SINGLE" ? (
            !submitted ? (
              <>
                {data?.options.map((option, i) => {
                  return (
                    <button
                      key={i}
                      className={`w-fit text-start border-2 py-2 px-3 rounded-lg ${
                        markedValue === option?._id ? "bg-black text-white" : ""
                      } duration-300 transition-all`}
                      onClick={() => {
                        setMarkedValue(option?._id);
                      }}
                    >
                      <b>{String.fromCharCode(65 + i)}.</b> {option?.value}
                    </button>
                  );
                })}
              </>
            ) : (
              <>
                {data?.options.map((option, i) => {
                  return (
                    <button
                      key={i}
                      className={`w-fit text-start border-2 py-2 px-3 rounded-lg ${
                        response?.answer == option?._id
                          ? "bg-[#16A34A] text-white border-[#16A34A]"
                          : markedValue != response?.answer &&
                            markedValue == option?._id
                          ? "bg-[#DC2626] text-white border-[#DC2626]"
                          : " "
                      } duration-300 transition-all`}
                    >
                      <b>{String.fromCharCode(65 + i)}.</b> {option?.value}
                    </button>
                  );
                })}
              </>
            )
          ) : (
            <>
              {!submitted ? (
                <input
                  type="text"
                  name={data._id}
                  className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-[300px]"
                  value={markedValue}
                  onChange={handleInputChange}
                />
              ) : (
                <>
                  <p
                    className={`text-black border ${
                      response?.answer == markedValue
                        ? "border-[#16A34A]"
                        : "border-[#DC2626]"
                    } bg-white min-h-10 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-[300px]`}
                  >
                    {markedValue}
                  </p>
                  <div className="flex gap-x-3 items-center text-pure-greys-50">
                    <p className="text-black"> Correct Answer:</p>
                    <p className="text-black ">{response?.answer}</p>
                  </div>
                </>
              )}
            </>
          )}
         

          {
            submitted &&  <div className="flex flex-col gap-x-3 w-full">
            <p className=""> Solution:</p>
            {response?.solution.startsWith(
              "http"
            ) ? (
              <img
                src={response?.solution}
                alt="Solution"
                className=""
              />
            ) : (
              <p>{response?.solution}</p>
            )}
          </div>
          }
          {/* <button className='w-fit text-start border-2 py-2 px-3 rounded-lg'>{`A. One verge of getting solved`}</button>
        <button  className='w-fit text-start border-2 py-2 px-3 rounded-lg'>{`B. Nothing getting solved soon`}</button>
        <button  className='w-fit text-start border-2 py-2 px-3 rounded-lg'>{`C. Will get solved + will give crazy returns`}</button>
        <button className='w-fit text-start border-2 py-2 px-3 rounded-lg'>{`D. Get together and we will get together`}</button> */}
        </div>
      )}
    </>
  );
};

export default Questions;
