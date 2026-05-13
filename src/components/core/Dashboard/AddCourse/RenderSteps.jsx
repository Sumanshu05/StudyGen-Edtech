import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ]

  return (
    <div>
      {/* Step indicators */}
      <div className="flex w-full justify-center mb-2">
        {steps.map((item, index) => (
          <Fragment key={item.id}>
            {/* Circle */}
            <div
              className={`grid place-items-center aspect-square rounded-full w-[34px] border select-none
                ${item.id < step && "bg-yellow-50 text-richblack-900"}
                ${item.id === step && "border-yellow-50 bg-yellow-900 text-yellow-50"}
                ${item.id > step && "border-richblack-700 bg-richblack-800 text-richblack-300"}
              `}
            >
              {item.id < step ? (
                <FaCheck className="font-bold" />
              ) : (
                item.id
              )}
            </div>

            {/* Connector line */}
            {index !== steps.length - 1 && (
              <div
                key={`line-${item.id}`}
                className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed
                  ${item.id < step ? "border-yellow-50" : "border-richblack-500"}
                `}
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Step titles */}
      <div className="mb-4 md:mb-8">
        <div className="hidden md:flex justify-between select-none">
          {steps.map((item) => (
            <div
              key={item.id}
              className={`min-w-[130px] text-center text-sm uppercase tracking-wider
                ${item.id <= step ? "text-richblack-5" : "text-richblack-500"}
              `}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile heading */}
      <div className="md:hidden font-semibold mb-5 text-xl">
        {step === 1 && "Course Information"}
        {step === 2 && "Course Builder"}
        {step === 3 && "Publish Course"}
      </div>

      {/* Step content */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  )
}

export default RenderSteps






































// import { FaCheck } from "react-icons/fa"
// import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse/index"


// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-richblack-900" />
//                 ) : (
//                   item.id
//                 )}
//               </button>
              
//             </div>
//             {item.id !== steps.length && (
//               <>
//                 <div
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}
//                 ></div>
//               </>
//             )}
//           </>
//         ))}
//       </div>

//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>
//       {/* Render specific component based on current step */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />} 
//       {step === 3 &&  <PublishCourse /> }  
//     </>
//   )
// }





























// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { FaCheck } from "react-icons/fa"
// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"

// const RenderSteps = () => {

//   const { step } = useSelector((state) => state.course)


//   const steps = [
//     {
//       id: 1,
//       title: 'Course Information'
//     },
//     {
//       id: 2,
//       title: 'Course Builder'
//     },
//     {
//       id: 3,
//       title: 'Publish'
//     }
//   ]

//   return (
//     <div>

//       <div className='flex w-full justify-center mb-2' >
//         {
//           steps.map((item) => (
//             <Fragment key={item.id}>
//               <div className={`grid place-items-center aspect-square rounded-full w-[34px] border select-none
//                 ${item.id < step && "bg-yellow-50 text-yellow-50"}
//                 ${item.id === step && "border-yellow-50 bg-yellow-900 text-yellow-50"}
//                 ${item.id > step && "border-richblack-700 bg-richblack-800 text-richblack-300"}
//               `} >
//                 {
//                   item.id < step ? <FaCheck className='font-bold text-richblack-900' /> : item.id
//                 }
//               </div>

//               {
//                 item.id !== steps.length && (
//                   <>
//                     <div className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed
//                   ${item.id < step ? "border-yellow-50" : "border-richblack-500"}
//                   `} >
//                     </div>
//                   </>
//                 )
//               }
//             </Fragment>
//           ))
//         }
//       </div>

//       <div className='mb-10 md:mb-16'>
//         <div className='hidden md:flex justify-between select-none ' >
//           {
//             steps.map(item => (
//               <div key={item.id} className={`min-w-[130px] text-center text-sm  uppercase tracking-wider
//               ${item.id <= step ? "text-richblack-5" : "text-richblack-500"}`} >
//                 {item.title}
//               </div>
//             ))
//           }
//         </div>
//       </div>

//       <div className='md:hidden font-semibold mb-5 text-xl'>
//         {step === 1 && "CourseInformationForm"}
//         {step === 2 && "CourseBuilderForm"}
//         {step === 3 && "PublishCourse"}
//       </div>

//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 && <PublishCourse />}

//     </div>
//   )
// }

// export default RenderSteps
