import React from "react";
import { useEffect } from "react";
import Feed from "../components/Feed";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    } else {
      return navigate("/");
    }
  }, []);
  return (
    <>
      <div className="border-r-[1px]">
        <div className="flex flex-col border-b-[1px] ">
          <div className=" w-[calc(100vw-6rem)]  max-w-[35rem] ">
            <div className="mt-3 ml-1 flex flex-col ">
              <p className="font-bold text-gray-800 text-xl ml-4">Anasayfa</p>
              <div className="flex mt-5">
                <a
                  href=""
                  className="w-64 px-8 md:px-16 font-semibold text-gray-600 py-3 flex-1 hover:bg-slate-600 hover:bg-opacity-10"
                >
                  <p>Sana özel</p>
                </a>
                <a
                  href=""
                  className="w-64 px-14 py-3 flex-1 font-semibold text-gray-600 focus:text-gray-800 hover:bg-slate-600 hover:bg-opacity-10"
                >
                  Takip edilenler
                </a>
              </div>
            </div>
          </div>
        </div>
        <Feed />
      </div>
    </>
  );
};

export default Home;
