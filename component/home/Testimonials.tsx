"use client"

import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  image: string;
  title: string;
  description: string;
  lineColor: string;
}

const reviews: Testimonial[] = [
  {
    image: '/pictures/dp10.jpg',
    title: "Amy Whyatt",
    description: "I've been investing with KoinFu for over a year now, and I'm extremely satisfied with their services. The team is knowledgeable, responsive, and always keeps me updated on the latest cryptocurrency trends. Thanks to their expertise, my investments have grown significantly!",
    lineColor: "#FF9E64",
  },
  {
    image: '/pictures/dp1.jpeg',
    title: "Michel Murphy",
    description: "KoinFu is the best cryptocurrency investment company I've come across. Their team of professionals guided me through the investment process, answered all my questions, and helped me make informed decisions. I've seen remarkable returns on my investments, and I highly recommend them to anyone looking to enter the world of cryptocurrencies.",
    lineColor: "#2DD4BF",
  },
  {
    image: '/pictures/dp7.avif',
    title: "Abraham Wilson",
    description: "I can't thank KoinFu enough for their exceptional services. Their platform is user-friendly, their investment strategies are well-researched, and their customer support is top-notch. They genuinely care about their clients' success and go the extra mile to ensure we achieve our financial goals. I'm thrilled to be a part of the KoinFu community!",
    lineColor: "#60A5FA",
  },
  {
    image: '/pictures/dp4.jpg',
    title: "Daniel Morris",
    description: "KoinFu has revolutionized my approach to investing. With their expert advice and seamless platform, I've diversified my portfolio and gained exposure to a variety of cryptocurrencies. The team's transparency and dedication to delivering consistent results have earned my trust, and I'm excited to continue growing my investments with them.",
    lineColor: "#C084FC",
  },
  {
    image: '/pictures/dp8.jpg',
    title: "Sophia Luther",
    description: "Choosing KoinFu was the best decision I made for my cryptocurrency investments. Their team possesses in-depth knowledge of the market, and they tailor their strategies to individual investors' goals. I've experienced significant growth in my portfolio, and I'm grateful for their guidance and support. I wholeheartedly recommend KoinFu to anyone seeking reliable and profitable cryptocurrency investments.",
    lineColor: "#60A5FA",
  },
  {
    image: '/pictures/dp6.jpg',
    title: "Jeff Botch",
    description: "KoinFu has provided me with an excellent investment experience. Their platform is intuitive, their investment options are diverse, and their team is professional and friendly. I've witnessed remarkable returns on my investments, and I appreciate the peace of mind that comes with knowing my assets are in capable hands. I couldn't be happier with their services!",
    lineColor: "#F87171",
  },
];

export default function TestimonyPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden isolate">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 bg-gradient-to-r from-purple-900/20 to-purple-900/20 blur-3xl opacity-30"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-900 shadow-xl shadow-slate-900/80 ring-1 ring-slate-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-purple-400/10 text-purple-400 ring-1 ring-inset ring-purple-400/20 animate-pulse mb-6">
            KOINFU TESTIMONIALS
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Real Success Stories <span className="text-purple-400">from Our Clients</span>
          </h2>

          <p className="text-lg leading-8 text-gray-400 max-w-3xl mx-auto relative">
            Investing in cryptocurrency is a smart choice for those who want to capitalize on the growth of this rapidly-evolving field.
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0"></span>
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group ${
                hoveredIndex === index ? 'ring-2' : ''
              }`}
              style={{
                boxShadow: hoveredIndex === index 
                  ? `0 10px 30px -15px rgba(0,0,0,0.3), 0 0 0 2px ${review.lineColor}`
                  : '0 10px 30px -15px rgba(0,0,0,0.3)',
                borderTop: `3px solid ${review.lineColor}`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated sideline */}
              <div
                className="absolute left-0 top-0 h-full w-1.5 rounded-r-lg transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom, ${review.lineColor}, transparent)`,
                  boxShadow: hoveredIndex === index ? `0 0 15px ${review.lineColor}` : 'none',
                  opacity: hoveredIndex === index ? 1 : 0.7,
                }}
              ></div>

              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
                      style={{ backgroundColor: review.lineColor }}
                    ></div>
                    <Image
                      src={review.image}
                      alt={review.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-800 relative z-10"
                    />
                  </div>
                  <div className="ml-4">
                    <h3
                      className={`text-white font-semibold text-lg transition-all duration-300 ${
                        hoveredIndex === index ? 'tracking-wide' : ''
                      }`}
                      style={{
                        textShadow:
                          hoveredIndex === index
                            ? `0 0 10px ${review.lineColor}, 0 0 20px ${review.lineColor}`
                            : 'none',
                      }}
                    >
                      {review.title}
                    </h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-purple-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative pl-2 flex-grow">
                  <p className="text-gray-400 text-base leading-relaxed">
                    {review.description}
                  </p>
                </div>

                {/* Quote icon */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <svg
                    className="w-12 h-12"
                    fill={review.lineColor}
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}