import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://twitter-backend-ac6l.onrender.com/api/auth/login";

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          API_URL,
          {
            username: userData.username,
            passhash: userData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data)),
            console.log(JSON.stringify(response.data));
        });
      navigate("/");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <form
      onSubmit={handleLogIn}
      className="min-w-[20rem] max-h-48 sm:min-w-[35rem]  lg:min-w-[38rem]  mt-3 ml-10 flex flex-col border-2  rounded-l p-20  px-4 pt-5 pb-4 sm:p-6 sm:pb-9  items-center justify-center min-h-[28rem] bg-gray-100    rounded-md shadow-md w-full max-w-sm"
    >
      {/* <img src="/icons/twitter.png" alt="" /> */}

      <h1 className=" w-full mb-2 px-3 py-2">Tweter'a giriş yap</h1>

      <input
        type="text"
        placeholder="Kullanıcı adı"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      <input
        type="password"
        placeholder="Şifre"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      <button
        className="w-full bg-blue-500 text-white rounded-full py-2 px-4 text-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
        type="submit"
        disabled={!userData.username || !userData.password}
      >
        Giriş yap
      </button>

      <div className="mt-4 text-sm text-gray-600">
        Henüz bir hesabınız yokmu?{" "}
        <span
          class="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </div>
    </form>
  );
}
