import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position = "flex-row", // default flex direction
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor = "text-green-400",
}) => {
  return (
    <div
      className={`flex flex-wrap ${position} my-20 justify-between gap-10 items-center w-full`}
    >
      {/* Section 1: Heading, Subheading & Buttons */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {/* Heading */}
        <div className="text-3xl lg:text-4xl font-bold text-white">{heading}</div>

        {/* Subheading */}
        <p className="text-richblack-300 text-base w-[85%] font-medium -mt-1">
          {subheading}
        </p>

        {/* Buttons */}
        <div className="flex gap-5 mt-5">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText} <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2: Code Block */}
      <div className="relative w-full lg:w-[470px] h-fit flex code-border text-[12px] sm:text-sm leading-5 sm:leading-6 rounded-md overflow-hidden">
        {/* Background Gradient */}
        {backgroundGradient}

        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
          {codeblock.split("\n").map((_, idx) => (
            <p key={idx}>{idx + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
