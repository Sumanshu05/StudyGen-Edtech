import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function PaymentDetails() {
    const { total, wishlist } = useSelector((state) => state.wishlist)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = wishlist
            .filter((course) => !course.studentEnrolled?.includes(user?._id))
            .map((course) => course._id)
            
        if (courses.length === 0) {
            toast.error("You are already enrolled in all these courses.")
            return
        }
        
        buyCourse(token, courses, user, navigate, dispatch)
    }

    return (
        <div className="flex w-full flex-col rounded-xl border border-richblack-700 bg-richblack-800 p-8 lg:w-[410px]">
            <h3 className="text-xl font-bold text-richblack-5">Payment Details</h3>
            <p className="mt-2 text-sm text-richblack-300">
                Complete your purchase details items and providing your payment details to us .
            </p>

            <form className="mt-8 flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="fullName" className="text-sm font-medium text-richblack-5">
                        Full Name <span className="text-pink-200">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Full Name"
                        className="rounded-lg bg-richblack-700 p-3 text-richblack-5 outline-none transition-all placeholder:text-richblack-400 focus:ring-1 focus:ring-yellow-50"
                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-richblack-5">
                        Email ID <span className="text-pink-200">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email ID"
                        className="rounded-lg bg-richblack-700 p-3 text-richblack-5 outline-none transition-all placeholder:text-richblack-400 focus:ring-1 focus:ring-yellow-50"
                        defaultValue={user?.email}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-t-richblack-700 pt-6">
                    <span className="text-sm text-richblack-100">Total</span>
                    <span className="text-lg font-bold text-richblack-5">
                        Rs. {total.toLocaleString()}/-
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleBuyCourse}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-yellow-50 py-3 text-lg font-bold text-richblack-900 transition-all hover:bg-yellow-25"
                >
                    Pay Rs. {total.toLocaleString()}
                </button>
            </form>
        </div>
    )
}
