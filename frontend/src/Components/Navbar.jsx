import React, { useEffect, useState } from "react";
import logo from "../assets/Project_Ascen_logo2.png";
import dashboard from "../assets/dashboard.png";
import mocks from "../assets/mocks.png";
import exercise from "../assets/exercise.png";
import analysis from "../assets/analysis.png";
import course from "../assets/Book open.png"
import { setToken, setLoading } from "../slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMiniBars3, HiMiniBars3CenterLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";
import { LuLogOut } from "react-icons/lu";

const Navbar = ({ handleClick }) => {
  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const matchRoute = (route) => {
    return !!location.pathname.match(route);
  };

  const handleSignout = async () => {
    const toastId = toast.loading("Logging Out");
    try {

      const auth = getAuth();
      await signOut(auth);
      localStorage.clear();
      setToken(null)
      window.location.replace(`https://www.projectascend.in/`);
      // window.location.reload(false);
      toast.success("Log Out Successful");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout Failed");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const NavbarLinks = [
    // {
    //   title: token && dashboard,
    //   path: token ? "/courses" : "/",
    // },
    {
      title: token && course,
      path: "/courses",
      name: "Course",
    },
    {
      title: mocks,
      path: "/mocks",
      name: "Mocks",
    },

  ];

  const [open, setOpen] = useState(false);

  const setOpenNav = () => {
    setOpen(!open);
    setDropdown(false);
  };

  const [navScroll, setNavScroll] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 200) setNavScroll(true);
    else setNavScroll(false);
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div
      className={`fixed top-0 left-0  z-[99] w-full ${navScroll ? "bg-black" : "bg-[#000000a6] "
        } lg:rounded-tr-2xl rounded-bl-2xl lg:rounded-bl-[0] rounded-br-2xl backdrop-filter backdrop-blur-lg bg-opacity-40 lg:w-[80px]  lg:h-screen`}
    >
      <div className="w-11/12 mx-auto max-w-maxContent flex lg:flex-col justify-between lg:justify-start lg:h-screen items-center lg:gap-y-4">
        <div className="lg:h-[3.5rem] h-[4rem] lg:mt-5">
          <Link to={`https://www.projectascend.in/`} className="relative">
            <img
              src={logo}
              alt=""
              className="h-full  hover:scale-110 transition-all duration-300 "
            />

          </Link>
        </div>
        <nav className="hidden lg:flex text-lg">
          <ul className="flex-col h-full gap-y-6 text-white font-semibold items-center justify-center">
            {NavbarLinks.map((element, index) => (
              <li key={index}>
                <Link to={element.path} onClick={handleClick} className="relative group">
                  <img
                    src={element.title}  // Assuming element.title is the image URL
                    alt={element.name}   // Assuming element.name is the alt text for the image
                    className={`${matchRoute(element.path)
                        ? "text-[#bdf9a2] border-r-4"
                        : "text-white"
                      } px-2 hover:text-[#bdf9a2] hover:scale-[.8] transition-all duration-300 scale-75 my-7`}
                  />
                  <p className="absolute w-full text-center px-2 rounded-md font-normal text-sm bottom-0 translate-y-5 py-1 opacity-0 group-hover:opacity-100  transition-all bg-[#9c9c9c61] duration-900">
                    {element.name}
                  </p>
                </Link>

              </li>
            ))}
            {token === null && (
              <Link to="/login" onClick={handleClick}>
                <div className="flex justify-center bg-[#bdf9a2] text-black py-1 px-4 rounded-lg hover:text-[#bdf9a2]  hover:bg-[#fff] items-center gap-x-2 group relative  transition-all duration-[1200] my-7 ">
                  Login
                </div>
              </Link>
            )}
            {token !== null && (
              <Link to="/exercise" onClick={handleClick}  className="relative group">
                <img
                  src={exercise}
                  alt="exercise"
                  className={`${matchRoute("/exercise")
                      ? "text-[#bdf9a2] border-r-4"
                      : "text-white "
                    } px-2 hover:text-[#bdf9a2] hover:scale-[.8] transition-all duration-300 scale-75 my-7`}
                />
                  <p className="absolute w-full text-center px-2 rounded-md font-normal text-sm bottom-0 translate-y-5 py-1 opacity-0 group-hover:opacity-100  transition-all bg-[#9c9c9c61] duration-900">
                  Exercise
                  </p>
              </Link>
            )}
            {token !== null && (
              <Link to="/analysis" onClick={handleClick} className="relative group">
                <img
                  src={analysis}
                  alt="analysis"
                  className={`${matchRoute("/analysis")
                      ? "text-[#bdf9a2] border-r-4"
                      : "text-white "
                    } px-2 hover:text-[#bdf9a2] hover:scale-[.8] transition-all duration-300 scale-75 my-7`}
                />
                 <p className="absolute w-full text-center px-2 rounded-md font-normal text-sm bottom-0 translate-y-5 py-1 opacity-0 group-hover:opacity-100  transition-all bg-[#9c9c9c61] duration-900">
                 Analysis
                  </p>
              </Link>
            )}
            {token !== null && (
              <button
                onClick={handleSignout}
                className="flex w-full justify-center bg-[#bdf9a2] text-black py-3 px-4 text-2xl rounded-lg hover:text-[#bdf9a2]  hover:bg-[#fff] items-center gap-x-2 group relative  transition-all duration-[1200] my-9"
              >
                <LuLogOut />
              </button>
            )}
          </ul>
        </nav>
        <div className="lg:hidden">
          <div
            className="text-2xl text-richblack-50 transition-all duration-150"
            onClick={setOpenNav}
          >
            {open ? <HiMiniBars3CenterLeft /> : <HiMiniBars3 />}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        {open ? (
          <ul className="flex flex-col gap-y-6 text-white font-semibold items-center pb-10">
            {/* <li>
              <Link to={"/courses"} onClick={handleClick}>
                <p
                  className={`${matchRoute("/courses")
                      ? "text-[#bdf9a2] border-b-2"
                      : "text-white "
                    } hover:text-[#bdf9a2] hover:scale-105 transition-all duration-300`}
                >
                  Dashboard
                </p>
              </Link>
            </li> */}
            <li>
              <Link to={"/courses"} onClick={handleClick}>
                <p
                  className={`${matchRoute("/courses")
                      ? "text-[#bdf9a2] border-b-2"
                      : "text-white "
                    } hover:text-[#bdf9a2] hover:scale-105 transition-all duration-300`}
                >
                  Course
                </p>
              </Link>
            </li>

            <li>
              <Link to={"/mocks"} onClick={handleClick}>
                <p
                  className={`${matchRoute("/mocks")
                      ? "text-[#bdf9a2] border-b-2"
                      : "text-white "
                    } hover:text-[#bdf9a2] hover:scale-105 transition-all duration-300`}
                >
                  Mocks
                </p>
              </Link>
            </li>

            {token === null && (
              <Link to="/login" onClick={handleClick}>
                <div className="flex justify-center bg-[#bdf9a2] text-black py-1 px-4 rounded-lg hover:text-[#bdf9a2]  hover:bg-[#fff] items-center gap-x-2 group relative  transition-all duration-[1200]">
                  Login
                </div>
              </Link>
            )}
            {token !== null && (
              <Link to="/exercise" onClick={handleClick}>
                <p
                  className={`${matchRoute("/exercise")
                      ? "text-[#bdf9a2] border-b-2"
                      : "text-white "
                    } hover:text-[#bdf9a2] hover:scale-105 transition-all duration-300`}
                  onClick={() => setDropdown(false)}
                >
                  Exercise
                </p>
              </Link>
            )}
            {token !== null && (
              <Link to="/analysis" onClick={handleClick}>
                <p
                  className={`${matchRoute("/analysis")
                      ? "text-[#bdf9a2] border-b-2"
                      : "text-white "
                    } hover:text-[#bdf9a2] hover:scale-105 transition-all duration-300`}
                  onClick={() => setDropdown(false)}
                >
                  Analysis
                </p>
              </Link>
            )}
            {token !== null && (
              <button onClick={handleSignout}>
                <div className="flex justify-center bg-[#bdf9a2] text-black py-1 px-4 rounded-lg hover:text-[#bdf9a2]  hover:bg-[#fff] items-center gap-x-2 group relative  transition-all duration-[1200]">
                  Log out
                </div>
              </button>
            )}
          </ul>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
