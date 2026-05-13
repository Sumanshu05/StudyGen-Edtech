const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

//create a new section
exports.createSection = async(req , res) =>  {
    try{
         //data fetch 
    const {sectionName , courseId} = req.body;

    //data validaation 
    if(!sectionName || !courseId) {
        return res.status(400).json({
            success: false,
            message: 'All Fields are Required',
        });
    }

    //create a new section with the given name 
    const newSection = await Section.create({sectionName});

    console.log("Incoming courseId:", courseId);

    const courseCheck = await Course.findById(courseId);
    console.log("Course from DB:", courseCheck);


    //update course with the section object ID
    //Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
        courseId , 
        {
            $push:{
                courseContent: newSection._id,
            },
        },
        {new: true},
    )
    .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    .exec();

    //HW: use propulate to return sections/sub-sections both in the upadatedCourseDetails
    //return response 
    
    res.status(200).json({
        success: true,
        message: "Section Created Successfuly",
        updatedCourse,
    });
}

    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create Section , please try again",
            error:error.message,
        });
    }
};

//update the section 
exports.updateSection = async (req , res) => {
    try{

        //data fetch 
        const {sectionName , sectionId , courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        } 

        //update data 
        //this tym update only no need to save , becoz the section is saved through the id 

        const section = await Section.findByIdAndUpdate(
            sectionId , 
            {sectionName} , 
            {new:true}
        );

        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //return res
        return res.status(200).json({
            success:true,
            message: "Section Updated Successfully",
            data: course,
        });

    }
    catch(error){
        console.error("Error updating section:" , error);
        res.status(500).json({
            success: false,
            message: "Unable to update the section , please try again",
            error:error.message,
        }); 
    }
};


//delete section 
exports.deleteSection = async(req,res) => {
    try{
        //get ID => assuming that we are sending ID in params
        // const {sectionId , courseId} = req.params;
        const {sectionId , courseId} = req.body;

        //use findByIdandDelete
        // await Section.findByIdAndDelete(sectionId);
        //TODO[Testing] = Do we need to delete the section id from the course schema

        await Course.findByIdAndUpdate(courseId , {
            $pull: {
                courseContent: sectionId,
            }
        })

        const section = await Section.findById(sectionId);
        console.log(sectionId , courseId);
        if(!section){
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //delete sub section 
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: course
        });
    }
    catch(error){
        console.error("Error deleting section:" , error);
        return res.status(500).json({
            success: false,
            message: "Unable to Delete the Section , please try again",
        });
    }
};
