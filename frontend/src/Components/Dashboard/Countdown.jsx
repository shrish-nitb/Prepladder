import React, { useState, useEffect } from "react";

const Countdown = ({ date }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(`${date}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      timeLeft = {
        Days: days < 10 ? `0${days}` : days,
        Hours: hours < 10 ? `0${hours}` : hours,
        Minutes: minutes < 10 ? `0${minutes}` : minutes,
        Seconds: seconds < 10 ? `0${seconds}` : seconds,
      };
    } else {
      timeLeft = {
        Days: "00",
        Hours: "00",
        Minutes: "00",
        Seconds: "00",
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div
        key={interval}
        className="text-xl  mr-2 flex gap-x-2 rounded-lg bg-opacity-50"
      >
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="flex items-center justify-start gap-x-2">
            <p className="text-5xl  text-white">{timeLeft[interval]}</p>
            {interval !== "Seconds" && (
              <p className="font-normal text-4xl">:</p>
            )}
          </div>
          <p className="font-normal text-[10px]">{interval}</p>
        </div>{" "}
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center w-fit">
      <div className="flex">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span className="text-4xl">Registration Closed</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
