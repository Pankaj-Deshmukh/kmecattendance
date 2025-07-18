import React, { useEffect, useState } from "react";

interface CounterProps {
  targetNumber: number;
  duration: number; // optional duration in milliseconds
  name: string | null;
  rollnumber: string | null;
}

const Counter: React.FC<CounterProps> = ({
  targetNumber,
  duration,
  name,
  rollnumber,
}) => {
  const [count, setCount] = useState(100);

  useEffect(() => {
    let startTime: number | null = null;
    let requestId: number;

    const animateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);

      // Reverse calculation: start at 100 and go down to targetNumber
      const currentCount = Math.floor(
        100 - progressPercentage * (100 - targetNumber)
      );

      setCount(currentCount);

      if (progressPercentage < 1) {
        requestId = requestAnimationFrame(animateCounter);
      }
    };

    requestId = requestAnimationFrame(animateCounter);

    return () => cancelAnimationFrame(requestId); // cleanup on unmount
  }, [targetNumber, duration]);

  return (
    <div className="flex flex-col items-center justify-center h-full my-10">
      <div className="flex items-end">
        <span className="text-9xl font-thin text-gray-400">{count}</span>
        <span className="text-3xl font-light text-gray-400 ml-2 mb-3">%</span>
      </div>
      {name && <p className="font-thin text-s mt-2">{name}</p>}
      <p className="font-thin text-s">Roll no: {rollnumber}</p>
    </div>
  );
};

export default Counter;
