import React from "react";

import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <div className="p-8 lg:p-12 flex flex-col gap-14">
      {/* Page Heading */}
      <h1 className="text-3xl font-medium text-richblack-5">Edit Profile</h1>

      {/* Change Profile Picture */}
      <div className="mb-14">
        <ChangeProfilePicture />
      </div>

      {/* Profile Information */}
      <div className="mb-14">
        <EditProfile />
      </div>

      {/* Update Password */}
      <div className="mb-14">
        <UpdatePassword />
      </div>

      {/* Delete Account */}
      <div>
        <DeleteAccount />
      </div>
    </div>
  );
}
