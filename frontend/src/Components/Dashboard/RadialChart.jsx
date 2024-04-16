import React, { useEffect, useRef, useState } from "react";

const RadialChart = ({ subscribed, taken }) => {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [percentageCompleted, setPercentageCompleted] = useState(0);

  useEffect(() => {
    if (subscribed > 0) {
      setPercentageCompleted((taken / subscribed) * 100);
    } else {
      setPercentageCompleted(0);
    }
  }, [subscribed, taken]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const startAngle = -Math.PI / 2;
    const endAngleSubscribed = startAngle + 2 * Math.PI; // Full circle for subscribed
    const endAngleTaken = startAngle + 2 * Math.PI * (taken / subscribed);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw subscribed arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngleSubscribed);
    ctx.strokeStyle = "#8884d8";
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw taken arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngleTaken);
    ctx.strokeStyle = "#82ca9d";
    ctx.lineWidth = 20;
    ctx.stroke();

    if (!hovered) {
      const takenText = `${taken}`;
      const solvedText = `solved`;
      const takenTextWidth = ctx.measureText(takenText).width;
      const solvedTextWidth = ctx.measureText(solvedText).width;
      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(takenText, centerX - takenTextWidth / 2, centerY + 5); // Display taken value centered horizontally
      ctx.fillText(solvedText, centerX - solvedTextWidth / 2, centerY + 30); // Display "solved" centered below taken
    } else {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(
        `${percentageCompleted.toFixed(2)}%`,
        centerX - 30,
        centerY + 5
      ); // Display percentage when hovered
    }
  }, [subscribed, taken, hovered, percentageCompleted]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    ></canvas>
  );
};

export default RadialChart;
