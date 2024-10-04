import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import { TiTick } from "react-icons/ti";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import refreshTokenIfExpired from '../../utils/refreshTokenIfExpired ';
import { useDispatch } from 'react-redux';
const Course = () => {
    const [loading, setLoading] = useState(false);
    const {id}= useParams();
    const [course,setCourse]= useState({});
    const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const storedUserData = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isCourseAccessible(id)) {
//       navigate('/courses');  // Redirect if course is not accessible
//     }
//   }, [id, navigate]);
const dispatch=useDispatch();
const token=localStorage.getItem("token");
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            const refreshToken = await refreshTokenIfExpired(dispatch);
            if(refreshToken) token = refreshToken;
            try{
                    const res= await axios.get(BASE_URL+'/course/'+id,{
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                    });
                    // console.log(res.data?.course[0])
                    setCourse(res.data?.course[0]);
                    setLoading(false)
            }
            catch(err){
                    console.log(err)
            }
            
        }
        // setLoading(true);
        fetchData()
    },[])
    // console.log(id);
    return (
        <div className="w-screen h-screen mx-auto relative bg-[#181818] text-white overflow-x-hidden overflow-y-auto">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-10/12 h-full flex flex-col  mx-auto gap-y-10">
                    <div className='h-[40%] bg-[#E6E6E6] w-full rounded-b-2xl flex flex-col justify-end p-5 gap-y-3'>
                        <p className='text-4xl text-black font-bold'>{`${course?.name} Preparation Guide`}</p>
                        <p className='text-xl text-black '>{course?.description}</p>

                    </div>
                    <div className='flex justify-between items-start'>
                        {/* text */}
                        <div className='w-[60%] flex flex-col h-full text-lg'>
                            {
                               course && course?.features && course?.features.map((feature,i) =>{
                                    return( <p key={i} className="text-gray-500 flex items-center gap-x-2">
                                        {` - `}
                                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                                      </p>)
                                })
                            }
                            {/* <p>In this course, we'll cover a brief overview of the Webflow Editor, the pages tab which gives you access to each page on your website, the collections tab where you can organize your website databases such as your team members, blogs, and various other content, and the ecommerce tab where you can manage your online store's products.
                            </p>
                            <p>Note: Localization features are only available in the Designer. Content editors can localize content in edit mode.</p> */}
                        </div>
                        {/* right card */}
                        <div className='flex flex-col  bg-black h-full w-[25%] border border-[#626262] text-white rounded-md shadow-md'>
                            {/* top image */}
                            <img src={`https://www.webstacks.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F9qa6g0dkae5p%2F5e8flnuCkl3GdUWOB6KK8p%2Fcba808c7d0a331133a568d983f7a26ac%2F10_Inspirational_SaaS_3D_Designs__Illustrations__and_Graphics_-_Illustrations.jpg&w=3840&q=75`} alt="" className=' object-cover h-[150px] w-full' />
                            {/* details */}
                            <div className='bg-[#363636] w-full py-2 '><p className='px-3'>Details</p></div>
                            {/* features */}
                            <div className='py-3'>
                                {
                                    // console.log(course, course?.course.length)
                                    course!==undefined && course?.course && course?.course.length>0 && course?.course.map((category,i)=>{
                                        return ( <div key={category?._id} className='flex items-center gap-x-3 px-3'>
                                            <TiTick />
                                            <p>{category?.category}</p>
                                        </div>)
                                    })
                                }
                                {/* <div className='flex items-center gap-x-3 px-3'>
                                    <TiTick />
                                    <p>Intermediate</p>
                                </div>
                                <div className='flex items-center gap-x-3 px-3'>
                                    <TiTick />
                                    <p>Intermediate</p>
                                </div>
                                <div className='flex items-center gap-x-3 px-3'>
                                    <TiTick />
                                    <p>Intermediate</p>
                                </div> */}
                            </div>
                            {/* button */}
                            <div className='px-3 py-4 border-t '>
                                <Link to={`/courses/course/${id}/course-viewer`} className=' bg-[#bdf9a2] hover:bg-[#8fee62]  text-black flex items-center justify-center gap-x-3 py-3 rounded-xl'>
                                    Start Learning
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>

    )
}

export default Course