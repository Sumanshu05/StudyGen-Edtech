import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
// import timelineImage from "../../../assets/Images/TimelineSectionRef.png"
import bannerimage from "../../../assets/Images/IMAGE.jpg"

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
]

const TimelineSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-[42%]">
          {timeline.map((element, index) => (
            <div className="flex gap-5" key={index}>
              <div className="relative flex flex-col items-center">
                <div className="w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center shrink-0">
                  <img src={element.Logo} alt={element.Heading} />
                </div>
                {index !== timeline.length - 1 && (
                  <div className="h-[64px] w-[1px] border-r border-dashed border-richblack-300 my-1"></div>
                )}
              </div>

              <div className="pt-1">
                <h2 className="font-semibold text-[20px] leading-[1.1]">
                  {element.Heading}
                </h2>
                <p className="text-[17px] text-richblack-600 mt-1 md:text-base">
                  {element.Description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-full lg:w-[58%]">
          <div className="relative mx-auto max-w-[630px]">
            <div className="absolute -top-4 -left-4 w-full h-full border-8 border-white"></div>
            <img
              src={bannerimage}
              alt="Student learning"
              className="relative z-10 w-full object-cover shadow-[0_0_30px_rgba(0,180,255,0.25)]"
            />
            <div className="absolute -bottom-10 left-1/2 z-20 w-[92%] -translate-x-1/2 bg-caribbeangreen-700 py-5 px-5 md:px-9">
              <div className="flex items-center justify-between text-white uppercase">
                <div className="flex items-center gap-3 md:gap-5 border-r border-caribbeangreen-300 pr-4 md:pr-8">
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-caribbeangreen-300 text-xs md:text-sm">
                    Years
                    <br />
                    Experiences
                  </p>
                </div>
                <div className="flex items-center gap-3 md:gap-5 pl-4 md:pl-8">
                  <p className="text-3xl font-bold">250</p>
                  <p className="text-caribbeangreen-300 text-xs md:text-sm">
                    Types of
                    <br />
                    Courses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
