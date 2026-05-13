import React from "react";
import { FaShareSquare } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsInfinity, BsTrophy } from "react-icons/bs";
import { TbDeviceMobileCheck } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseDetailsCard = ({
  course,
  setConfirmaionModal,
  handleBuyCourse,
  handleAddToCart,
  handleAddToWishlist,
}) => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const { thumbnail, price, studentEnrolled } = course || {};

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex flex-col rounded-2xl bg-richblack-700 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="Course thumbnail"
        className="w-full rounded-t-2xl object-cover max-h-[220px]"
      />

      {/* Card body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Price */}
        <p className="text-3xl font-bold text-richblack-5">Rs. {price}</p>

        {/* CTA Buttons */}
        {user && studentEnrolled?.includes(user?._id) ? (
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="w-full rounded-lg bg-yellow-50 py-3 font-bold text-richblack-900 transition-all hover:bg-yellow-25"
          >
            Go To Course
          </button>
        ) : (
          <>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-yellow-50 py-3 font-bold text-richblack-900 transition-all hover:bg-yellow-25"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyCourse}
              className="w-full rounded-lg bg-richblack-800 py-3 font-bold text-richblack-5 transition-all hover:bg-richblack-900"
            >
              Buy now
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-full rounded-lg bg-richblack-800 py-3 font-bold text-richblack-5 transition-all hover:bg-richblack-900"
            >
              Add to Wishlist
            </button>
          </>
        )}

        {/* Guarantee */}
        <p className="text-center text-sm text-richblack-100">
          30-Day Money-Back Guarantee
        </p>

        {/* This course includes */}
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold text-richblack-5">
            This course includes:
          </p>
          <ul className="flex flex-col gap-2 text-sm text-caribbeangreen-100">
            <li className="flex items-center gap-2">
              <MdOutlineOndemandVideo className="text-caribbeangreen-200" size={16} />
              8 hours on-demand video
            </li>
            <li className="flex items-center gap-2">
              <BsInfinity className="text-caribbeangreen-200" size={16} />
              Full Lifetime access
            </li>
            <li className="flex items-center gap-2">
              <TbDeviceMobileCheck className="text-caribbeangreen-200" size={16} />
              Access on Mobile and TV
            </li>
            <li className="flex items-center gap-2">
              <BsTrophy className="text-caribbeangreen-200" size={16} />
              Certificate of completion
            </li>
          </ul>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 text-sm text-yellow-100 hover:underline"
        >
          <FaShareSquare size={14} />
          Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
