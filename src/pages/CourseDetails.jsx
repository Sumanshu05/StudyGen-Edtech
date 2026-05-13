import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist } from "../slices/wishlistSlice";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { payementLoading } = useSelector((state) => state.course);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmaionModal] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
      setIsLoading(false);
    })();
  }, [courseId]);

  // Avg rating
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  // Accordion
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  // Total lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (isLoading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success) {
    return <Error />;
  }

  if (payementLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
  } = response.data?.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmaionModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmaionModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") return;
    if (token) {
      dispatch(addToCart(response.data?.courseDetails));
      return;
    }
    setConfirmaionModal({
      text1: "You are not logged in!",
      text2: "Please login to add to Cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmaionModal(null),
    });
  };

  const handleAddToWishlist = () => {
    if (user && user?.accountType === "Instructor") return;
    if (token) {
      dispatch(addToWishlist(response.data?.courseDetails));
      return;
    }
    setConfirmaionModal({
      text1: "You are not logged in!",
      text2: "Please login to add to Wishlist.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmaionModal(null),
    });
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative w-full bg-richblack-800">
        {/* ADDED RELATIVE HERE SO THE ABSOLUTE CARD PROPERLY POSITIONS WITHIN 1260px BOUNDS */}
        <div className="relative mx-auto box-content px-4 lg:w-[1260px]">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

              {/* Mobile thumbnail */}
              <div className="relative block max-h-[30rem] lg:hidden">
                <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                <img src={thumbnail} alt="course thumbnail" className="aspect-auto w-full" />
              </div>

              {/* Hero text */}
              <div className="z-30 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
                {/* Breadcrumb */}
              <p className="text-sm text-richblack-300">
                <span
                  className="cursor-pointer hover:text-richblack-100"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>
                {" / "}
                <span
                  className="cursor-pointer hover:text-richblack-100"
                  onClick={() => navigate("/catalog")}
                >
                  Catalog
                </span>
                {" / "}
                <span className="text-yellow-25">{courseName}</span>
              </p>

              {/* Course name */}
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                {courseName}
              </p>

              {/* Description */}
              <p className="text-richblack-200">{courseDescription}</p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-2 text-md">
                <span className="text-yellow-25 font-bold">{avgReviewCount.toFixed(1)}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span className="text-richblack-25">
                  ({ratingAndReviews?.length ?? 0} ratings)
                </span>
                <span className="text-richblack-25">
                  {studentEnrolled?.length ?? 0} students
                </span>
              </div>

              {/* Created by */}
              <p className="text-md text-richblack-25">
                Created by {instructor?.firstName} {instructor?.lastName}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-5 text-md text-richblack-25">
                <p className="flex items-center gap-2">
                  <BiInfoCircle />
                  Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt />
                  English
                </p>
              </div>
            </div>

            {/* Mobile buy buttons */}
            {user?.accountType !== "Instructor" && (
              <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                  Rs. {price}
                </p>
                {studentEnrolled?.includes(user?._id) ? (
                  <button className="yellowButton" onClick={() => navigate("/dashboard/enrolled-courses")}>
                    Go To Course
                  </button>
                ) : (
                  <>
                    <button className="yellowButton" onClick={handleBuyCourse}>
                      Buy Now
                    </button>
                    <button className="blackButton" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                    <button className="blackButton" onClick={handleAddToWishlist}>
                      Add to Wishlist
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ---- RIGHT: Card — desktop only, overlaps hero/body border ---- */}
          {user?.accountType !== "Instructor" && (
            <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
              <CourseDetailsCard
                course={response?.data?.courseDetails}
                setConfirmaionModal={setConfirmaionModal}
                handleBuyCourse={handleBuyCourse}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
              />
            </div>
          )}

        </div>
      </div>

      {/* ==================== BODY ==================== */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="max-w-[810px]">

          {/* What you'll learn */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5 grid grid-cols-1 gap-2 text-richblack-100 md:grid-cols-2">
              <ReactMarkdown
                components={{
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-caribbeangreen-200">✓</span>
                      <span>{children}</span>
                    </li>
                  ),
                  ul: ({ children }) => (
                    <ul className="flex flex-col gap-2">{children}</ul>
                  ),
                }}
              >
                {whatYouWillLearn}
              </ReactMarkdown>
            </div>
          </div>

          {/* Course content */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2 text-sm text-richblack-200">
                <div className="flex gap-2">
                  <span>{courseContent?.length} section(s)</span>
                  <span>•</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>•</span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <button
                  className="text-yellow-25 hover:underline"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="py-4">
              {courseContent?.map((section, index) => (
                <CourseAccordionBar
                  course={section}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor?.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName} ${instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg font-semibold">
                  {instructor?.firstName} {instructor?.lastName}
                </p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== REVIEWS ==================== */}
      {ratingAndReviews?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContent px-4 py-16 text-richblack-5">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            Reviews from other learners
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ratingAndReviews.slice(0, 8).map((review, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-lg bg-richblack-700 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt={review?.user?.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {review?.user?.email}
                    </p>
                  </div>
                </div>
                <RatingStars Review_Count={review?.rating} Star_Size={16} />
                <p className="text-sm text-richblack-100 line-clamp-3">
                  {review?.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}

export default CourseDetails;
