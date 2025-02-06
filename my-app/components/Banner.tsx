import React from "react";
import Image from "next/image";
import bannerImage from "@/utils/images/9784103.jpg";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly bg-gray-50 rounded-lg p-2 md:p-3 lg:p-4 shadow-lg text-black w-full max-w-3xl ">
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left ">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Welcome to <span className="text-blue-500">Task Flow</span>
        </p>
        <p className="text-sm sm:text-base md:text-lg max-w-md">
          Organize your tasks efficiently and boost your productivity.
        </p>
        <p className="text-sm sm:text-base md:text-lg max-w-md">
          Stay on track, meet deadlines, and achieve your goals with ease.
        </p>
      </div>
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={bannerImage}
          alt="Task Management"
          width={250}
          height={100}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
