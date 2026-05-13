import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";

const CourseAccordionBar = ({ course, isActive, handleActive }) => {
  const contentEl = useRef(null);

  const isOpen = isActive?.includes(course._id);

  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setSectionHeight(isOpen ? contentEl.current?.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      {/* Section Header */}
      <div
        className="flex cursor-pointer items-center justify-between px-7 py-5 hover:bg-richblack-600 transition-colors"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          <AiOutlineDown
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
          <p className="font-semibold text-richblack-5">{course?.sectionName}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-yellow-25">
          <span>{course.subSection?.length || 0} lecture(s)</span>
        </div>
      </div>

      {/* Sub-sections */}
      <div
        ref={contentEl}
        className="overflow-hidden transition-[height] duration-300 ease-in-out bg-richblack-900"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-1 px-7 py-4">
          {course?.subSection?.map((subSec, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 text-sm text-richblack-100 border-b border-richblack-700 last:border-0"
            >
              <div className="flex items-center gap-3">
                <BsFillPlayCircleFill className="text-richblack-300" size={14} />
                <p>{subSec?.title}</p>
              </div>
              {subSec?.timeDuration && (
                <span className="text-xs text-richblack-400">
                  {subSec.timeDuration}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
