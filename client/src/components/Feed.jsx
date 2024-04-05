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
    userId: null,
  });
  const [user, setUser] = useState(null);

  const [tweets, setTweets] = useState([]);

  const [localToken, setLocalToken] = useState(null);

  const navigate = useNavigate();

  const getUserIdByUsername = async (username, token) => {
    try {
      const response = await axios.get(
        `https://twitter-backend-ac6l.onrender.com/api/user/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const localTokenCheck = async (token) => {
    try {
      const response = await axios.get(
        "https://twitter-backend-ac6l.onrender.com/api/auth",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data) {
        const userData = await getUserIdByUsername(localUser.username, token);
        setUser(userData);
        getTweet(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const localUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (localUser) {
      setLocalToken(localUser.token);
      localTokenCheck(localUser.token);
    } else {
      navigate("/"); // Kullanıcı giriş yapmadıysa ana sayfaya yönlendir
    }
  }, []);

  const handleTweet = async () => {
    try {
      const userData = await getUserIdByUsername(
        localUser.username,
        localToken
      );

      if (userData.userId) {
        const response = await axios.post(
          "https://twitter-backend-ac6l.onrender.com/api/tweet/",
          {
            content: tweetContent.content,
            image: tweetContent.image,
            userId: userData.userId,
          },
          {
            headers: {
              Authorization: localToken,
              "Content-Type": "application/json",
            },
          }
        );

        setTweets([...tweets, response.data]);

        setTweetContent({ content: "", image: "", userId: null }); // tweetContent'i sıfırla
      } else {
        console.log("Kullanıcı bulunamadı.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // https://twitter-backend-ac6l.onrender.com

  const getTweet = async (token) => {
    try {
      const response = await axios.get(
        "https://twitter-backend-ac6l.onrender.com/api/tweet/",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.filter((prevTweet) => prevTweet.tweetId !== tweetId)
    );
  };
  return (
    <>
      <form className="mt-4 mx-2 md:mx-8  w-[calc(100vw-8rem)]  max-w-[32rem]">
        <div className="flex focus-within:border-b-[1px]">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={user ? user.profilePicture : "../ben.jpg"}
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
            className="mx-3 text-xl pb-10 md:pr-52 outline-none text-left"
          />
          {tweetContent.image && <img src={tweetContent.image} alt="" />}
        </div>
        <div className="flex items-center justify-between  mt-2  md:pl-12 pr-4 pb-4">
          <ul className="flex items-center space-x-2">
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <BsImage className="text-[#1d9bf0] w-4 h-4" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <AiOutlineFileGif className="text-[#1d9bf0] w-5 h-5" />
            </li>
            <li className="flex-none hidden md:block  rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <FaPoll className="text-[#1d9bf0] w-4 h-4 " />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <BsEmojiSmile className="text-[#1d9bf0] w-4 h-4" />
            </li>
            <li className="flex-none rounded-full hidden md:block px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <TbCalendarTime className="text-[#1d9bf0] w-5 h-5" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
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

      {tweets.map((tweet) => {
        return (
          <div key={tweet.tweetId}>
            <Post
              props={tweet}
              token={localUser.token}
              onDelete={handleDeletePost}
              user={user}
            />
          </div>
        );
      })}
    </>
  );
}
