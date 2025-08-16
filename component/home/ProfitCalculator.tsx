"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, easeOut } from "framer-motion";
import bg2 from "../../public/images/bg2.avif";
import Link from "next/link";

type PlanKey = 'basic' | 'standard' | 'premium' | 'platinum' | 'elite';

type PlanInfo = {
  name: string;
  color: string;
};

type ProfitMultipliers = {
  [key in PlanKey]: [number, number];
};

type PlanInfoMap = {
  [key in PlanKey]: PlanInfo;
};

const profitMultipliers: ProfitMultipliers = {
  basic: [4, 7],
  standard: [5, 8],
  premium: [6, 9],
  platinum: [7, 10],
  elite: [8, 12],
};

const planInfo: PlanInfoMap = {
  basic: { name: "Basic Package", color: "from-gray-600 to-gray-900" },
  standard: { name: "Standard Package", color: "from-green-500 to-green-800" },
  premium: { name: "Premium Package", color: "from-cyan-500 to-green-700" },
  platinum: { name: "Platinum Package", color: "from-blue-500 to-green-900" },
  elite: { name: "Elite Package", color: "from-purple-500 to-green-800" },
};

export default function ProfitCalculator() {
  const [plan, setPlan] = useState<PlanKey>("basic");
  const [amount, setAmount] = useState<string>("");
  const [profit, setProfit] = useState<string>("0.00");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "0px 0px -100px 0px" });
  const isCalculatorInView = useInView(calculatorRef, { once: true, margin: "0px 0px -100px 0px" });
  const isPlanInView = useInView(planRef, { once: true });
  const isInputInView = useInView(inputRef, { once: true });
  const isResultInView = useInView(resultRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true });

  useEffect(() => {
    if (!amount) {
      setProfit("0.00");
      return;
    }

    const timer = setTimeout(() => {
      const investAmount = parseFloat(amount);
      if (!isNaN(investAmount)) {
        const [minMultiplier, maxMultiplier] = profitMultipliers[plan];
        const randomMultiplier =
          Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;
        setProfit((investAmount * randomMultiplier).toFixed(2));
      }
      setIsCalculating(false);
    }, 600);

    setIsCalculating(true);
    return () => clearTimeout(timer);
  }, [amount, plan]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePlanChange = (key: PlanKey) => {
    setPlan(key);
    setAmount("");
    setProfit("0.00");
    setIsCalculating(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2.src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-green-900/90 to-gray-900/95" />

      {/* Floating background particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 1 }}
          className="absolute rounded-full bg-green-500/20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block relative mb-5 text-lg uppercase">
            <span className="text-green-400 font-semibold tracking-wider px-4 py-1.5 rounded-full bg-gradient-to-r from-gray-900 to-green-900">
              Profit Calculator
            </span>
            <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-light"
          >
            Calculate your potential returns before investing.
          </motion.p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          ref={calculatorRef}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isCalculatorInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 border border-gray-700/50">
            {/* Plan Selector */}
            <motion.div
              ref={planRef}
              initial="hidden"
              animate={isPlanInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="mb-10"
            >
              <motion.h2 variants={fadeUp} className="text-xl font-medium text-gray-300 mb-4">
                Investment Plan
              </motion.h2>
              <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.entries(planInfo) as [PlanKey, PlanInfo][]).map(([key, { name, color }]) => (
                  <motion.button
                    key={key}
                    variants={fadeUp}
                    onClick={() => handlePlanChange(key)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      plan === key
                        ? `bg-gradient-to-r ${color} text-white shadow-lg`
                        : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {name.split(" ")[0]}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Input Field */}
            <motion.div
              ref={inputRef}
              initial="hidden"
              animate={isInputInView ? "visible" : "hidden"}
              variants={slideInLeft}
              className="mb-8"
            >
              <label className="block text-lg font-medium mb-3 text-gray-300">Investment Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">$</span>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-lg"
                />
              </div>
            </motion.div>

            {/* Result Display */}
            <motion.div
              ref={resultRef}
              initial="hidden"
              animate={isResultInView ? "visible" : "hidden"}
              variants={slideInRight}
              className="mb-10"
            >
              <label className="block text-lg font-medium mb-3 text-gray-300">Estimated Return</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">$</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={profit + isCalculating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full pl-10 pr-4 py-4 bg-gradient-to-r from-gray-900/30 to-green-900/20 border border-green-500/30 rounded-xl text-white text-xl font-medium"
                  >
                    {isCalculating ? "Calculating..." : profit}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.button className="w-full py-4 px-6 bg-gradient-to-r from-gray-900 to-green-900 rounded-xl text-white font-bold text-lg shadow-lg hover:bg-gradient-to-l transition-all duration-300">
                <Link href="/LoginPage">
                  Start Investing Now <span className="ml-2">→</span>
                </Link>
              </motion.button>
              <motion.div className="mt-6 text-center text-gray-400 text-sm">
                <p>
                  {planInfo[plan].name} offers {profitMultipliers[plan][0]}x - {profitMultipliers[plan][1]}x returns
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}