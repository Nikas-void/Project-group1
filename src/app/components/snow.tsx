"use client";
import { useEffect, useState } from "react";

export default function Snow() {
  const [flakes, setFlakes] = useState<any[]>([]);

  useEffect(() => {
    const totalFlakes = 120;
    const arr = [];

    for (let i = 0; i < totalFlakes; i++) {
      arr.push({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        drift: Math.random() * 30 - 15,
      });
    }
    setFlakes(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden ">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake "
          style={
            {
              left: flake.left + "%",
              width: flake.size + "px",
              height: flake.size + "px",
              animationDelay: flake.delay + "s",
              animationDuration: flake.duration + "s",
              "--drift": flake.drift + "px",
            } as any
          }
        />
      ))}
    </div>
  );
}
