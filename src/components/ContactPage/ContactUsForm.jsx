import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        countrycode: "",
        phoneNo: "",
        message: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-7"
    >
      {/* First & Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="label-style">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-[12px] text-yellow-100">
              Please enter your first name.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="label-style">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-style">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-[12px] text-yellow-100">
            Please enter your email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="label-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="w-[81px]">
            <select
              id="countrycode"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <input
              type="tel"
              inputMode="numeric"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: "Please enter your Phone Number.",
                minLength: { value: 10, message: "Invalid Phone Number" },
                maxLength: { value: 12, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>

        {errors.phoneNo && (
          <span className="text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label-style">
          Message
        </label>
        <textarea
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="form-style resize-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-[12px] text-yellow-100">
            Please enter your message.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-black
        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        }
        disabled:bg-richblack-500`}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
