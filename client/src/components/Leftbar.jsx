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

import { useState } from "react";
import Login from "./Login";

export default function Leftbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);

  return (
    <div className=" ml-7">
      <div className="max-w-[70px] sm:max-w-[70rem] md:max-w-[75rem] lg:max-w-[70rem] fixed sm:flex sm:flex-col   overflow-y-auto h-full ">
        <div className="sm:hover:rounded-full sm:hover:bg-slate-200  ">
          <BsTwitter
            className="text-sky-500 text-2xl cursor-pointer mx-3 h-12 w-7"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="my-1.1 flex flex-col   sm:items-start ">
          <Link
            to="/"
            className="flex  p-3 text-xl mt-2 font-bold  rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BiHomeCircle className="h-8 w-8 " />

            <p className="hidden  xl:inline-block mx-5 text-start font-normal">
              Anasayfa
            </p>
          </Link>

          <Link
            to="/explore"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BiSearch className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Keşfet
            </p>
          </Link>

          <Link
            to="/notifications"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <GrNotification className="h-9 w-6" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Bildirimler
            </p>
          </Link>

          <Link
            to="/messages"
            className="mt-1  flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <HiOutlineMail className="h-9 w-7 " />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal ">
              Mesajlar
            </p>
          </Link>

          <Link
            to="/bookmarks"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <MdOutlineFeaturedPlayList className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Listeler
            </p>
          </Link>
          <Link
            to="/bookmarks"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BsBookmark className="h-9 w-6" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Yer İşaretleri
            </p>
          </Link>
          <Link
            to="/bookmarks"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <VerifiedIcon className="text-slate-400 h-9 w-7 " />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal ">
              Onaylanmış
            </p>
          </Link>

          <Link
            to="/profile"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <BsPerson className="h-8 w-8" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Profile
            </p>
          </Link>
          <Link
            to="/profile"
            className="mt-1 group flex  p-3 text-xl leading-8 font-bold rounded-full hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue"
          >
            <CgMoreO className="h-9 w-7" />
            <p className="hidden xl:inline-block mx-5 text-start  font-normal">
              Daha fazla
            </p>
          </Link>
        </div>

        <div>
          <button className="  bg-sky-500 text-white  xl:mt-4  xl:mr-6 hover:bg-sky-500 bg-opacity-90 font-bold  py-2 px-3 xl:py-4 xl:px-16 rounded-full focus:outline-none">
            <p className="hidden xl:inline-block mx-5 text-center ">Tweetle</p>
            <BiPencil className="inline-block xl:hidden h-9 w-7 text-white   rounded-full focus:outline-none " />
          </button>
        </div>

        <div className="flex flex-col hover:bg-blue-00 rounded-full pl-2 xl:p-3 my-4   hover:bg-slate-600 hover:bg-opacity-10 hover:text-blue">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col flex-shrink-0 group focus:outline-none"
          >
            <div className="flex ">
              <div>
                <img
                  className="inline-block h-10 w-10 items-center  mt-2 rounded-full hover:bg-sky-700 bg-opacity-90"
                  src="../ben.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="flex">
                  <p className="hidden xl:inline-block text-base leading-6 font-bold">
                    meltemElgün
                  </p>
                  <IoIosLock className="mt-1 hidden xl:inline-block" />
                </div>
                <p className="hidden xl:inline-block text-sm leading-5 font-medium text-gray-600 transition ease-in-out duration-150">
                  @meltemElgün
                </p>
              </div>
              <div>
                <BsThreeDots className="w-5 h-5 ml-3 mt-3 hidden xl:inline-block " />
              </div>
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className=" top-[2rem] right-0 w-60 border bg-white shadow-lg rounded-md">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/">Var olan bir hesap ekle</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/login">
                  <Login />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
