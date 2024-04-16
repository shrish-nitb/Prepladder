import React from 'react'
import Error from "../assets/error404.png"
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center  gap-y-6 lg:gap-y-3 bg-[#181818] text-white'>
        <img src={Error} alt="" className='lg:w-[40%] w-[70%] '/>
        <p className='text-white text-3xl '>Page Not Found</p>
        <p className='text-richblack-200 text-center'>Thp page you are looking for might have been <br/> removed, had its name changed or is temporarily <br/> unavailable.</p>
        <Link to={'/'} className='text-black font-semibold bg-[#bdf9a2] py-2 px-4 rounded-full hover:bg-[#93f168]'>Go Home</Link>
    </div>
  )
}

export default PageNotFound