const User = require("../models/User");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

// GET /api/v1/stats/platformStats
exports.getPlatformStats = async (req, res) => {
    try {
        // Count total students
        const totalStudents = await User.countDocuments({ accountType: "Student" });

        // Count total published courses
        const totalCourses = await Course.countDocuments({ status: "Published" });

        // Calculate average rating across all reviews
        const ratingAgg = await RatingAndReview.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                }
            }
        ]);

        const avgRating = ratingAgg.length > 0 ? ratingAgg[0].avgRating.toFixed(1) : "4.8";
        const totalReviews = ratingAgg.length > 0 ? ratingAgg[0].totalReviews : 0;

        return res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalCourses,
                avgRating: parseFloat(avgRating),
                totalReviews,
            }
        });
    } catch (error) {
        console.error("Stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch platform stats",
        });
    }
};
