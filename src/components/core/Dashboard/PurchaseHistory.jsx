import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserPurchaseHistory } from "../../../services/operations/profileAPI"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const [purchaseHistory, setPurchaseHistory] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserPurchaseHistory(token)
        setPurchaseHistory(res)
      } catch (error) {
        console.log("Could not fetch purchase history.", error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Purchase History
      </h1>
      <div className="flex flex-col gap-y-6">
        {purchaseHistory === null ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : purchaseHistory.length === 0 ? (
          <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
            You have not purchased any courses yet.
          </p>
        ) : (
          <div className="my-8 text-richblack-5 overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="flex rounded-t-lg bg-richblack-500">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Date</p>
                <p className="w-1/4 px-2 py-3">Amount</p>
                <p className="flex-1 px-2 py-3 text-right">Status</p>
              </div>
              {purchaseHistory.map((purchase, index) => (
                <div
                  key={index}
                  className={`flex items-center border border-richblack-700 ${
                    index === purchaseHistory.length - 1
                      ? "rounded-b-lg"
                      : "rounded-none"
                  }`}
                >
                  <div className="flex w-[45%] items-center gap-4 px-5 py-3">
                    <img
                      src={purchase.courseId?.thumbnail}
                      alt="course_img"
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-richblack-5">
                        {purchase.courseId?.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        ID: {purchase.orderId}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 px-2 py-3 text-sm text-richblack-300 font-inter">
                    {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="w-1/4 px-2 py-3 text-yellow-50 font-medium">
                    Rs. {purchase.amount.toLocaleString()}
                  </div>
                  <div className="flex-1 px-5 py-3 text-right">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        purchase.status === "Success"
                          ? "bg-caribbeangreen-100 text-caribbeangreen-900"
                          : "bg-pink-100 text-pink-900"
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
