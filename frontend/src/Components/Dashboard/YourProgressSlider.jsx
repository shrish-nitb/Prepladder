import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './YourProgressSlider.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function YourProgressSlider({title,icon,data,message}) {
  // console.log(data);
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        {
          data?.performance.map((d,i)=>{
            return(
            <SwiperSlide key={i} className='flex flex-col justify-end'>
                  <p className='text-xl font-kreon'>{title}</p>
                  <p>{d?.subTitle}</p>
                  <div className='flex items-center gap-x-3'>
                    {icon}
                    <p className='text-2xl font-bold'>{`${d?.optained}/${d?.total}`}</p>
                  </div>
                  <p>{message}</p>
            </SwiperSlide>
            // <SwiperSlide>Slide 2</SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}
