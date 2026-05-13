import { useEffect } from "react";

//This hook detects clicks outside of teh specified component and
// calls teh provided handler function.

export default function useOnClickOutside(ref , handler) {
    useEffect(() => {
        const listener = (event) => {
        //Define the listener function to be called on 
        // click/touch events 
        //If teh click/touch event originated inside the ref
        // element, do nothing

        if(!ref.current || ref.current.contains(event.target)){
            return;
        }
        //Otherwise , call the provided handler function
        handler(event);
    };

    //Add event listeneres for mousedown and touchstart events
    // on the document

    document.addEventListener("mousedown" , listener);
    document.addEventListener("touchstart" , listener);

    //Cleanup function to remove teh event listeners when the 
    // component unmounts or when the ref/handler dependencies change 

    return() => {
        document.removeEventListener("mousedown" , listener);
        document.removeEventListener("touchstart" , listener);
    };
  }, [ref , handler]);
  //only run this effect when the ref or handler function changes
}
