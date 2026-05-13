/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

import Error from "./Error";

const Catalog = () => {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Returns the selected category's courses sorted based on the active tab
  const getFilteredCourses = () => {
    const courses = catalogPageData?.data?.selectedCategory?.courses || [];
    if (active === 1) {
      // Most Popular: sort by average rating descending
      return [...courses].sort((a, b) => {
        const avgA = a.ratingAndReviews?.reduce((sum, r) => sum + r.rating, 0) / (a.ratingAndReviews?.length || 1);
        const avgB = b.ratingAndReviews?.reduce((sum, r) => sum + r.rating, 0) / (b.ratingAndReviews?.length || 1);
        return avgB - avgA;
      });
    } else {
      // New: sort by createdAt descending
      return [...courses].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  };

  //fetch all the categoies
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category = res?.data?.data?.find(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
      );

      if (category) {
        setCategoryId(category._id);
      }
      // const category_id = res?.data?.data?.filter((ct) =>
      //     ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      //     setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      setIsLoading(true);
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("Printing res:", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isLoading && catalogPageData && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section  */}
      <div className="box-content bg-richblack-800 px-4">
        <div
          className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col 
            justify-center gap-4 lg:max-w-maxContent"
        >
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-2xl text-richblack-5 md:text-3xl">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div
        className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 
          lg:max-w-maxContent"
      >
        <div className="section_heading text-2xl font-bold text-richblack-5 md:text-3xl text-center lg:text-left">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm overflow-x-auto whitespace-nowrap">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={getFilteredCourses()}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12
          lg:max-w-maxContent"
      >
        <div className="section_heading text-2xl font-bold text-richblack-5 md:text-3xl text-center lg:text-left">
          Top courses in{" "}
          {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div
        className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12
          lg:max-w-maxContent"
      >
        <div className="section_heading text-2xl font-bold text-richblack-5 md:text-3xl text-center lg:text-left">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                // eslint-disable-next-line react/jsx-pascal-case
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Catalog;
