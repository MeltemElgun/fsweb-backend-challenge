import React, { useState } from "react";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const Post = ({ props }) => {
  const [tweet, setTweet] = useState({ ...props });
  console.log(props);
  return (
    <div>
      {tweet ? (
        <div className="hover:bg-gray-100 ease-out border-t-[1px] duration-200 pb-4  border-l w-[calc(100vw-6rem)] mb-2 max-w-[40rem]">
          <div className="flex pl-6 pt-4 w-full   justify-between pr-6">
            <div className="flex">
              <div className=" w-14 h-14 flex">
                <img src={"ben.jpg"} className="object-cover rounded-full" />
              </div>
              <div className="pl-3">
                <div className="flex">
                  <p className="font-bold ">{tweet.name}</p>
                  <p className="pl-2">@{tweet.username}</p>
                  <span className="pl-2 pr-2 text-gray-500"> &#8226;</span>
                  <p className="text-gray-500">
                    {moment(tweet.createdAt).format("MMM D")}
                  </p>
                </div>
                <div className="">
                  <p>{tweet.content}</p>
                </div>
              </div>
            </div>
            <div>
              <BsThreeDots className="w-5 h-5" />
            </div>
          </div>

          <div className="pt-4  px-6 pl-[5.7rem]">
            <div className="  ">
              <img src={"ben.jpg"} className="rounded-[1rem] border" />
            </div>
          </div>

          <div className="pl-[5.7rem] pr-6">
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Post;
