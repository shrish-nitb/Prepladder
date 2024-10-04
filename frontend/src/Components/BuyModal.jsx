import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoLockOpen } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function openInNewTab(url) {
  var a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const BuyModal = ({ setBuyModalOpen, plan }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  let { token } = useSelector((state) => state.auth);
  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    setIsDisabled(true);
    try {
      const data = await axios.get(
        `${BASE_URL}/orders/${plan?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(data);
      if (!data?.data?.success) {
        toast.dismiss(toastId);
        throw new Error("something went wrong");
      }

      toast.success("Redirecting..");
      const redirectUrl =
        data?.data?.data?.instrumentResponse?.redirectInfo?.url;
      // console.log(redirectUrl);
      window.open(redirectUrl, "_blank", "noreferrer");
      // openInNewTab(redirectUrl);
      // window.location.href = redirectUrl;
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="bg-black fixed  z-[50] h-full w-screen bg-opacity-60 top-0 flex items-center justify-center text-black">
      <div className="bg-white p-8 rounded-3xl relative flex flex-col items-center justify-center gap-y-3 mt-3">
        <button
          className="absolute text-black top-5 left-5 font-extrabold text-xl"
          onClick={() => {
            setBuyModalOpen(false);
          }}
        >
          ✕
        </button>
        <div className="flex items-center gap-x-6">
          {/* <IoLockOpen className='text-4xl text-pure-greys-100'/> */}
          {/* <p className="text-3xl font-bold text-pure-greys-100">
            Crack IPMAT 2025 Now!!
          </p> */}
        </div>

        <div className="flex w-[700px]    justify-center items-center gap-y-3 ">
          {/* <div className="flex flex-col lg:w-[30%] md:w-[60%] w-[90%]  gap-x-3  ">
                    <div class="bg-white/[0.75]  shadow-lg rounded-xl py-4 px-8 ">
                    <p class="text-[28px] font-bold border-b-2 border-b-grey-500 pb-2">
                        Want Just IPMAT-I Mocks?
                    </p>
                    <div class="flex justify-between mt-5">
                        <p class="text-lg text-gray-500">25 Mocks</p>
                        <Link to={"/login"} class="bg-richblack-50 rounded-xl px-5 font-bold hover:scale-95 duration-300 transition-all">
                        ₹1299 →
                        </Link >
                    </div>
                    
                    <div class="flex justify-between mt-5">
                        <p class="text-lg text-gray-500">5 Mocks</p>
                        <Link to={"/login"} class="bg-richblack-50 rounded-xl px-6 font-bold hover:scale-95 duration-300 transition-all">
                        ₹299 →
                        </Link >
                    </div>
                    </div>
                    <div class="bg-white/[0.75]   shadow-lg rounded-xl py-4 px-8 mt-4"><p class="text-[28px] font-bold border-b-2 border-b-grey-500 pb-2">Something free to try out?</p>
                    <p class="text-lg text-gray-500 mt-5">Break your inertia: <br></br>We have 1 free mocks!</p>
                    <p class="text-lg text-gray-500"><a class="underline" href="/login">Register now</a> to attempt and learn.</p>
                    </div>
                    </div> */}
          <div class="bg-white rounded-xl w-full  shadow-lg py-5 px-8 mx-7">
            <p class="text-[28px] font-extrabold border-b-2 border-b-grey-500 pb-2 ">
             {` ${plan?.name} 🚀`}
            </p>
            <p class="font-semibold mt-3 text-lg">
              {`🌟 ${plan?.description} 🌟`}
            </p>
            {
              plan?.features.map((feature, i) => (
                <p key={i} className="text-gray-500 flex items-center gap-x-2">
                  {` - `}
                  <span dangerouslySetInnerHTML={{ __html: feature }} />
                </p>
              ))
            }
            {/* <p class=" text-gray-500 ">
              - A carefully designed <b>SYSTEMATIC PLAN</b> to streamline your
              study approach.
            </p>
            <p class=" text-gray-500 ">
              - <b>15</b> full-length <b>MOCKS</b> for sharpening exam
              readiness.
            </p>
            <p>
              - <b>26 HACKBOOKS</b> for optimal study resources.
            </p>
            <p class="text-gray-500 ">
              - <b>20 VERBAL SECTIONALS</b> to surpass sectional cutoffs.
            </p>
            <p class="text-gray-500 ">
              - <b>20 PRACTICE SHEETS</b> to elevate your learning curve.
            </p>
            <p* class="text-gray-500 ">
              - <b>UNLIMITED</b> topic-wise exercise algorithms for continuous
              practice.
            </p*/}
            {/* <b>But wait, there's more!</b>
            <p>
              <b>INTERVIEW PREPARATION</b> for final-stage excellence.
            </p>
            <p>
              Engaging interactive <b>SESSIONS</b> with your future IPM seniors{" "}
            </p> 
            <p>
              Ready to take your preparation to the next level? Click the
              "Enroll Now" button and embark on your journey to success! 🚀
            </p> */}
            <div class="flex mt-4">
              <div class="w-full px-3 flex items-center justify-center gap-x-3 py-1 border-2 border-[#EDEDED] rounded-lg text-center">
                <p class=" text-gray-500 line-through">{`₹${(plan?.price / 100)*0.4 + plan?.price / 100}`}</p>
                <p class="text-[25px] font-semibold">{plan?.price / 100} </p>
                <span className="font-normal text-sm">
                  Grab It Now at Our Launch Price!
                </span>
              </div>
              {/* <div class="w-3/5 flex items-center px-3 py-1 border-2 border-[#EDEDED] rounded-lg ml-5"> */}
              {/* <img alt="Orange" loading="lazy" width="33" height="45" decoding="async" data-nimg="1" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=48&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forange.e0bd2b67.png&amp;w=96&amp;q=75" style="color: transparent;"></img> */}
              {/* <p class="text-m ml-3">Grab It Now at Our Launch Price!</p> */}
              {/* </div> */}
            </div>
            <button
              disabled={isDisabled}
              className={`bg-[#bdf9a2] rounded-3xl py-3 w-full text-black mt-2 font-bold hover:scale-105 duration-300 transition-all ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => submitHandler()}
            >
              Enroll Now
            </button>
            {/* <Link to={"https://rzp.io/l/ouoOV4xCE7"}>
              <p
                className={`bg-[#bdf9a2]  text-center rounded-3xl py-3 w-full text-black mt-2 font-bold hover:scale-105 duration-300 transition-all `}
              >
                Enroll Now
              </p>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
