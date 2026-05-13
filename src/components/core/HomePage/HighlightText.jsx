import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold drop-shadow-[0_0_10px_rgba(31,162,255,0.3)]">
        {" "}{text}
    </span>
  );
};

export default HighlightText;
