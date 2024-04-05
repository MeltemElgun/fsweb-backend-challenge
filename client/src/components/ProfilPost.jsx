import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
const ProfilePost = ({ props, token, onDelete, userData }) => {
  const [tweet, setTweet] = useState({ ...props });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButton = async () => {
    // Buttona tıklandığında Profile sayfasına git
    console.log(localStorage.getItem("user"));
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://twitter-backend-ac6l.onrender.com/api/tweet/${tweet.tweetId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      onDelete(tweet.tweetId);
    } catch (error) {
      console.error("Error deleting tweet:", error.response);
      console.log(error);
    }
  };

  return (
    <div className="hover:bg-gray-100 pb-4  ease-out border-t-[1px] duration-200  border-l w-[calc(100vw-6rem)]  max-w-[40rem]">
      <div className="flex pl-6 pt-4 w-full   justify-between pr-6">
        <div className="flex">
          <div className=" w-14 h-14 flex">
            <img
              src={tweet.profilePicture}
              className="object-cover rounded-full"
            />
          </div>
          <div className="pl-3">
            <div className="flex">
              <button
                onClick={handleButton}
                variant="contained"
                color="primary"
              >
                <p className="font-bold ">{tweet.name}</p>
              </button>
              <p className="pl-2">@{tweet.username}</p>
              <span className="pl-2 pr-2 text-gray-500"> &#8226;</span>
              <p className="text-gray-500">
                {moment(tweet.createdAt).locale("tr").format("D MMM ")}
              </p>
            </div>
            <div className="">
              <p>{tweet.content}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <BsThreeDots
              className="w-5 h-5 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute font-bold right-0 mt-2 py-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                {" "}
                <button
                  onClick={handleDelete}
                  type="submit"
                  className="px-4 py-2 text-left w-full text-red-700 hover:bg-gray-200 cursor-pointer"
                >
                  Sil
                </button>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Düzenle
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4  px-6 pl-[5rem]">
        <img src={"twitx.jpg"} className="rounded-[1rem] border" />
      </div>

      <div className="pl-[4rem] pr-6">
        <ul className="flex justify-between md:space-x-20   pt-4 ">
          <li className="flex items-center ">
            <RiChat1Line className="w-4 h-4 text-slate-600 shrink-0" />
            <p className="pl-2 ">423k</p>
          </li>
          <li className="flex items-center ">
            <BiRepost className="w-4 h-4 shrink-0" />
            <p className="pl-2 ">23,785</p>
          </li>
          <li className="flex items-center ">
            <AiOutlineHeart className="w-4 h-4 shrink-0" />
            <p className="pl-2 ">176k</p>
          </li>
          <li className="flex items-center ">
            <FiUpload className="w-4 h-4 shrink-0" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePost;
