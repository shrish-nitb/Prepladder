import React, { useEffect, useState } from 'react';
// import data from "../../utils/PlanLMSData";
import { IoPlayOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdOutlineLink } from "react-icons/md";
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

const CourseViewer = () => {
    const [courseData, setCourseData] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [openSections, setOpenSections] = useState({});
    const [loading,setLoading] = useState(true);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const location = useLocation();
    // console.log(location)
    const {id}= useParams()
    useEffect(() => {
        const fetchData= async ()=>{
            try{
                setLoading(true);
                const res= await axios.get(BASE_URL+'/plans')
                const filteredData = res?.data.filter((plan)=>plan?._id===id)
                // console.log(filteredData[0])
                // console.log(filteredData[0]?.course)
                setCourseData(filteredData[0]?.course);
                setLoading(false)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData()
    }, []);

    const toggleSection = (index) => {
        // Section 1 (index 0) is always open, no need to toggle it.
        if (index === 0) return;
        
        setOpenSections((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="w-screen h-full mb-10 mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto">
            {
                loading? <Loader/>: <div className="w-10/12 h-full flex flex-col mx-auto gap-y-10">
                <p className="font-semibold text-5xl mt-10">Table Of Contents</p>
                <div className="flex items-center">
                    {courseData.map((course, i) => (
                        <button
                            key={i}
                            className={`px-5 py-2 font-semibold ${
                                i === currentTab ? "bg-[#b8b8b8] text-black" : "bg-[#000] text-white hover:bg-[#343434]"
                            } transition-all duration-500`}
                            onClick={() => setCurrentTab(i)}
                        >
                            {course?.category}
                        </button>
                    ))}
                </div>

                <div className="mt-10 bg-black h-full min-h-screen flex flex-col gap-y-5 items-start p-10">
                    {courseData[currentTab]?.sections.map((section, i) => (
                        <div key={i} className="flex flex-col w-[70%]">
                            <div
                                className="flex items-center border border-[#343434] rounded-t-lg w-fit gap-x-4 cursor-pointer"
                                onClick={() => toggleSection(i)}
                            >
                                <p className="bg-[#434343] rounded-tl-lg px-4 py-2 border border-[#343434]">{i + 1}</p>
                                <p className="pr-3 py-2">{section?.sectionTitle}</p>
                            </div>

                            {/* Section 1 is always open */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                    i === 0 || openSections[i] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="flex flex-col w-full">
                                    {section?.topics.map((topic, j) => (
                                        <div key={j} className="flex items-center gap-x-5 py-3 border border-[#343434] w-full px-3 hover:bg-[#343434]  transition-all duration-200">
                                            {topic?.resource?.type === "video" ? (
                                              <Link to={`/courses/course/${id}/course-viewer/lecture/${topic?.resource?._id}`}>
                                                    <IoPlayOutline className="text-2xl" />
                                                </Link>
                                            ) : topic?.resource?.type === "doc" ? (
                                                <Link to={`/courses/course/${id}/course-viewer/lecture/${topic?.resource?._id}`}>
                                                <HiOutlineDocumentText className="text-2xl" /> </Link>
                                            ) : (
                                                <Link to={{ pathname: '/mocks/mock/'+topic?.resource?.link}} state={{origin:location?.pathname}} key={location?.pathname}>
                                                <MdOutlineLink className="text-2xl" /></Link>
                                            )}
                                            <div className="flex items-center justify-between w-full">
                                                <p>{topic?.title}</p>
                                                <p>{topic?.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            }
           
        </div>
    );
};

export default CourseViewer;
