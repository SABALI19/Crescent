"use client"

import { useState } from "react";
import {
  FaQrcode,
  FaServer,
  FaShieldAlt,
  FaBrain,
  FaChartLine,
  FaInfinity,
  FaLock,
  FaRocket,
  FaCheck
} from "react-icons/fa";
import { GiCrystalBars } from "react-icons/gi";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals getting started",
    features: [
      "5 Qubit Processor Access",
      "1.8% Daily Algorithm Optimization",
      "Basic Security Protocols",
      "Community Support",
      "Limited Circuit Designer"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For professionals needing more power",
    features: [
      "15 Qubit Processor Access",
      "2.5% Daily Algorithm Optimization",
      "Military-Grade Encryption",
      "Priority Support",
      "Advanced Circuit Designer",
      "API Access"
    ],
    cta: "Go Professional",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/month",
    description: "For organizations with critical needs",
    features: [
      "50+ Qubit Processor Access",
      "3.8% Daily Algorithm Optimization",
      "Zero-Trust Security",
      "24/7 Dedicated Support",
      "Full Hardware Access",
      "Custom Solutions",
      "SLA Guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "annually">("monthly");

  return (
    <section className="bg-gradient-to-r from-gray-900 via-green-900 to-gray-800 text-gray-300 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Choose the plan that fits your quantum computing needs
          </p>
          
          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={() => setSelectedPeriod("monthly")}
              className={`px-6 py-3 rounded-l-lg font-medium ${selectedPeriod === "monthly" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPeriod("annually")}
              className={`px-6 py-3 rounded-r-lg font-medium ${selectedPeriod === "annually" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              Annually (20% off)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl overflow-hidden border ${plan.popular ? "border-green-500 shadow-lg shadow-green-500/20" : "border-gray-700"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8 bg-gray-900/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold ${plan.popular ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"} transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}