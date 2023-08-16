import React from "react";
import { useEffect } from "react";
import Feed from "../../components/Feed";

const Home = () => {
  return (
    <>
      <div>
        <div className="flex flex-col border-x-[1px]">
          <div className="min-w-[39rem] sm:min-w-[37rem] lg:min-w-[36rem] xl:w-[38rem]">
            <div className="mt-3 ml-1 flex flex-col border-b-[1px]">
              <p className="font-bold text-gray-800 text-xl ml-4">Anasayfa</p>
              <div className="flex mt-5">
                <a
                  href=""
                  className="w-64 px-16 font-semibold text-gray-600 py-3 flex-1 hover:bg-slate-600 hover:bg-opacity-10"
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
