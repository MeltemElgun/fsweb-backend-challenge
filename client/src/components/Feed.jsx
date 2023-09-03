import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import { TbCalendarTime } from "react-icons/tb";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
export default function Feed() {
  const [tweetContent, setTweetContent] = useState({
    content: "",
    image: "",
  });
  const [tweets, setTweets] = useState([]);

  const [localToken, setLocalToken] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const localTokenCheck = async () => {
    await axios
      .get("https://twitter-backend-ac6l.onrender.com/api/auth", {
        headers: {
          Authorization: `${localToken?.token}`,
        },
      })
      .then((res) => {
        res.data && setLocalToken(JSON.parse(localStorage.getItem("user")));
        console.log(JSON.stringify(res.data));
      });
  };

  useEffect(() => {
    localToken && localTokenCheck();
    getTweet();
  }, []);
  const handleTweet = async () => {
    try {
      await axios
        .post(
          "https://twitter-backend-ac6l.onrender.com/api/tweet/",
          {
            content: tweetContent.content,
            image: tweetContent.image,
            userId: 1,
          },
          {
            headers: {
              Authorization: `${localToken?.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTweetContent([...tweets, response.data]);

          console.log(JSON.stringify(response.data));
        });
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.log(error);
    }
  };

  // http://localhost:9000
  const getTweet = async () => {
    try {
      await axios
        .get("https://twitter-backend-ac6l.onrender.com/api/tweet/", {
          headers: {
            Authorization: `${localToken?.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setTweets(response.data);
          console.log(JSON.stringify(response.data));
        });
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.log(error);
    }
  };

  return (
    <>
      {localToken ? (
        <>
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
                value={tweetContent.content}
                onChange={(e) =>
                  setTweetContent({ ...tweetContent, content: e.target.value })
                }
                placeholder="Neler oluyor?"
                type="text"
                className="mx-3 text-xl pb-10 pr-52 outline-none text-left"
              />
              {tweetContent.image && <img src={tweetContent.image} alt="" />}
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

              <button
                onClick={handleTweet}
                type="submit"
                className="bg-blue-400 text-white py-2 px-5 rounded-full font-bold"
                // disabled={!tweetContent.trim()} // Disable button when tweetContent is empty or whitespace only
              >
                Gönder
              </button>
            </div>{" "}
          </form>
        </>
      ) : (
        <div>{navigate("/")};</div>
      )}{" "}
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <Post props={tweet} localToken={localToken} />
          </div>
        );
      })}
    </>
  );
}
