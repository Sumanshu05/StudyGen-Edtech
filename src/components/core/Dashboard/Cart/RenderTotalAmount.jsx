import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import IconButton from "../../../common/IconButton";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
    const {total , cart}  = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.auth)
    const {user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart
            .filter((course) => !course.studentEnrolled?.includes(user?._id))
            .map((course) => course._id)
            
        if (courses.length === 0) {
            toast.error("You are already enrolled in all these courses.")
            return
        }

        buyCourse(token , courses  , user , navigate , dispatch)
    }

    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 
        bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">
                Total:
            </p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {total}
            </p>

            <IconButton
               text="Buy Now"
               onClick={handleBuyCourse}
               customClasses="w-full justify-center"
            />
        </div>
    )
}
