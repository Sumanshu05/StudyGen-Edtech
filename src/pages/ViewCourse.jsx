import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"

import {setCompletedLectures , setCourseSectionData , setEntireCourseData , setTotalNoOfLectures} from "../slices/viewCourseSlice"

export default function ViewCourse() {
    const { courseId } = useParams()
    const { token }  = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const [reviewModal , setRevieModal ] = useState(false)

    useEffect(() => {
            ;(async () => {
            const courseData = await getFullDetailsOfCourse(courseId , token)
            console.log("Course Data here..." , courseData)
            
            if (!courseData?.courseDetails) return

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos || []))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection?.length || 0
            })
            dispatch(setTotalNoOfLectures(lectures))
        }) ()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, token, dispatch])
    
    return (
        <>
          <div className="relative flex min-h-[calc(100ch-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setRevieModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet />
                </div>
            </div>
          </div>
          {reviewModal && <CourseReviewModal setReviewModal={setRevieModal} />}
        </>
    )
}
