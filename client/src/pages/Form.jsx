import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import { TbCalendarTime } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { RiEarthFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [tweetContent, setTweetContent] = useState({
    content: "",
    image: "",
    userId: null,
  });
  const [user, setUser] = useState(null);

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

  return (
    <>
      <form className="mx-1  md:mx-8  ">
        <div className="flex items-center justify-between">
          <button>
            <IoCloseOutline className="w-6 h-6" />
          </button>
          <p className="text-right rounded-full px-3 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 hover:text-blue  text-[#1d9cf0c7] font-bold">
            Taslaklar
          </p>
        </div>
        <div className="flex mt-8 mb-16">
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
            className="mx-1 text-xl pb-2  pr-52 outline-none text-left"
          />
          {tweetContent.image && <img src={tweetContent.image} alt="" />}
        </div>
        <div className="flex items-center">
          <RiEarthFill className=" text-[#1d9cf0c7]" />
          <button className="  rounded-full text-sm px-3 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 hover:text-blue  text-[#1d9cf0c7] font-bold">
            Herkes yanıtlayabilir
          </button>
        </div>
        <div className="flex border-t-[1px]  items-center justify-between  mt-2  pr-4 py-3">
          <ul className="flex items-center space-x-2">
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <BsImage className="text-[#1d9bf0] w-4 h-4" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <AiOutlineFileGif className="text-[#1d9bf0] w-5 h-5" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <FaPoll className="text-[#1d9bf0] w-4 h-4" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <BsEmojiSmile className="text-[#1d9bf0] w-4 h-4" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <TbCalendarTime className="text-[#1d9bf0] w-5 h-5" />
            </li>
            <li className="flex-none rounded-full px-2 py-1 hover:bg-[#1d9cf01e] hover:bg-opacity-10 ">
              <IoLocationSharp className="text-[#1d9bf0] w-5 h-5" />
            </li>
          </ul>

          <button
            onClick={handleTweet}
            type="submit"
            className="bg-blue-300 text-white py-[0.40rem] px-4 rounded-full font-bold"
            // disabled={!tweetContent.trim()} // Disable button when tweetContent is empty or whitespace only
          >
            Gönder
          </button>
        </div>{" "}
      </form>
    </>
  );
}
