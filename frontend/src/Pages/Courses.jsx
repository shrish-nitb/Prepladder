import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import refreshTokenIfExpired from '../utils/refreshTokenIfExpired ';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BuyModal } from '../Components/BuyModal';
import Loader from '../Components/Loader';
import axios from 'axios';
import gradient from '@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient';

const Courses = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [plans, setPlans] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const lastRefreshedToken = parseInt(localStorage.getItem('lastRefreshed'), 10);
    const currentTime = Date.now();
    const [loading, setLoading] = useState(true);
    const [buyModalOpen, setBuyModalOpen] = useState(false);
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    
    const gradients = [
        {
            gradient: 'linear-gradient(rgb(18, 92, 204) 0%, rgb(19, 41, 120) 100%)',
            image: "https://assets.leetcode.com/static_assets/others/LeetCode_75_3-240x240.png",
            textcolor: "rgb(19, 41, 120)"
        },
        {
            gradient: 'linear-gradient(rgb(95, 54, 212) 0%, rgb(59, 1, 133) 100%)',
            image: "https://assets.leetcode.com/static_assets/others/Binary_Search_3-240x240.png",
            textcolor: "rgb(59, 1, 133)"
        },
        {
            gradient: 'linear-gradient(rgb(34, 197, 94) 0%, rgb(22, 78, 56) 100%)',
            image: "https://assets.leetcode.com/static_assets/others/Dynamic_Programming_static_cover_picture.png",
            textcolor: "rgb(22, 78, 56)"
        },
        {
            gradient: 'linear-gradient(rgb(249, 115, 22) 0%, rgb(194, 65, 12) 100%)',
            image: "https://assets.leetcode.com/static_assets/others/Graph_Theory_static_cover_picture.png",
            textcolor: "rgb(194, 65, 12)"
        }

    ]; // Add as many gradients as you like

    useEffect(() => {
        // Check if the last refresh was more than two hours ago
        if (lastRefreshedToken && currentTime - lastRefreshedToken > 120 * 60 * 1000) {
            localStorage.setItem('lastRefreshed', currentTime);
            navigate('/');
            return;
        }

        const fetchDetails = async () => {
            try {
                const plansData = await axios.get(`${BASE_URL}/plans`);
                setPlans(plansData?.data);
            } catch (error) {
                console.log(error);
            }

            try {
                const userData = await axios.get(`${BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                window.localStorage.setItem('user', JSON.stringify(userData?.data));
            } catch (error) {
                console.log(error);
                // toast.error('Something went wrong. Please Go to Dashboard.');
            } finally {
                setLoading(false);
            }
        };

        refreshTokenIfExpired(dispatch).then(() => {
            fetchDetails();
        });
    }, []);

    const getPlanStatus = useMemo(() => {
        return (planId) => {
            if (planId && user?.plans && user?.plans?.length > 0) {
                const plansWithId = user.plans.filter((plan) => plan?.plan?._id === planId);
                if (plansWithId.length > 0) {
                    const now = Date.now();
                    const activePlan = plansWithId.find((plan) => Date.parse(plan?.expiryDate) >= now);
                    return activePlan ? 'active' : 'expired';
                }
            }
            return 'inactive';
        };
    }, [user]);

    return (
        <div className="w-screen h-screen mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-10/12 h-full flex flex-col items-center justify-center mx-auto lg:pt-10 pt-20 gap-y-10">
                    <div className="flex items-start gap-x-5 w-full ">
              <p className=" font-kreon text-2xl">{`Welcome Back, ${user?.name}`}</p>
              <img
                src={user?.picture}
                alt=""
                className="w-20 rounded-lg bg-cover"
              />
            </div>
                    <div className="bg-[#232222] h-full rounded-t-3xl w-full px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2">
                        
                        {plans.map((plan, i) => {
                            const status = getPlanStatus(plan?._id);
                            return (<div
                                key={i}
                                className="h-[250px] min-w-[235px] relative  rounded-lg duration-200 ease-in-out hover:shadow-[0px_2px_4px_rgba(0,0,0,0.02),0px_4px_8px_rgba(0,0,0,0.02),0px_6px_12px_rgba(0,0,0,0.02)]"
                                style={{
                                    background: gradients[i% gradients.length]?.gradient, // Apply gradient based on index
                                }}
                            >
                                <div className="flex h-full flex-col items-end justify-between rounded-lg pt-5 duration-300 hover:bg-[rgba(255,255,255,0.1)]">
                                    <div className="w-full px-4">
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <p className="line-clamp-1 text-[16px] font-medium text-lc-fixed-white dark:text-dark-lc-fixed-white">
                                                {plan?.name}
                                            </p>
                                        </div>
                                        <p className="line-clamp-2 text-[12px] opacity-60 text-lc-fixed-white dark:text-dark-lc-fixed-white">
                                            {plan?.description}
                                        </p>
                                    </div>
                                    <img
                                        className="mr-2.5 rounded-br-lg duration-300 h-[150px] w-[150px] absolute bottom-5"
                                        alt="study plan cover"
                                        src={gradients[i % gradients.length]?.image}
                                    />
                                    <div className='w-full p-5 '>
                                        {
                                            status === "active" ? (
                                                <Link to={'/courses/course/'+plan?._id }
                                                    className={`w-fit px-3 py-2 bg-white rounded-lg font-semibold`}
                                                    style={{ color: gradients[i % gradients.length]?.textcolor }}
                                                >
                                                    Start Learning
                                                </Link>
                                            ) : (
                                                <button
                                                    className={`w-fit px-3 py-2 bg-white rounded-lg font-semibold`}
                                                    style={{ color: gradients[i % gradients.length]?.textcolor }}
                                                    onClick={()=>{setBuyModalOpen(true); setIndex(i)}}
                                                >
                                                    Buy Now
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
            )}
             {buyModalOpen && <BuyModal setBuyModalOpen={setBuyModalOpen}  plan={plans[index]}/>}
        </div>
        
    );
};

export default Courses;
