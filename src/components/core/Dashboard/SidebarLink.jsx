import { NavLink, matchPath, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetCourseState } from "../../../slices/CourseSlice"

export default function SidebarLink({ link, onClick }) {
  const location = useLocation()
  const dispatch = useDispatch()

  // ✅ HARD GUARD — prevents broken rendering
  if (
    !link ||
    typeof link !== "object" ||
    typeof link.path !== "string" ||
    typeof link.name !== "string" ||
    typeof link.icon !== "function"
  ) {
    return null
  }

  const Icon = link.icon

  const matchRoute = (route) =>
    !!matchPath({ path: route, end: false }, location.pathname)

  const handleClick = () => {
    // ✅ Reset ONLY when leaving Add Course flow
    if (!link.path.includes("/dashboard/add-course")) {
      dispatch(resetCourseState())
    }
    // ✅ Close mobile menu if onClick provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative flex items-center gap-x-2 px-8 py-2 text-sm font-medium transition-all duration-200
        ${
          matchRoute(link.path)
            ? "bg-yellow-800 text-yellow-50"
            : "text-richblack-300 hover:bg-richblack-700"
        }
      `}
    >
      {/* Active indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 transition-opacity
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
        `}
      />

      <Icon className="text-lg" />
      <span>{link.name}</span>
    </NavLink>
  )
}



















// import { NavLink, matchPath, useLocation } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { resetCourseState } from "../../../slices/CourseSlice"

// export default function SidebarLink({ link }) {
//   const location = useLocation()
//   const dispatch = useDispatch()

//   if (!link || !link.path || !link.icon) {
//     console.warn("SidebarLink received invalid link:", link)
//     return null
//   }

//   const Icon = link.icon

//   const matchRoute = (route) =>
//     !!matchPath({ path: route, end: false }, location.pathname)

//   const handleClick = () => {
//     // ❗ reset course state ONLY if we are NOT going to add/edit course
//     if (!link.path.includes("add-course")) {
//       dispatch(resetCourseState())
//     }
//   }

//   return (
//     <NavLink
//       to={link.path}
//       onClick={handleClick}
//       className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
//         matchRoute(link.path)
//           ? "bg-yellow-800 text-yellow-50"
//           : "text-richblack-300 hover:bg-richblack-700"
//       }`}
//     >
//       <span
//         className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
//           matchRoute(link.path) ? "opacity-100" : "opacity-0"
//         }`}
//       />
//       <div className="flex items-center gap-x-2">
//         <Icon className="text-lg" />
//         <span>{link.name}</span>
//       </div>
//     </NavLink>
//   )
// }
