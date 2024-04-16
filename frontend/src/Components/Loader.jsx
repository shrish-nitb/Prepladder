import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-screen min-h-screen h-full mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto flex items-center justify-center ">
      <HashLoader color="#fff" size={100} />
    </div>
  );
};

export default Loader;
