import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import IconButton from "../../common/IconButton";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData?.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        const filteredVideoData = filteredData?.[0]?.subSection?.find(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData);
        setPreviewSource(courseEntireData?.thumbnail);
        setVideoEnded(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    return currentSectionIdx === 0 && currentSubSectionIdx === 0;
  };

  const isLastVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIdx]?.subSection?.length;
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    return (
      currentSectionIdx === courseSectionData.length - 1 &&
      currentSubSectionIdx === noOfSubsections - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIdx]?.subSection?.length;
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIdx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIdx].subSection[
          currentSubSectionIdx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIdx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIdx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIdx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIdx].subSection[
          currentSubSectionIdx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIdx - 1]._id;
      const prevSubSections =
        courseSectionData[currentSectionIdx - 1].subSection;
      const prevSubSectionId = prevSubSections[prevSubSections.length - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    try {
      const res = await markLectureAsComplete(
        { courseId, subSectionId },
        token
      );
      if (res) {
        console.log("Lecture marked as complete, updating state for:", subSectionId);
        dispatch(updateCompletedLectures(subSectionId));
      }
    } catch (error) {
      console.error("Error in handleLectureCompletion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        previewSource ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="grid h-[500px] place-items-center text-richblack-200">
            Loading video...
          </div>
        )
      ) : (
        <div className="relative">
          <video
            ref={playerRef}
            src={videoData?.videoUrl}
            controls
            className="w-full rounded-md"
            onEnded={() => setVideoEnded(true)}
          />

          {/* Overlay shown when video ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-10 grid h-full w-full place-content-center font-inter"
            >
              {!completedLectures?.includes(subSectionId) && (
                <IconButton
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconButton
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current.currentTime = 0;
                    playerRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
