"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";

const useCountdown = (targetDate: any) => {
  const [timeRemaining, setTimeRemaining] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getTimerData = (milliseconds: any) => {
    if (milliseconds <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };

    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return { days, hours, minutes, seconds, completed: false };
  };

  return getTimerData(timeRemaining);
};

const CountdownDisplay = () => {
  const newYearTime = new Date("January 1, 2026 00:00:00").getTime();
  const { days, hours, minutes, seconds, completed } =
    useCountdown(newYearTime);

  const formatUnit = (value: any) => String(value).padStart(2, "0");

  if (completed) {
    return (
      <span className="text-4xl font-extrabold text-yellow-300 animate-pulse transition-all duration-1000">
        🎉 Шинэ жилийн мэнд хүргэе 2026! 🎉
      </span>
    );
  }

  const countdownUnits = [
    { value: days, label: "өдөр" },
    { value: hours, label: "цаг" },
    { value: minutes, label: "Mинут" },
    { value: seconds, label: "Cекунд" },
  ];

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 p-4 rounded-xl shadow-2xl bg-popover w-full max-w-lg mx-auto">
      {countdownUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center p-2 sm:p-4 bg-primary rounded-lg min-w-[65px] sm:min-w-20 shadow-inner transform transition-all hover:scale-105 duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-widest">
              {formatUnit(unit.value)}
            </span>
            <span className="text-xs sm:text-sm text-accent uppercase mt-1 tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < countdownUnits.length - 1 && (
            <div className="flex items-center text-3xl sm:text-4xl font-light text-accent select-none">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const CountdownDisplay1 = () => {
  const newYearTime = new Date("December 15, 2025 00:00:00").getTime();
  const { days, hours, minutes, seconds, completed } =
    useCountdown(newYearTime);

  const formatUnit = (value: any) => String(value).padStart(2, "0");

  if (completed) {
    return (
      <span className="text-4xl font-extrabold text-accent animate-pulse transition-all duration-1000">
        Sorry Sale's Ended
      </span>
    );
  }

  const countdownUnits = [
    { value: days, label: "өдөр" },
    { value: hours, label: "цаг" },
    { value: minutes, label: "Mинут" },
    { value: seconds, label: "Cекунд" },
  ];

  return (
    <div className="flex">
      {countdownUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center p-2 sm:p-4  rounded-lg min-w-[65px] sm:min-w-20 shadow-inner transform transition-all hover:scale-105 duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-chart-1 tabular-nums tracking-widest">
              {formatUnit(unit.value)}
            </span>
            <span className="text-xs sm:text-sm text-card uppercase mt-1 tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < countdownUnits.length - 1 && (
            <div className="flex items-center text-3xl sm:text-4xl font-light text-card select-none">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background text-white font-sans p-4 sm:p-8">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row  gap-8 p-6 sm:p-10 bg-primary rounded-2xl shadow-2xl  ">
          <div className="flex flex-col items-center md:items-start  space-y-6 shrink-0 w-full md:w-auto">
            <div className="w-full h-auto max-w-xs sm:max-w-sm ">
              <div className="bg-popover rounded-xl p-8  shadow-inner">
                <h1 className="text-6xl sm:text-8xl font-black text-muted text-center tracking-widest leading-none drop-shadow-lg">
                  Шинэ
                </h1>
                <h1 className="text-8xl sm:text-8xl font-black text-yellow-100 text-center tracking-widest leading-none drop-shadow-xl py-2">
                  2026
                </h1>
                <h1 className="text-6xl sm:text-8xl font-black text-muted text-center tracking-widest leading-none drop-shadow-lg">
                  жил
                </h1>
              </div>
            </div>

            <div className="w-full max-w-lg mt-6 cursor-pointer">
              <CountdownDisplay />
            </div>
          </div>
          <div className=" overflow-hidden  w-400">
            <div className="rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative ">
              <InfiniteMovingCards
                images={testimonials}
                direction="left"
                speed="slow"
              />
            </div>
            <div className=" rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                images={testimonials}
                direction="right"
                speed="slow"
              />
            </div>
            <div className=" rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                images={testimonials}
                direction="left"
                speed="normal"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-chart-1 flex flex-col mt-10  justify-center items-center">
        <div className="text-9xl animate-bounce cursor-pointer">
          Flash Sales
        </div>
        <div className="cursor-pointer">
          <CountdownDisplay1 />
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  "gift.jpg",
  "sales1.png",
  "sales2.png",
  "sales3.png",
  "sales4.png",
  "sales5.png",
  "sales6.png",
  "sales7.png",
  "sales8.png",
  "sales9.png",
  "sales10.png",
  "sales11.png",
  "sales12.png",
  "sales13.png",
];
