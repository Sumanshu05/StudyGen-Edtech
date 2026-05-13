import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,  
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
//     if (editCourse && Array.isArray(course?.instructions)) {
//   setRequirementsList(course.instructions)
// }

    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList,{shouldValidate:true , shouldDirty:true})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      const trimmed = requirement.trim()
      if (!trimmed) return
        setRequirementsList((prev) => [...prev, trimmed])
      setRequirement("")
      
      const updatedList = [...requirementsList, requirement];
setRequirementsList(updatedList);
setValue(name, updatedList); // 🔥 THIS IS THE FIX

      
    }
  }

  // const handleRemoveRequirement = (index) => {
  //   const updatedRequirements = [...requirementsList]
  //   updatedRequirements.splice(index, 1)
  //   setRequirementsList(updatedRequirements)
  // }
  const handleRemoveRequirement = (index) => {
    const updatedList = requirementsList.filter((_, i) => i !== index);
    setRequirementsList(updatedList);
    setValue(name, updatedList);
  };
  

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">

          {/* <input
        type="hidden"
        {...register(name, {
          required: true,
          validate: (value) =>
            Array.isArray(value) && value.length > 0,
        })}
      /> */}



          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}






















// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// export default function RequirementsField({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
// }) {
//   const { editCourse, course } = useSelector((state) => state.course)

//   const [requirement, setRequirement] = useState("")
//   const [requirementsList, setRequirementsList] = useState([])

//   // Register field & load edit data safely
//   useEffect(() => {
//     if (editCourse && Array.isArray(course?.instructions)) {
//       setRequirementsList(course.instructions)
//     }

//     register(name, {
//       required: true,
//       validate: (value) => Array.isArray(value) && value.length > 0,
//     })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Sync with react-hook-form
//   useEffect(() => {
//     setValue(name, requirementsList, { shouldValidate: true })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [requirementsList])

//   const handleAddRequirement = () => {
//     const trimmed = requirement.trim()
//     if (!trimmed) return

//     setRequirementsList((prev) => [...prev, trimmed])
//     setRequirement("")
//   }

//   const handleRemoveRequirement = (index) => {
//     setRequirementsList((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault()
//       handleAddRequirement()
//     }
//   }

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5">
//         {label} <sup className="text-pink-200">*</sup>
//       </label>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={requirement}
//           onChange={(e) => setRequirement(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="form-style w-full"
//           placeholder="Enter requirement"
//         />

//         <button
//           type="button"
//           onClick={handleAddRequirement}
//           className="rounded-md bg-yellow-400 px-4 font-semibold text-richblack-900"
//         >
//           Add
//         </button>
//       </div>

//       {requirementsList.length > 0 && (
//         <ul className="list-disc pl-5 text-richblack-5">
//           {requirementsList.map((item, index) => (
//             <li key={index} className="flex items-center gap-2">
//               {item}
//               <button
//                 type="button"
//                 onClick={() => handleRemoveRequirement(index)}
//                 className="text-xs text-pure-greys-300"
//               >
//                 clear
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {errors[name] && (
//         <span className="text-xs text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }



