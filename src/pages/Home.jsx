import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import BannerVideo from "../assets/Images/startingvideo.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* {Section 0 } */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8">
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                    transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* {Heading} */}
        <div className="text-center text-3xl font-semibold md:text-4xl">
          Empower Your Future with{" "}
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* {Sub Heading} */}
        <div className="mt-3 w-[90%] text-center text-base md:text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on-projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* {CTA Buttons} */}
        <div className="mt-8 flex flex-col items-center gap-7 sm:flex-row">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* {Hero Visual} */}
        <div className="mx-3 my-12 p-2 border border-richblack-700 shadow-[0_0_40px_rgba(0,180,255,0.25)] w-full max-w-5xl rounded-md overflow-hidden bg-richblack-900">
          <video
            src={BannerVideo}
            className="w-full h-auto object-cover rounded-sm"
            muted
            loop
            autoPlay
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>


        {/* {Code Section 1} */}
        <div>
          <CodeBlocks
            position={"flex-col lg:flex-row"}
            heading={
              <div className="text-3xl font-semibold md:text-4xl">
                Unlock Your{" "}
                <HighlightText text={"Coding potential"} />{" "}
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* {Code Section 2} */}
        <div>
          <CodeBlocks
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="w-full text-3xl font-semibold md:text-4xl lg:w-[50%]">
                Start{" "}
                <HighlightText text={"Coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

         <ExploreMore/> 
      </div>

      {/* {Section 2} */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[360px] ">
          <div
            className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 
          mx-auto justify-between"
          >
            <div className="lg:h-[200px]"></div>
            <div className="flex flex-col items-center gap-7 text-white sm:flex-row lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col 
        items-center justify-between gap-8">
          <div className="flex flex-col gap-7 justify-between mb-10 mt-[-100px] lg:mt-20 lg:flex-row lg:gap-0">
          <div className="text-3xl font-semibold md:text-4xl lg:w-[45%] text-center lg:text-left">
            Get the skills you need for a
            <HighlightText text={"Job that is in demand"} />
          </div>

          <div className="flex flex-col gap-10 lg:w-[40%] items-start">
            <div className="text-[16px]">
              The modern educational landscape dictates its own terms. Today,
              being a competitive specialist requires more than just
              professional skills.
            </div>
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                Learn More
              </div>
            </CTAButton>
          </div>
          
          </div>

        {/* Timeline Section - Section 2 */}
        <TimelineSection />

        {/* Learning Language Section - Section 3 */}
        <LearningLanguageSection />

        </div>

      </div>

      {/* {Section 3 } */}
      <div className="w-11/12 relative my-20 mx-auto max-w-maxContent flex flex-col items-center justify-between 
      gap-8 bg-richblack-900 text-white">

        <InstructorSection/>

        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews From Other Learners
        </h1>
        {/* {Review Slider} */}
        <ReviewSlider />
      </div>


    </div>
  );
};

export default Home;
