"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ParticlesComponent from "./ParticleBackground";

interface StatItem {
  id: string;
  label: string;
  value: string;
}

export default function StatsPage() {
  const stats: StatItem[] = [
    { id: "users-count", label: "USERS", value: "850K+" },
    { id: "countries-count", label: "COUNTRIES", value: "84" },
    { id: "payouts-count", label: "PAYOUTS", value: "$600,547,000+" },
    { id: "trades-count", label: "ACTIVE TRADES", value: "445,875" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);

  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(3).replace(/\.?0+$/, "")}M+`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    } else {
      return value.toLocaleString();
    }
  };

  const startCounting = useCallback(() => {
    const countUp = (
      id: string,
      start: number,
      end: number,
      duration: number,
      suffix: string = ""
    ) => {
      const element = document.getElementById(id);
      if (!element) return;

      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - (startTime as number);
        const value = Math.min(
          start + (end - start) * (progress / duration),
          end
        );
        element.innerText = formatNumber(value) + suffix;
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          element.innerText = formatNumber(end) + suffix;
        }
      };
      window.requestAnimationFrame(step);
    };

    countUp("users-count", 0, 850000, 2000);
    countUp("countries-count", 0, 84, 3000);
    countUp("payouts-count", 0, 600547000, 5000);
    countUp("trades-count", 0, 445875, 3000, "+");
  }, []);

  useEffect(() => {
    const statsSection = document.getElementById("stats-section");

    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startCounting();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, startCounting]);

  return (
    <>
      <ParticlesComponent />

      <div
        id="stats-section"
        className="flex bg-gradient-to-r from-gray-900/50 via-green-900/50 to-gray-800/50 flex-wrap sm:flex-nowrap justify-between text-center p-20 text-white space-y-6 sm:space-y-0 sm:space-x-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={`flex flex-col items-center w-full sm:w-1/4 border-green-500/50 pb-6 sm:pb-0 ${
              index !== stats.length - 1 ? "sm:border-b-0 sm:border-r" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-semibold text-gray-200">{stat.label}</h2>
            <p
              id={stat.id}
              className="text-green-400 font-semibold text-2xl min-w-[100px]"
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}