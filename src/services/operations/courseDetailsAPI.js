import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

// Deduplicate loading toasts across the app.
// react-hot-toast will update the same toast (same id) instead of stacking many.
const LOADING_TOAST_ID = "global-loading";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints;

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading", { id: LOADING_TOAST_ID });
    let result = [];

    try{
        const response = await apiConnector("GET" , GET_ALL_COURSE_API)
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("GET_ALL_COURSE_API API ERROR" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true));
    let result = null
    
    try{
        const response = await apiConnector("POST", COURSE_DETAILS_API , {
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE..............", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data
    }
    catch(error){
        console.log("COURSE_DETAILS_API API ERROR..............." , error)
        result = null
    }
    toast.dismiss(toastId)
    // dispatchEvent(setLoading(false));
    return result
}


//fetching the available course categories 
export const fetchCourseCategories = async () => {
    let result = []
    try{
        const response = await apiConnector("GET" , COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("COURSE_CATEGORY_API API ERROR............." , error)
        toast.error(error.message)
    }
    return result 
}

//add the course details 
export const addCourseDetails = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading", { id: LOADING_TOAST_ID })
    console.log("TOKEN BEING SENT:", token);

    try{
        const response = await apiConnector("POST" , CREATE_COURSE_API , data , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_COURSE_API RESPONSE............" , response)
        if(!response?.data?.success){
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Detials Added Successfully")
        result = response?.data?.data
        }
        catch(error){
            console.log("CREATE_COURSE_API ERROR.............." , error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
}

//edit the course details
export const editCourseDetails = async(data , token ) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })
    
    try{
        const response = await apiConnector("POST" , EDIT_COURSE_API , data , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT_COURSE_API RESPONSE................" , response);
        if(!response?.data?.success){
            throw new Error("Could Not Updated Successfully")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("EDIT_COURSE_API ERROR............" , error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//create a section
export const createSection = async (data , token) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , CREATE_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_SECTION_API RESPONSE.............." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.updatedCourse
    }
    catch (error) {
        console.log(
            "CREATE_SECTION_API ERROR 👉",
            error.response?.data || error.message
          )
          
      }
        toast.dismiss(toastId)
        return result
}


//create a subsection
export const createSubSection = async (data , token) => {
    let result = null;
    const toastId= toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , CREATE_SUBSECTION_API , data , {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SUBSECTION_API RESPONSE..........." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.updatedCourse
    }
    catch(error){
        console.log("CREATE_SUBSECTION_API ERROR............" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


//update a section 
export const updateSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , UPDATE_SECTION_API , data , {
            Authorization: `Bearer ${token}`
        }) 
        console.log("UPDATE_SECTION_API RESPONSE.........." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    }
    catch(error){
        console.log("UPDATE_SECTION_API ERROR........" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update a subsection 
export const updateSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , UPDATE_SUBSECTION_API , data , {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SUBSECTION_API RESPONSE.............." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    }
    catch(error){
        console.log("UPDATE_SUBSECTION_API ERROR..............." , error)
        toast.error(toast.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete a section 
export const deleteSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , DELETE_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_SECTION_API RESPONSE" , response)
        if(!response?.data?.success){
            throw new Error("Could Not Delete Section")
        }

        toast.success("Course Section Deleted")
        result = response?.data?.data
    }
        catch(error){
            console.log("DELETE_SECTION_API ERROR..........." , error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
}

//delete a subsection
export const deleteSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("POST" , DELETE_SUBSECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })
        
        console.log("DELETE_SUBSECTION_API RESPONSE.........." , response)
        if(!response?.data?.success){
            throw new Error("Could Not Delete SubSection")
        }
        toast.success("Course SubSection Deleted")
        result = response?.data?.data
    }
    catch(error){
        console.log("DELETE_SUBSECTION_API ERROR............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//fetching all courses under a specific instructor 
export const fetchInstructorCourses = async(token) => {
    let result = []
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID }) 
    console.log("TOKEN BEING SENT:", token);
    try{
        const response = await apiConnector("GET" , GET_ALL_INSTRUCTOR_COURSES_API , null , {
            Authorization: `Bearer ${token}`,
        })
        console.log("INSTRUCTOR_COURSES_API RESPONSE............" , response)
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("INSTRUCTOR_COURSE_API ERROR................" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete a course 
export const deleteCourse = async(data , token) => {
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID })

    try{
        const response = await apiConnector("DELETE" , DELETE_COURSE_API , data , {
            Authorization: `Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted")
    }
    catch(error){
        console.log("DELETE_COURSE_API ERROR............." , error)
        toast.error(error.message) 
    }
    toast.dismiss(toastId)
}

//get full details of a course
export const getFullDetailsOfCourse = async(courseId , token) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))

    let result = null
    try{
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("COURSE_FULL_DETAILS_API RESPONSE.............." , response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("COURSE_FULL_DETAILS_API ERROR............." , error)
        result = null
    }
    toast.dismiss(toastId)
    //dispatch(setLoading(false));
    return result
}

//mark a lecture as complete 
export const markLectureAsComplete = async(data , token) => {
    let result = null
    console.log("mark complete data" , data)
    const toastId = toast.loading("Marking as complete...")
    try{
        const response = await apiConnector("POST" ,
            LECTURE_COMPLETION_API,
            data, 
            {
                Authorization: `Bearer ${token}`
            })
        console.log("MARK_AS_COMPLETE_API RESPONSE..............." , response)

        if(!response.data.success){
            throw new Error(response.data.message || response.data.error || "Could Not Mark Lecture As Complete")
        }
        toast.success("Lecture Completed", { id: toastId })
        result = true
    }
    catch(error){
        console.log("MARK_LECTURE_AS_COMPLETE_API ERROR............" , error)
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message
        toast.error(errorMessage, { id: toastId })
        result = false
    }
    return result
}

//create a rating for course 
export const createRating = async(data , token ) => {
    const toastId = toast.loading("Loading...")
    let success = false

    try{
        const response = await apiConnector("POST",
            CREATE_RATING_API ,
            data , 
            {
                Authorization: `Bearer ${token}`
            })
            console.log("CREATE_RATING_API RESPONSE................" , response)

            if(!response?.data?.success){
                throw new Error("Could Not Create Rating")
            }
            toast.success("Rating Created", { id: toastId })
            success = true
    }
    catch(error){
        console.log("CREATE_RATING_API ERROR..................." , error)
        const errorMessage = error.response?.data?.message || error.message
        toast.error(errorMessage, { id: toastId })
    }
    return success
}
