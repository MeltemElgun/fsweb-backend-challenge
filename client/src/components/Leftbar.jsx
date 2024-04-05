import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiQuillPenLine } from "react-icons/ri";
import { BiHomeCircle, BiSearch, BiPencil } from "react-icons/bi";
import { BsTwitter, BsBookmark, BsPerson } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CgMoreO } from "react-icons/cg";
import VerifiedIcon from "@mui/icons-material/Verified";
import Form from "../pages/Form";

export default function Leftbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async () => {
    try {
      setMenuOpen(!menuOpen);
      localStorage.removeItem("user");
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (localUser.username) {
          const response = await axios.get(
            `https://twitter-backend-ac6l.onrender.com/api/user/${localUser.username}`,
            {
              headers: {
                Authorization: localUser.token,
              },
            }
          );
          console.log(response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleTweet = () => {
    setIsFormVisible(false); // Close the form after submissionnavigate("/login");
  };
  return (
    <div className=" ml-9   ">
      <div className="max-w-[70px] sm:max-w-[70rem] md:max-w-[75rem] lg:max-w-[70rem] fixed sm:flex sm:flex-col   h-full overflow-y-auto">
        <div className="sm:hover:rounded-full sm:hover:bg-slate-200  ">
          <BsTwitter
            className="text-sky-500 text-2xl cursor-pointer mx-3 h-12 w-7"
            onClick={() => navigate("/")}
          />
        </div>

        <div className=" flex flex-col   sm:items-start ">
          <Link
            to="/"
            className="flex  pl-3 pt-2 pb-2 text-xl mt-1 font-bold  rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BiHomeCircle className="h-8 w-8 " />

            <p className="hidden  xl:inline-block mx-5 text-start font-normal">
              Anasayfa
            </p>
          </Link>

          <Link
            to="/explore"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BiSearch className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Keşfet
            </p>
          </Link>

          <Link
            to="/notifications"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <GrNotification className="h-9 w-6" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Bildirimler
            </p>
          </Link>

          <Link
            to="/messages"
            className="mt-1  flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <HiOutlineMail className="h-9 w-7 " />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal ">
              Mesajlar
            </p>
          </Link>

          <Link
            to="/bookmarks"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <MdOutlineFeaturedPlayList className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Listeler
            </p>
          </Link>
          <Link
            to="/bookmarks"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BsBookmark className="h-9 w-6" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Yer İşaretleri
            </p>
          </Link>
          <Link
            to="/bookmarks"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <VerifiedIcon className="text-slate-400 h-9 w-7 " />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal ">
              Onaylanmış
            </p>
          </Link>

          <Link
            to="/profile"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BsPerson className="h-8 w-8" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Profile
            </p>
          </Link>
          <Link
            to="/profile"
            className="mt-1 group flex  pl-3 pt-2 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <CgMoreO className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Daha fazla
            </p>
          </Link>
        </div>

        <div>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-sky-500 text-white xl:mt-4 xl:mr-6 hover:bg-sky-500 bg-opacity-90 font-bold py-2 mt-2 px-3 xl:py-[0.9rem] xl:px-16 rounded-full focus:outline-none"
          >
            <p className="hidden xl:inline-block mx-5 text-center text-base">
              Gönder
            </p>
            <RiQuillPenLine className="inline-block xl:hidden h-9 w-7 text-white rounded-full focus:outline-none" />
          </button>
        </div>
        {/* Tweet form */}
        {isFormVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white pt-4 rounded-xl  ">
              {/* Your tweet form content */}
              <Form />
            </div>
          </div>
        )}

        {userData && (
          <div className="flex flex-col hover:bg-blue-00 rounded-full pl-2 xl:p-3 mt-20   hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col flex-shrink-0 group focus:outline-none"
            >
              <div className="flex ">
                <div>
                  <img
                    className="inline-block h-10 w-10 items-center  mt-2 rounded-full hover:bg-sky-700 bg-opacity-90"
                    src={userData?.profilePicture}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="flex">
                    <p className="hidden xl:inline-block text-base leading-6 font-bold">
                      {userData?.name}
                    </p>
                    <IoIosLock className="mt-1 hidden xl:inline-block" />
                  </div>

                  <p className="hidden xl:inline-block text-sm leading-5 font-medium text-gray-600 transition ease-in-out duration-150">
                    @{userData?.username}
                  </p>
                </div>
                <div>
                  <BsThreeDots className="w-5 h-5 ml-3 mt-3 hidden xl:inline-block " />
                </div>
              </div>
            </button>
          </div>
        )}

        {menuOpen && userData && (
          <div className="bottom-0  right-0 w-60 border bg-white shadow-lg rounded-2xl absolute transform translate-y-[-70%]  translate-x-[60%]  xl:translate-y-[-60%] xl:translate-x-[0%]">
            <ul className="py-2">
              <li className="px-6 py-2 hover:bg-gray-100">
                <Link to="/">Var olan bir hesap ekle</Link>
              </li>
              <li className="px-2 py-2 hover:bg-gray-100">
                <Link to="/login">
                  <button type="button" onClick={handleLogout}>
                    @{userData?.username}hesabından çıkış yap
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
