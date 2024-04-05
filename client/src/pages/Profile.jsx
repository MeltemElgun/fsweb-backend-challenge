import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiArrowLeft } from "react-icons/tfi";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfilePost from "../components/ProfilPost";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState(null);

  const [tweets, setTweets] = useState([]);
  const tweetsLength = tweets.length;
  const navigate = useNavigate();

  const formattedDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    : "";
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    } else {
      fetchData();
      return navigate("/profile");
    }
  }, []);

  const localUser = JSON.parse(localStorage.getItem("user"));
  const UserImageIcon = ({ imageUrl, size }) => {
    if (imageUrl === "") {
      return (
        <div
          className={`w-9 h-9 object-contain ${
            size === "big" && "!w-28 !h-28"
          }`}
        >
          <img
            className="w-full h-full rounded-full"
            src={<IoPerson />}
            alt="default user"
          />
        </div>
      );
    } else {
      return (
        <div
          className={`w-9 h-9 object-contain ${
            size === "big" && "!w-28 !h-28"
          }`}
        >
          <img
            className="w-full h-full rounded-full"
            src={imageUrl}
            alt="user"
          />
        </div>
      );
    }
  };
  const fetchData = async () => {
    try {
      if (localUser.username) {
        const response = await axios.get(
          `https://twitter-backend-ac6l.onrender.com/api/user/${localUser.username}`,
          {
            headers: {
              Authorization: localUser.token,
            },
          }
        );

        setUserData(response.data);
        getTweet(response.data.username);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getTweet = async (username) => {
    try {
      const response = await axios.get(
        `https://twitter-backend-ac6l.onrender.com/api/tweet/${username}`,
        {
          headers: {
            Authorization: localUser.token,
          },
        }
      );
      setTweets(response.data.reverse());
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
      <div className="flex flex-col md:min-w-[39rem] sm:min-w-[32rem] lg:min-w-[40rem] xl:w-[38rem]  border-r-[1px]  lg:basis-full  basis-full ">
        <div className=" basis-full  ">
          <div className="flex">
            <button className="px-6 " onClick={() => navigate(-1)}>
              <TfiArrowLeft />
            </button>
            <div className=" flex flex-col px-2 py-2 ">
              <div className="flex ">
                <div className="font-bold text-xl">{userData?.username}</div>
                <IoIosLock className="my-2 mx-1" />
              </div>
              <h4 className="  font-normal  text-gray-500 text-sm leading-tight">
                {" "}
                {tweetsLength} gönderi
              </h4>
            </div>
          </div>
          <div>
            <img
              className=" w-full h-[200px] object-cover bg-blue-400"
              src={userData?.profilePicture}
              alt=""
            />

            <section>
              {/* user image section */}
              <div className="flex justify-between mx-6 h-14 mb-4">
                <div className="relative -translate-y-[50%] border-white   border-4 rounded-full w-fit h-fit">
                  <UserImageIcon
                    imageUrl={userData?.profilePicture}
                    size="big"
                  />
                </div>
                <div className="my-2   h-fit py-2 px-6 rounded-3xl bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm cursor-pointer hover:bg-gray-200">
                  Profili Düzenle
                </div>
              </div>
              {/* user info section */}
              <div className="mx-6">
                <div className="flex">
                  <h3 className="font-bold text-lg leading-tight">
                    {userData?.name}
                  </h3>
                  <IoIosLock className="my-1 mx-1" />
                </div>
                <h4 className="font-normal  text-gray-500 text-sm leading-tight">
                  @{userData?.username}
                </h4>
              </div>
              <div className="flex m-6  ">
                <IoCalendarOutline />
                <h4 className="font-normal  mx-2 text-gray-500 text-sm leading-tight">
                  {formattedDate && `${formattedDate} tarihinde katıldı`}
                </h4>
              </div>
              <div className="flex m-3 font-normal mx-2  text-gray-500 text-sm leading-tight ">
                <h4 className="px-4">Takip edilen</h4>
                <h4 className="px-4"> Takipci</h4>
              </div>
            </section>

            <div className="flex mt-5 leading-tight">
              <a
                href=""
                className=" pl-6  font-medium text-gray-600 py-3 flex-1 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Gönderiler</p>
              </a>
              <a
                href=""
                className="  py-3 flex-1  font-medium text-gray-600 focus:text-gray-800 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Yanıtlar</p>
              </a>
              <a
                href=""
                className="   font-medium text-gray-600 py-3 flex-1 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Öne Çıkanlar</p>
              </a>
              <a
                href=""
                className="pl-6 py-3 flex-1 font-medium text-gray-600 focus:text-gray-800 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Makaleler</p>
              </a>
              <a
                href=""
                className="font-medium text-gray-600 py-3 flex-1 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Medya</p>
              </a>
              <a
                href=""
                className="  py-3 flex-1 font-medium text-gray-600 focus:text-gray-800 hover:bg-slate-600 hover:bg-opacity-10"
              >
                <p>Beğeni</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {tweets.map((tweet) => (
        <ProfilePost
          key={tweet.tweetId}
          props={tweet}
          onDelete={handleDeletePost}
          token={localUser.token}
          userData={userData}
        />
      ))}
    </>
  );
};

export default Profile;
