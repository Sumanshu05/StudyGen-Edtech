import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Carrer paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="relative w-full">
      {/* 1. Heading and Tabs */}
      <div className="text-4xl font-semibold text-center mt-10">
        Unlock the
        <HighlightText text={" Power of Code"} />
        <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
          Learn to Build Anything You Can Imagine.
        </p>
      </div>

      <div
        className="hidden mt-5 gap-10 mx-auto w-max lg:flex flex-row
        rounded-full bg-richblack-800 text-richblack-200 p-1 mb-12
        border-richblack-100 px-1 py-1 font-medium 
        drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]"
      >
        {tabsName.map((ele, index) => (
          <div
            className={`text-[16px] flex flex-row items-center gap-2 
              ${currentTab === ele
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer
              hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px]`}
            key={index}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>

      {/* 2. THE SPACER - This creates the height in the dark section 
          so the absolute cards don't overlap the text above. */}
      <div className="hidden lg:block lg:h-[150px]"></div>

      {/* 3. THE CARDS - Using absolute positioning correctly */}
      <div className="lg:absolute flex flex-row gap-10 justify-center w-full 
        lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] 
        z-50 px-3 lg:px-0">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
