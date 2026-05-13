// import React from "react";

// const IconButton = ({ ...btnData }) => {
//   const {
//     children,
//     text,
//     onClick,
//     disabled,
//     outline = false,
//     customClasses,
//     type,
//   } = btnData;

//   return (
//     <div className="text-white">
//       {/* <button
//         onClick={onClick}
//         disabled={disabled}
//         type={type || "button"}
//         className={`${customClasses} min-w-[120px] flex items-center justify-center rounded-md py-2 px-5 font-semibold 
//         text-richblack-900 uppercase tracking-wider
//         ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
//         ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
//         `}
//         // className={` ${customClasses} rounded-md py-2 px-5 font-semibold text-richblack-900 uppercase tracking-wider
//         // ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
//         // ${outline ? 'border border-yellow-50 bg-transparent' : 'bg-yellow-50'}
//         // `}
//       >
//         {children ? (
//           <div
//             className={`flex items-center gap-x-2 
//               ${outline && "text-yellow-50"}
//               `}
//           >
//             {text}
//             {children}
//           </div>
//         ) : (
//           <div>{text}</div>
//         )}
//       </button> */}

//       <button
//   onClick={onClick}
//   disabled={disabled}
//   type={type || "button"}
//   className={`${customClasses} min-w-[120px] flex items-center justify-center rounded-md py-2 px-5 font-semibold 
//         text-richblack-900 uppercase tracking-wider
//         ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
//         ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
//         `}
// >
//   {children ? (
//     // ❌ Remove this div wrapper entirely
//     // <div className={`flex items-center gap-x-2 ...`}>

//     // ✅ Just render directly
//     <span className={`flex items-center gap-x-2 ${outline && "text-yellow-50"}`}>
//       {text}
//       {children}
//     </span>
//   ) : (
//     <span>{text}</span>
//   )}
// </button>
//     </div>
//   );
// };

// export default IconButton;


// import React from "react";

// const IconButton = ({ children, text, onClick, disabled, outline = false, customClasses, type }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       type={type || "button"}
//       className={`${customClasses} min-w-[120px] flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold 
//       text-richblack-900 uppercase tracking-wider
//       ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
//       ${outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50"}
//       `}
//     >
//       {text}
//       {children}
//     </button>
//   );
// };

// export default IconButton;

import React from "react";

const IconButton = ({ children, text, onClick, disabled, outline = false, customClasses, type }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
      className={`${customClasses} min-w-[120px] flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold 
      text-richblack-900 uppercase tracking-wider
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      ${outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50"}
      `}
    >
      {text}
      {children}
    </button>
  );
};

export default IconButton;
