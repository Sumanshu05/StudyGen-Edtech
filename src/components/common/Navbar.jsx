import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineSearch, AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io';
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { ACCOUNT_TYPE } from '../../utils/constants';
import logo from "../../assets/Logo/studygen-logo.png"

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector((state) => state.profile );
    const {totalItems} = useSelector((state) => state.cart);
    const {totalItems: wishlistTotalItems} = useSelector((state) => state.wishlist);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const fetchSublinks = async() => {
        setLoading(true);
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // Build slug from the actual category name so it ALWAYS matches Catalog.jsx matching
            const fetched = result?.data?.data?.map((cat) => ({
                title: cat.name,
                link: `/catalog/${cat.name.split(" ").join("-").toLowerCase()}`,
            }));
            setSubLinks(fetched || []);
        }
        catch(error){
            console.log("Could not fetch the category list", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSublinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const matchRoute = (route) => {
        return matchPath({path:route} , location.pathname); 
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim().length > 0) {
            navigate(`/search/${searchQuery.trim()}`);
            setShowSearch(false);
        }
    };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

    <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" width={48} height={48} className="rounded-full object-cover shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
        <span className="text-2xl font-bold text-richblack-5 tracking-tight">StudyGen</span>
    </Link>

    {/* Nav Links - Desktop */}
    <nav className='hidden md:block'>
        <ul className='flex gap-x-6 text-richblack-25'>
            {
                NavbarLinks.map( (link , index) => (
                    <li key={index}>
                        {
                            link.title === "Catalog" ?
                            (
                                <div className='relative flex items-center gap-2 group cursor-pointer'>
                                    <p>{link.title}</p>
                                    <IoIosArrowDropdownCircle/>

                                    <div className='invisible absolute left-[50%] top-[100%] mt-3
                                    flex flex-col rounded-xl bg-richblack-5 py-3
                                    text-richblack-900 shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                                    opacity-0 transition-all duration-200 group-hover:visible
                                    group-hover:opacity-100 lg:w-[220px] translate-x-[-50%] z-50'>

                                   <div className='absolute left-[50%] top-0 h-5 w-5 translate-y-[-45%]
                                   rotate-45 rounded-sm bg-richblack-5 translate-x-[-50%]'>
                                   </div>

                                   {
                                    loading ? (
                                        <p className='px-6 py-3 text-sm text-richblack-400'>
                                            Loading...
                                        </p>
                                    ) : subLinks.length > 0 ? (
                                            subLinks.map( (subLink , i) => (
                                                <Link to={subLink.link} key={i}
                                                    className='px-6 py-3 text-sm font-medium
                                                    hover:bg-richblack-50 transition-colors duration-150 rounded-md'>
                                                    {subLink.title}
                                                </Link>
                                            ))
                                    ) : (
                                        <p className='px-6 py-3 text-sm text-richblack-400'>
                                            No Categories Found
                                        </p>
                                    )
                                   }

                                    </div>

                                </div>

                            ) : (
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : 
                                        "text-richblack-25"}`}>
                                        {link.title}
                                    </p>
                                </Link>
                            )
                        }
                    </li>
                ) )
            }
        </ul>
    </nav>

       {/* Login/Signup/Dashboard  */}
       <div className='flex gap-x-4 items-center'>

         <form onSubmit={handleSearch} className={`flex items-center rounded-full border border-richblack-700 bg-richblack-800 ${showSearch ? 'w-[200px] px-3 py-1' : 'w-[36px] h-[36px] justify-center cursor-pointer'} transition-all duration-300`}>
            <AiOutlineSearch 
                className={`text-2xl text-richblack-100 ${!showSearch && 'cursor-pointer'}`} 
                onClick={(e) => {
                    if (!showSearch) {
                        e.preventDefault();
                        setShowSearch(true);
                    }
                }}
            />
            {showSearch && (
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => { if(!searchQuery) setShowSearch(false) }}
                    className="ml-2 w-full bg-transparent text-sm text-richblack-5 outline-none"
                    autoFocus
                />
            )}
         </form>

         {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/wishlist" className="relative">
                    <AiOutlineHeart className="text-2xl text-richblack-100" />
                    {
                        wishlistTotalItems > 0 && (
                            <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {wishlistTotalItems}
                            </span>
                        )
                    }
                </Link>
            )
         }
         {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {
                        totalItems > 0 && (
                            <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {totalItems}
                            </span>
                        )
                    }
                </Link>
            )
         }
         {
            token === null && (
                <Link to="/login" className='hidden md:block'>
                    <button className='border border-richblack-700 
                    bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Log in
                    </button>
                </Link>
            )
         }
         {
            token === null && (
                <Link to="/signup" className='hidden md:block'>
                    <button className='border border-richblack-700 
                    bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Sign Up
                    </button>
                </Link>
            )
         }
         {
            token !== null && <ProfileDropDown />
         }
         
         {/* Hamburger Menu - Mobile */}
         <div className='md:hidden cursor-pointer' onClick={() => setIsMenuOpen(true)}>
            <AiOutlineMenu className='text-3xl text-richblack-100' />
         </div>

       </div>

      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[1000] bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`fixed right-0 top-0 h-full w-[250px] bg-richblack-900 p-6 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between mb-8'>
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt="Logo" width={40} height={40} className="rounded-full object-cover" />
                    <span className="text-xl font-bold text-richblack-5">StudyGen</span>
                </Link>
                <IoMdClose className='text-3xl text-richblack-100 cursor-pointer' onClick={() => setIsMenuOpen(false)} />
            </div>
            
            <ul className='flex flex-col gap-y-4 text-richblack-25'>
                {
                    NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div className='flex flex-col gap-y-2'>
                                        <div className='flex items-center justify-between text-richblack-200 text-sm font-medium'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle />
                                        </div>
                                        <div className='pl-4 flex flex-col gap-y-2 max-h-[200px] overflow-y-auto'>
                                            {subLinks.map((subLink, i) => (
                                                <Link to={subLink.link} key={i} onClick={() => setIsMenuOpen(false)} className='text-richblack-100 text-sm py-1 hover:text-yellow-25'>
                                                    {subLink.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path} onClick={() => setIsMenuOpen(false)}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"} font-medium`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
            </ul>

            {/* Mobile Auth Buttons */}
            {token === null && (
                <div className='flex flex-col gap-y-4 mt-8'>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <button className='w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <button className='w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
