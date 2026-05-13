import React from "react";
import Instructor from "../../../assets/Images/INSTRUCTOR.jpg";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16 w-full">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">

        <div className="w-full lg:w-[50%]">
          <img
            src={Instructor}
            alt="InstructorImage"
            className="shadow-white w-full rounded-md bg-white/10 p-3"
          />
        </div>

        <div className="w-full lg:w-[50%] flex flex-col gap-8">
            <div className="text-4xl font-semibold lg:w-[60%]">
                Become an
                <HighlightText text={"Instructor"}/>
            </div>

        <p className="font-medium text-[16px] lg:w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on 
            StudyGen. We provide the tools and skills to teach what you love.
        </p> 

        <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
             <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaArrowRight/>
             </div>
            </CTAButton>
        </div>


        </div>

      </div>
    </div>
  );
};

export default InstructorSection;
