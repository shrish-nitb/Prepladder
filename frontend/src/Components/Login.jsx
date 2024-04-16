import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setToken, setLoading } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginbg1 from "../assets/reg_bg1.png";
import axios from "axios";
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

  const handleClick = async () => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await signInWithPopup(auth, provider);
      // console.log(response);
      if (!response.user.accessToken) {
        toast.dismiss(toastId);
        navigate("/login");
        window.location.reload(false);
        throw new Error("something went wrong");
      }

      toast.success("Login Successful");

      window.localStorage.setItem("token", response.user.accessToken);
      dispatch(setToken(window.localStorage.getItem("token")));
      setValue(window.localStorage.getItem("token"));
      document.cookie = `token=${localStorage.getItem("token")}`;
      // console.log(value)
      const res = localStorage.getItem("token");
      // console.log(res);
      // const res = {
      //     accessToken: JSON.stringify(response.user.accessToken)
      // }
      const data = await axios.post(`${BASE_URL}/user`, null, {
        headers: {
          Authorization: `Bearer ${res}`,
        },
      });
      // console.log(data);
      window.localStorage.setItem("user", JSON.stringify(data?.data));
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.dismiss(toastId);
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        // Handle user cancelling the login popup
        // console.log("User cancelled the login popup");
        toast.error("Login cancelled by user");
      } else {
        console.error("LOGIN API ERROR:", error);
        toast.error("Something went wrong");
      }
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        window.localStorage.setItem("user", JSON.stringify(userCred));
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
          dispatch(setToken(token));
          // console.log("token", JSON.stringify(token));
        });
      }
      // console.log(userCred)
    });

    setValue(localStorage.getItem("token"));
  }, []);

  return (
    <>
      {token && navigate("/dashboard/my-profile")}{" "}
      {/* Navigate if token exists */}
      <div className="w-full h-screen flex flex-col relative lg:items-end items-center justify-center md:px-20 px-5  overflow-hidden loginBg lg:gap-y-6 md:gap-y-10 gap-y-6  ">
        <h1 className="font-bold text-3xl lg:w-[41%] w-full">
          🌟 Ready to conquer your IPMAT exam heist? Look no further than our
          Plan Professor! 🌟
        </h1>
        <p className="lg:w-[41%] w-full text-lg">
          With a specially crafted SYSTEMATIC PLAN, we'll guide you through
          every step of your IPMAT study journey, ensuring effective and
          efficient preparation. With 15 full-length MOCKS, 26 HACKBOOKS, 20
          VERBAL SECTIONALS, 20 PRACTICE SHEETS, and, UNLIMITED topic-wise
          exercise algorithms. But that's not all! Prepare for the final leg
          with our tailored INTERVIEW PREPARATION, ensuring excellence in every
          aspect. Engage in interactive SESSIONS with IPM seniors, gaining
          valuable insights and tips.
        </p>
        <button
          onClick={handleClick}
          className="w-full lg:w-[41%] flex items-center justify-center gap-x-6 text-lg border border-[#CFD4DA] rounded-lg shadow-md px-9 py-3 hover:bg-[#DFE5EB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B7280]"
        >
          <FcGoogle className="md:text-2xl text-sm" />
          Continue with Google
        </button>
        {/* <img src={loginbg1} alt="" className='lg:hidden absolute z-[0] bottom-0'/> */}
      </div>
    </>
  );
}
