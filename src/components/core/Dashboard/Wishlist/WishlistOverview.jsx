import { useDispatch, useSelector } from "react-redux"
import { removeFromWishlist } from "../../../../slices/wishlistSlice"
import { RiDeleteBin6Line } from "react-icons/ri"
import RatingStars from "../../../common/RatingStars"

export default function WishlistOverview({ setStep }) {
    const { wishlist, total } = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col-reverse items-start gap-x-12 gap-y-10 lg:flex-row">
            <div className="flex flex-1 flex-col">
                <p className="mb-8 border-b border-b-richblack-700 pb-2 font-semibold text-richblack-400">
                    {wishlist.length} Courses in Wishlist
                </p>
                <div className="flex flex-col gap-y-6">
                    {wishlist.map((course, index) => (
                        <div
                            key={course._id}
                            className={`flex flex-col gap-6 border-b border-b-richblack-700 pb-6 lg:flex-row ${
                                index !== 0 ? "pt-6" : ""
                            }`}
                        >
                            <img
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="h-auto w-full rounded-lg object-cover lg:h-[148px] lg:w-[220px]"
                            />
                            <div className="flex flex-1 flex-col gap-y-1">
                                <div className="flex flex-col justify-between items-start gap-y-4 sm:flex-row sm:items-start lg:gap-y-0">
                                    <div className="flex flex-col gap-y-1">
                                        <p className="text-xl font-semibold text-richblack-5">
                                            {course?.courseName}
                                        </p>
                                        <p className="text-sm text-richblack-300">
                                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-2">
                                            <span className="text-yellow-50 font-bold">4.5</span>
                                            <RatingStars Review_Count={4.5} />
                                            <span className="text-richblack-400">
                                                (Review Count)
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-richblack-400">
                                            <span>Total Courses</span>
                                            <span>•</span>
                                            <span>Lesson</span>
                                            <span>•</span>
                                            <span>Beginner</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-start gap-y-4 sm:items-end w-full sm:w-auto">
                                        <button
                                            onClick={() => dispatch(removeFromWishlist(course._id))}
                                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-800 py-1.5 px-3 text-pink-200 transition-all hover:bg-richblack-700"
                                        >
                                            <RiDeleteBin6Line />
                                            <span>Remove</span>
                                        </button>
                                        <p className="text-2xl font-bold text-yellow-50">
                                            Rs. {course?.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Card */}
            <div className="flex h-fit w-full flex-col rounded-xl border border-richblack-700 bg-richblack-800 p-8 lg:sticky lg:top-10 lg:w-[350px]">
                <p className="text-sm font-medium text-richblack-100">Total:</p>
                <p className="text-4xl font-bold text-yellow-50 mt-2">
                    Rs. {total.toLocaleString()}
                </p>
                <p className="text-sm text-richblack-400 line-through mt-1">
                    Rs. {(total * 1.5).toLocaleString()}
                </p>
                <button
                    onClick={() => setStep(2)}
                    className="mt-8 flex w-full items-center justify-center rounded-lg bg-yellow-50 py-3 text-xl font-bold text-richblack-900 transition-all hover:bg-yellow-25"
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}
