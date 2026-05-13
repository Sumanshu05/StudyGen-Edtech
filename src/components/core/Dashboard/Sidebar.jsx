import { useState } from "react";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {sidebarLinks} from "../../../data/dashboard-links"
import {logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const{ user , loading: profileLoading } = useSelector((state) => state.profile)

    const {loading : authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //to keep track of the confirmation model 
    const [confirmationModal , setConfirmationModal] = useState(null)

    if(profileLoading || authLoading){
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] min-w-[220px] items-center
            border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <>
          <div className={`fixed inset-y-0 left-0 z-[100] min-h-full min-w-[220px] bg-richblack-800 border-r-[1px] border-r-richblack-700 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
            <div className="flex min-h-[calc(100vh-3.5rem)] flex-col py-10">
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null
                        return(
                        <SidebarLink key={link.id} link={link} iconName={link.icon} onClick={() => setIsSidebarOpen(false)} />
                        )
                    })}
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                   <div className="flex flex-col">
                    <SidebarLink
                      link={{name:"Settings" , path: "/dashboard/settings", icon: VscSettingsGear}}
                      iconName="VscSettingsGear"
                      onClick={() => setIsSidebarOpen(false)}
                    />

                    <button 
                     onClick={() => 
                        setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                     })
                    }
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg"/>
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
          </div>
          {/* Overlay for mobile */}
          {isSidebarOpen && (
              <div className="fixed inset-0 z-[90] bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
          )}
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}
