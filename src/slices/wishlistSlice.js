import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    wishlist: localStorage.getItem("wishlist") 
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
    total: localStorage.getItem("wishlistTotal")
    ? JSON.parse(localStorage.getItem("wishlistTotal"))
    : 0,
    totalItems: localStorage.getItem("wishlistTotalItems")
    ? JSON.parse(localStorage.getItem("wishlistTotalItems"))
    : 0,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const course = action.payload;
            const index = state.wishlist.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                toast.error("Course is already in the wishlist");
                return;
            }

            state.wishlist.push(course);
            state.totalItems++;
            state.total += course.price;

            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            localStorage.setItem("wishlistTotal", JSON.stringify(state.total));
            localStorage.setItem("wishlistTotalItems", JSON.stringify(state.totalItems));

            toast.success("Course added to wishlist");
        },

        removeFromWishlist: (state, action) => {
            const courseId = action.payload;
            const index = state.wishlist.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                state.totalItems--;
                state.total -= state.wishlist[index].price;
                state.wishlist.splice(index, 1);

                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
                localStorage.setItem("wishlistTotal", JSON.stringify(state.total));
                localStorage.setItem("wishlistTotalItems", JSON.stringify(state.totalItems));

                toast.success("Course removed from wishlist");
            }
        },

        resetWishlist: (state) => {
            state.wishlist = [];
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem("wishlist");
            localStorage.removeItem("wishlistTotal");
            localStorage.removeItem("wishlistTotalItems");
        },
    },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
