// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section");
// const Course = require("../models/Course");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

// //create Sub Section

// // exports.createSubSection = async (req, res) => {
// //     try {
// //         //fetch data from the body
// //         const { sectionId, title, timeDuration, description } = req.body;

// //         //extract file/video
// //         const video = req.files.video

// //         //validation
// //         if (!sectionId || !title || !description || !video) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "All fields are required",
// //             });
// //         }
// //         console.log(video);

// //         //upload video file to cloudinary
// //         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

// //         console.log(uploadDetails);

// //         //create a new sub section
// //         const SubSectionDetails = await SubSection.create({
// //             title: title,
// //             timeDuration: `${uploadDetails.timeDuration}`,
// //             description: description,
// //             videoUrl: uploadDetails.secure_url,
// //         })

// //         //update the corresponding section with the newly created sub section ObjectId
// //         const updatedSection = await Section.findByIdAndUpdate(
// //             { _id: sectionId },
// //             {
// //                 $push: {
// //                     SubSection: SubSectionDetails._id,
// //                 }
// //             },
// //             { new: true }
// //         ).populate("subSection")

// //         //HW: log updated section here , after adding populate query
// //         //return response
// //         return res.status(200).json({
// //             success: true,
// //             message: "Sub Section Created Successfully",
// //             data: updatedSection,
// //         });
// //     }
// //     catch (error) {
// //         console.error("Error Creating new Sub-Section:", error)
// //         return res.status(500).json({
// //             success: false,
// //             message: "Internal Server Error",
// //             error: error.message,
// //         });
// //     }
// // }

// exports.createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;

//     // FIX 1: correct key
//     const video = req.files.videoFile;

//     // FIX 2: remove timeDuration validation
//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // upload to cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       process.env.FOLDER_NAME
//     );

//     // create subsection
//     const subSectionDetails = await SubSection.create({
//       title,
//       timeDuration: `${uploadDetails.duration}`,
//       description,
//       videoUrl: uploadDetails.secure_url,
//     });

//     // FIX 3: field name consistency
//     // const updatedSection = await Section.findByIdAndUpdate(
//     //   sectionId,
//     //   {
//     //     $push: { subSection: subSectionDetails._id },
//     //   },
//     //   { new: true }
//     // ).populate("subSection");

//     // return res.status(200).json({
//     //   success: true,
//     //   message: "Sub Section Created Successfully",
//     //   data: updatedSection,
//     // });

//     const updatedSection = await Section.findByIdAndUpdate(
//   sectionId,
//   { $push: { subSection: subSectionDetails._id } },
//   { new: true }
// ).populate("subSection");

// // 🔥 ALSO FETCH UPDATED COURSE
// const updatedCourse = await Course.findOne({
//   courseContent: sectionId,
// }).populate({
//   path: "courseContent",
//   populate: {
//     path: "subSection",
//   },
// });

// return res.status(200).json({
//   success: true,
//   message: "Sub Section Created Successfully",
//   data: updatedCourse,
// });

//   } catch (error) {
//     console.error("Error Creating new Sub-Section:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// //update Sub Section
// exports.updateSubSection = async (req, res) => {
//     try {
//         //data fetch
//         const { title, description, subSectionId, sectionId } = req.body();

//         //validation
//         if (!title || !description || !subSectionId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All Fields Are Required",
//             });
//         }

//         if (!subSection) {
//             return res.status(404).json({
//                 success: false,
//                 message: "SubSection not found",
//             })
//         }

//         //create the object for the only selected updated data
//         // const UpdatedFields = {};

//         // if(title !== undefined) UpdatedFields.title = title;
//         // if(description !== undefined) UpdatedFields.description = description;
//         // if(videoUrl !== undefined) UpdatedFields.videoUrl = videoUrl;
//         // if(timeDuration !== undefined) UpdatedFields.timeDuration = timeDuration;

//         if (title !== undefined) {
//             subSection.title = title
//         }

//         if (description !== undefined) {
//             subSection.description = description
//         }
//         if (req.files && req.files.video !== undefined) {
//             const video = req.files.video
//             const uploadDetails = await uploadImageToCloudinary(
//                 video,
//                 process.env.FOLDER_NAME
//             )
//             subSection.videoUrl = uploadDetails.secure_url
//             subSection.timeDuration = `${uploadDetails.duration}`
//         }

//         await subSection.save()

//         // //update the data
//         // const subSection = await SubSection.findByIdAndUpdate(
//         //     subSectionId,
//         //     { $set: UpdatedFields },
//         //     { new: true },
//         // );

//         //find the updated section and return it
//         const updatedSection = await Section.findById(sectionId).populate(
//             "subSection"
//         )

//         console.log("updated section" , updatedSection);

//         //send response
//         return res.status(200).json({
//             success: true,
//             message: "Sub Section Updated Successfully",
//             data: updatedSection,
//         });
//     }
//     catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: "Some Error Occured While Updating , Please Try Again",
//         });
//     }
// }

// //Delete Sub Section
// exports.deleteSubSection = async (req, res) => {
//     try {
//         //fetch the data
//         const { sectionId, subSectionId } = req.body();

//         //validate the id's
//         if (!sectionId || !subSectionId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Both ID's are required",
//             });
//         }

//         //check is subsection exist and delete
//         await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         $pull: {
//           subSection: subSectionId,
//         },
//       }
//     )

//         const subsection = await SubSection.findByIdAndDelete({_id: subSectionId});
//         if (!subsection) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Sub Section not found",
//             });
//         }

//         //delete the subsection
//         // await SubSection.findByIdAndDelete(subSectionId);

//         //find updated section and return it
//         const updatedSection = await Section.findById(sectionId).populate(
//             "subSection"
//         )

//         //return response
//         return res.status(200).json({
//             success: true,
//             message: "The SubSection Deleted Successfully",
//             data: updatedSection,
//         });
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             succces: false,
//             message: "Some Error Occured While Deleting the SubSection",
//         });
//     }
// }

const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ================= CREATE SUBSECTION =================
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.videoFile;

    console.log("REQ.BODY:", req.body);
    console.log("SECTION ID:", sectionId);
    console.log("TYPE OF SECTION ID:", typeof sectionId);
    console.log("video file", video);

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration: `${uploadDetails.duration}`,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSectionDetails._id } },
      { new: true },
    );

    // const updatedCourse = await Course.findOne({
    //   courseId: sectionId.course,
    // }).populate({
    //   path: "courseContent",
    //   populate: { path: "subSection" },
    // })
    // .exec();

    // const section = await Section.findById(sectionId);

    // const updatedCourse = await Course.findById(section.course)
    //   .populate({
    //     path: "courseContent",
    //     populate: { path: "subSection" },
    //   })
    //   .exec();

    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Sub Section Created Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error Creating Sub-Section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ================= UPDATE SUBSECTION =================
exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Section ID are required",
      });
    }

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    if (req.files?.videoFile) {
      const uploadDetails = await uploadImageToCloudinary(
        req.files.videoFile,
        process.env.FOLDER_NAME,
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    });

    return res.status(200).json({
      success: true,
      message: "Sub Section Updated Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error Updating Sub-Section:", error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred While Updating",
      error: error.message,
    });
  }
};

// ================= DELETE SUBSECTION =================
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Both IDs are required",
      });
    }

    await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true },
    );

    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    });

    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error Deleting Sub-Section:", error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occurred While Deleting",
      error: error.message,
    });
  }
};
