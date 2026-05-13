import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconButton from "../../../common/IconButton";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  console.log("Token of change profile is :" , token);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(user?.image || null);

  const fileInputRef = useRef(null);

  // Open file picker
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  // Preview selected file
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Upload the selected image
  // const handleFileUpload = async () => {
  //   if (!imageFile) {
  //     alert("Please select an image first!");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("displayPicture", imageFile); // key must match backend

  //     // Dispatch Redux thunk to update backend
  //     const response = await dispatch(updateDisplayPicture(token, formData));

  //     // Update preview and Redux state immediately
  //     setPreviewSource(response?.data?.data?.image); // if backend returns image URL

  //     alert("Profile picture updated successfully!");
  //   } catch (error) {
  //     console.error("Upload error:", error.message);
  //     alert("Failed to upload profile picture. Please try again.");
  //   } finally {
  //     setLoading(false);
  //     setImageFile(null);
  //   }
  // };

  // Upload the selected image
const handleFileUpload = async () => {
  if (!imageFile) return;

  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("displayPicture", imageFile);
    await dispatch(updateDisplayPicture(token, formData));
    // toast is already handled inside updateDisplayPicture in SettingsAPI.js
  } catch (error) {
    console.error("Upload error:", error.message);
  } finally {
    setLoading(false);
    setImageFile(null);
  }
};

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        {/* Profile Image Preview */}
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />

        <div className="space-y-2">
          <p>Change Profile Picture</p>

          <div className="flex flex-row gap-3">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />

            {/* Select Button */}
            <button
              type="button"
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>

            {/* Upload Button */}
            <IconButton
              type="button"
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleFileUpload}
              disabled={loading}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}



















