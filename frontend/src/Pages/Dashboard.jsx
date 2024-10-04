import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import MyProfile from "../Components/Dashboard/MyProfile";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const {  loading } = useSelector((state) => state.auth);
  let token = window.localStorage.getItem('token')

  // console.log(user)
  const navigate = useNavigate();
  if (token === null) navigate("/login");
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex h-full  bg-[#181818]">
      <div className="h-full overflow-auto w-full">
        <div className="mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
