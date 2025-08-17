// ContactImg.tsx
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import px24 from "../../../public/images/px24.webp";

const SideImg = () => {
  return (
    <div className="relative h-full min-h-[50vh] lg:min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
      {/* Main image container - centered in the half-screen space */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Image
          src={px24}
          alt="Contact illustration"
          width={400}
          height={400}
          className="w-full h-auto object-contain rounded-full"
        />

        {/* Email contact - absolutely centered on the image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-3 bg-[rgba(25,40,65,0.9)] backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-[rgba(190,216,255,0.2)]">
          <span className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 text-sm font-semibold tracking-wider uppercase bg-teal-400/10 px-4 py-2 grid place-items-center rounded-full">
            <HiOutlineMail className="h-4 sm:h-5 text-[#97afd5]" />
          </span>
          <p className="text-[#97afd5] font-medium text-sm sm:text-base">
            support@koinFu.com
          </p>
          <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse"></div>
        </div>
      </div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px]">
          <div className="absolute inset-0 border-2 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-green-400 rounded-full border-l-transparent border-b-transparent animate-spin-slow"></div>
        </div>

        {/* Medium circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[300px] max-h-[300px]">
          <div className="absolute inset-0 border-2 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-teal-600 rounded-full border-l-transparent border-r-transparent animate-spin-slow animation-delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default SideImg;