// import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiconnector";
import { statsEndpoints } from "../../../services/apis";

import LoginForm from "./LoginForm"
import SignUpForm from "./SignupForm"

function Template ({ title , description1 , description2 , image , formType}){
    const { loading } = useSelector((state) => state.auth)
    const [stats, setStats] = useState({
        totalStudents: "10K+",
        totalCourses: "500+",
        avgRating: "4.8"
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiConnector("GET", statsEndpoints.GET_PLATFORM_STATS_API);
                if (response.data.success) {
                    const { totalStudents, totalCourses, avgRating } = response.data.data;
                    setStats({
                        totalStudents: totalStudents > 1000 ? `${(totalStudents/1000).toFixed(1)}K+` : totalStudents,
                        totalCourses: totalCourses,
                        avgRating: avgRating
                    });
                }
            } catch (error) {
                console.log("Could not fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-richblack-900 py-12">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-start justify-between gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">

                    {/* ── LEFT: Form Section ── */}
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                        <h1 className="text-2xl font-bold leading-[2.375rem] text-richblack-5 md:text-4xl">
                            {title}
                        </h1>
                        <div className="mt-4 text-[1.125rem] leading-[1.625rem]">
                            <p className="text-richblack-100">{description1}</p>
                            <p className="font-edu-sa font-bold italic text-blue-100">
                                {description2}
                            </p>
                        </div>
                        {formType === "signup" ? <SignUpForm/> : <LoginForm/>}
                    </div>

                    {/* ── RIGHT: Premium Image Card ── */}
                    <div className="sticky top-[calc(3.5rem+3rem)] hidden self-start md:flex w-full max-w-[500px] flex-col items-center gap-8">

                        {/* Image card with gradient border */}
                        <div className="relative w-full group">

                            {/* Gradient border ring */}
                            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] opacity-60 blur-[2px] group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Image - Adjusted height and width for balance */}
                            <img
                                src={image}
                                alt="Students"
                                loading="lazy"
                                className="relative w-full h-[450px] rounded-2xl object-cover shadow-[0_30px_70px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-[1.01]"
                            />

                            {/* Subtle overlay gradient at bottom for depth */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-richblack-900/60 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Floating stat badges below the image - Dynamic Data */}
                        <div className="flex w-full justify-between gap-3">
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-richblack-700 bg-richblack-800/80 py-3 px-4 backdrop-blur-sm">
                                <span className="text-xl font-bold text-yellow-50">{stats.totalStudents}</span>
                                <span className="text-xs text-richblack-300">Active Students</span>
                            </div>
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-richblack-700 bg-richblack-800/80 py-3 px-4 backdrop-blur-sm">
                                <span className="text-xl font-bold text-yellow-50">{stats.totalCourses}</span>
                                <span className="text-xs text-richblack-300">Expert Courses</span>
                            </div>
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-richblack-700 bg-richblack-800/80 py-3 px-4 backdrop-blur-sm">
                                <span className="text-xl font-bold text-yellow-50">{stats.avgRating}★</span>
                                <span className="text-xs text-richblack-300">Avg. Rating</span>
                            </div>
                        </div>

                        {/* Atmospheric glow behind card - Homepage style */}
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] opacity-[0.12] blur-[110px] animate-pulse pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 opacity-[0.05] blur-[100px] pointer-events-none"></div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Template
