import React from 'react'
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

// Deduplicate loading toasts across the app.
const LOADING_TOAST_ID = "global-loading";

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID });
    let result = [];
    try{
        const response = await apiConnector("POST" , 
            catalogData.CATALOGPAGEDATA_API,
            {categoryId: categoryId})

            if(!response?.data?.success)
                throw new Error("Could not Fetch Category page data");

            result = response?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR......." , error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}
