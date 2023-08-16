import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import { TbCalendarTime } from "react-icons/tb";
import Post from "./Post";

export default function Feed() {
  const [tweetContent, setTweetContent] = useState("");

  const handleTweet = async () => {
    try {
      const response = await axios.post("localhost:9000/api/tweet/", {
        tweetContent,
      });
      // Handle successful tweet submission (e.g., show a success message)
      console.log("Tweet posted:", response.data);
      // Clear the tweet content after posting
      setTweetContent(response.data);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error posting tweet:", error);
    }
  };

  const getTweet = async () => {
    axios.get("localhost:9000/api/tweet/").then((response) => {
      console.log(response);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:9000/api/tweet/").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <form className="mt-4 mx-8 ">
      <div className="flex focus-within:border-b-[1px]">
        <div>
          <img
            className="inline-block h-10 w-10 rounded-full"
            src="../ben.jpg"
            alt=""
          />
        </div>
        <input
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="Neler oluyor?"
          type="text"
          className="mx-3 text-xl pb-10 pr-52 outline-none text-left"
        />
      </div>
      <div className="flex items-center justify-between  mt-2 pl-20 pr-4 pb-4">
        <ul className="flex space-x-5">
          <li>
            <BsImage className="text-[#1d9bf0] w-4 h-4" />
          </li>
          <li>
            <AiOutlineFileGif className="text-[#1d9bf0] w-5 h-5" />
          </li>
          <li className="hidden md:block">
            <FaPoll className=" text-[#1d9bf0] w-4 h-4" />
          </li>
          <li>
            <BsEmojiSmile className="text-[#1d9bf0] w-4 h-4" />
          </li>
          <li className="hidden md:block">
            <TbCalendarTime className="text-[#1d9bf0] w-5 h-5" />
          </li>
          <li>
            <IoLocationSharp className="text-[#1d9bf0] w-5 h-5" />
          </li>
        </ul>
        <div className="">
          <button
            // onClick={sendTweet}
            className="bg-blue-300 text-white py-2 px-5 rounded-full font-bold"
            onClick={handleTweet}
            disabled={!tweetContent.trim()} // Disable button when tweetContent is empty or whitespace only
          >
            Tweetle
          </button>
        </div>
      </div>
      {/* {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <Post props={tweet} />
          </div>
        );
      })} */}
      <Post />
    </form>
  );
}
