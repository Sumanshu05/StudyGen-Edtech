import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton';
import NestedView from './NestedView';
import {MdAddCircleOutline} from 'react-icons/md'
import {BiRightArrow} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/CourseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  const {register, handleSubmit , setValue,formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)
  const [loading , setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
        //edit the section name 
        result = await updateSection(
          {
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
          }, token
        )
    }
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }
    //update value 
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null)
      setValue("sectionName","")
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName","");

  }
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if(!course?.courseContent?.length) {
      toast.error("Please add at least one section");
      return;
    }

    // Check if every section has at least one subsection/lecture
    const hasEmptySection = course?.courseContent?.some(
      (section) => !(
        section?.subSections?.length ||
        section?.subSection?.length ||
        section?.subsection?.length
      )
    );

    if (hasEmptySection) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  }
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName)
  }



  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <p className='text-3xl font-semibold text-richblack-5'>Course Builder </p>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor="sectionName" className='text-sm text-richblack-5'>Section name <sup className='text-pink-200'>*</sup></label>
          <input
              id='sectionName'
              disabled={loading}
              placeholder='Add section Name'
              {...register("sectionName",{required:true})}
              className='w-full form-style'
          />
          {errors.sectionName && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Section Name is required</span>
          )}
        </div>
        <div className='items-end gap-x-4 flex '>  
          <IconButton
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "create Section "}
            
            customclasses={"text-white"}
          >
            <MdAddCircleOutline className='text-yellow-50'size={20}/>
          </IconButton>
          {editSectionName && (
            <button 
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}
      {/* <div className='flex justify-end gap-x-2 mt-10'>

        <button onClick={goBack} 
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <button
        type="button"
        onClick={goToNext}
        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] 
        px-[20px] font-semibold text-richblack-900"
         >
        Next 
        <BiRightArrow/>
       </button>
      </div> */}


      <div className='flex justify-end gap-x-2 mt-10'>
  <button 
    type="button"
    onClick={goBack} 
    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
  >
    Back
  </button>

  <button
    type="button"
    onClick={() => {
      console.log("NEXT CLICKED DIRECTLY");
      goToNext();
    }}
    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900"
  >
    Next
    <BiRightArrow/>
  </button>
   </div>
      
    </div>
  )
}

export default CourseBuilderForm
