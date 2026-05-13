import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { courseEndpoints } from "../services/apis";
import Course_Card from "../components/core/Catalog/Course_Card";
import Footer from "../components/common/Footer";

const Search = () => {
    const { searchQuery } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);
                if (res?.data?.success) {
                    const allCourses = res.data.data;
                    const query = searchQuery.toLowerCase();
                    const filteredCourses = allCourses.filter(course => 
                        course?.courseName?.toLowerCase()?.includes(query) ||
                        course?.courseDescription?.toLowerCase()?.includes(query) ||
                        course?.category?.name?.toLowerCase()?.includes(query)
                    );
                    setCourses(filteredCourses);
                }
            } catch (error) {
                console.error("Could not fetch courses", error);
            }
            setLoading(false);
        };
        
        if (searchQuery) {
            fetchCourses();
        }
    }, [searchQuery]);

    return (
        <div className="box-content bg-richblack-900 border-t border-richblack-700 text-white flex flex-col min-h-[calc(100vh-3.5rem)]">
            <div className="mx-auto flex flex-col border-b border-richblack-700 w-full bg-richblack-800 p-8">
                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 lg:max-w-maxContent">
                    <p className="text-sm text-richblack-300 mb-2">Home / Search</p>
                    <h1 className="text-3xl text-richblack-5 font-bold mb-4">
                        Search Results for <span className="text-yellow-25">"{searchQuery}"</span>
                    </h1>
                </div>
            </div>

            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent flex-grow">
                {loading ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <p className="text-richblack-200 text-lg">Searching...</p>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <Course_Card course={course} key={index} Height={"h-[250px]"} />
                        ))}
                    </div>
                ) : (
                    <p className="text-2xl text-richblack-200 mt-10">
                        No courses found matching your query.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Search;
