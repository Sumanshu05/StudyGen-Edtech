import { useSelector } from "react-redux"
import RatingStars from "../../../common/RatingStars"

export default function OrderSummary({ isCheckout = false }) {
    const { wishlist } = useSelector((state) => state.wishlist)

    return (
        <div className="flex flex-col gap-y-6">
            {wishlist.map((course, index) => (
                <div
                    key={course._id}
                    className={`flex flex-col gap-6 border-b border-b-richblack-700 pb-6 lg:flex-row ${
                        index !== 0 ? "pt-6" : ""
                    }`}
                >
                    {/* Course Image */}
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-[148px] w-[220px] rounded-lg object-cover"
                    />

                    {/* Course Details */}
                    <div className="flex flex-1 flex-col gap-y-1">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-xl font-semibold text-richblack-5">
                                    {course?.courseName}
                                </p>
                                <p className="text-sm text-richblack-300">
                                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                                </p>
                                <div className="flex items-center gap-x-2">
                                     <span className="text-yellow-50 font-bold">4.5</span>
                                     <RatingStars Review_Count={4.5} />
                                     <span className="text-richblack-400">
                                        (Review Count)
                                     </span>
                                </div>
                                <div className="mt-2 flex items-center gap-x-2 text-sm text-richblack-400">
                                    <span>Total Courses</span>
                                    <span>•</span>
                                    <span>Lesson</span>
                                    <span>•</span>
                                    <span>Beginner</span>
                                </div>
                            </div>
                            
                            <p className="text-2xl font-bold text-yellow-50">
                                Rs. {course?.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
