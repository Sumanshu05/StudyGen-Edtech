import { useState } from "react"
import { useSelector } from "react-redux"
import WishlistOverview from "./WishlistOverview"
import OrderSummary from "./OrderSummary"
import PaymentDetails from "./PaymentDetails"

export default function Wishlist() {
    const { totalItems } = useSelector((state) => state.wishlist)
    const [step, setStep] = useState(1)

    return (
        <>
            {step === 1 ? (
                <>
                    {/* Breadcrumbs for Wishlist Overview */}
                    <nav className="mb-8 flex items-center gap-x-2 text-sm text-richblack-300">
                        <span className="cursor-pointer hover:text-richblack-100">Home</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-richblack-100">Dashboard</span>
                        <span>/</span>
                        <span className="text-yellow-25 font-semibold">Wishlist</span>
                    </nav>

                    <h1 className="mb-14 text-4xl font-semibold text-richblack-5">
                        My Wishlist
                    </h1>

                    {totalItems > 0 ? (
                        <WishlistOverview setStep={setStep} />
                    ) : (
                        <p className="mt-14 text-center text-3xl text-richblack-100">
                            Your wishlist is empty
                        </p>
                    )}
                </>
            ) : (
                <>
                    {/* Breadcrumbs for Checkout */}
                    <nav className="mb-8 flex items-center gap-x-2 text-sm text-richblack-300">
                        <span className="cursor-pointer hover:text-richblack-100" onClick={() => setStep(1)}>Home</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-richblack-100" onClick={() => setStep(1)}>Wishlist</span>
                        <span>/</span>
                        <span className="text-yellow-25 font-semibold">Checkout</span>
                    </nav>

                    <h1 className="mb-14 text-4xl font-semibold text-richblack-5">
                        Checkout
                    </h1>

                    <div className="flex flex-col-reverse items-start gap-x-12 gap-y-10 lg:flex-row">
                        <div className="flex flex-1 flex-col">
                            <h2 className="mb-8 text-xl font-medium text-richblack-5">Order Summary</h2>
                            <OrderSummary isCheckout={true} />
                        </div>
                        <div className="lg:sticky lg:top-10">
                            <PaymentDetails />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
