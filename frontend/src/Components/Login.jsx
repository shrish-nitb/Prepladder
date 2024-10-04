import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useForm } from "react-hook-form";
import { setToken, setLoading } from "../slices/authSlice";
import logo from "../assets/Project_Ascen_logo2.png"
import { FaPhoneAlt } from "react-icons/fa";

export default function Login({ signOut }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // Retrieve token from Redux store

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account ",
  });

  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/courses");
    }
  }, [token, navigate]);

  const handleClick = async (phone) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await signInWithPopup(auth, provider);
      if (!response.user.accessToken) {
        toast.dismiss(toastId);
        navigate("/login");
        window.location.reload(false);
        throw new Error("Something went wrong during authentication");
      }

      const res = response.user.accessToken;

      const data = await axios.post(`${BASE_URL}/user`, phone, {
        headers: {
          Authorization: `Bearer ${res}`,
        },
      });

      window.localStorage.setItem("token", response.user.accessToken);
      dispatch(setToken(window.localStorage.getItem("token")));
      setValue(window.localStorage.getItem("token"));
      document.cookie = `token=${localStorage.getItem("token")}`;
      window.localStorage.setItem("user", JSON.stringify(data?.data));
      localStorage.setItem("lastRefreshed", Date.now())
      navigate("/courses");
      toast.success("Login Successful");
    } catch (error) {
      localStorage.clear();
      toast.dismiss(toastId);
      const auth = getAuth()
      await auth.signOut();
      setToken(null)
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        toast.error("Login cancelled by user");
      } else if (error.response.data.message === "Phone Number does not exists") {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Authentication error:", error);
        toast.error("Something went wrong during authentication");
      }
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col relative  items-center justify-center md:px-20 px-5  overflow-hidden loginBg lg:gap-y-6 md:gap-y-10 gap-y-10  ">
        {/* <h1 className="font-bold text-3xl lg:w-[41%] w-full">
          🌟 Ready to conquer your IPMAT exam heist? Look no further than our
          Plan Professor! 🌟
        </h1> */}
        {/* <p className="lg:w-[41%] w-full text-lg">
          With a specially crafted SYSTEMATIC PLAN, we'll guide you through
          every step of your IPMAT study journey, ensuring effective and
          efficient preparation. With 15 full-length MOCKS, 26 HACKBOOKS, 20
          VERBAL SECTIONALS, 20 PRACTICE SHEETS, and, UNLIMITED topic-wise
          exercise algorithms. But that's not all! Prepare for the final leg
          with our tailored INTERVIEW PREPARATION, ensuring excellence in every
          aspect. Engage in interactive SESSIONS with IPM seniors, gaining
          valuable insights and tips.
        </p> */}
        <form
          className=" flex flex-col items-center justify-center gap-y-5 bg-[#191919] border-[#4f4f4f] rounded-xl border-t-[2px] px-5 py-3 shadow-lg shadow-black"
          onSubmit={handleSubmit(handleClick)}
        >
          <div className="flex flex-col items-center justify-center aspect-square gap-y-2 bg-[#28292C] border-[#4f4f4f] rounded-xl border-[1px] px-5 py-3 shadow-lg shadow-black ">
            <img src={logo} alt="" className="bg-cover aspect-square w-5 scale-[200%] translate-x-[.2px]" />
          </div>
          <p className="text-white font-semibold text-3xl font-kreon">Welcome Back!</p>
          {/* <div className="w-full flex flex-col items-start text-pink-200 text-sm">
          <p className="text-white">Login/Signup Instructions</p>
  <ul>
    <li>1. Provide your phone number</li>
    <li>2. Select "Continue with Google"</li>
  </ul>
</div> */}
          <div className="w-full flex flex-col items-center justify-between ">
            {/* <label htmlFor="phone" className="w-full">
              Enter Your Phone Number
            </label> */}
            <div className="flex flex-col gap-2">
              <div className="w-full flex items-center justify-center border border-[#626262] text-white rounded-lg shadow-md bg-[#121212] px-3 ">
                <FaPhoneAlt />

                <div className="w-full ">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="px-6 py-2 bg-[#121212] focus:outline-none focus:ring-0"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Please enter your Phone Number",
                      },
                      maxLength: { value: 10, message: "Invalid Phone Number" },
                      minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                  />
                </div>
              </div>

              {errors.phone && (
                <span className=" text-[12px] text-pink-200">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-x-6 text-sm font-semibold bg-[#fff] border border-[#CFD4DA] rounded-lg shadow-md px-9 py-2 hover:bg-[#DFE5EB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B7280]"
          >
            <FcGoogle className="md:text-2xl text-sm" />
            Continue with Google
          </button>
        </form>
      </div>
    </>
  );
}
