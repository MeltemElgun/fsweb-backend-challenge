import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Leftbar from "./components/Leftbar";
import Home from "./pages/Home";
import Rightbar from "./components/Rightbar";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import PProfile from "./pages/PProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <div className="items-start border-r-[1px]  md:ml-[1rem] lg:ml-[3rem]  min-w-[6rem] md:min-w-[6rem] xl:min-w-[19rem]">
            <Leftbar />
          </div>
          <div className="flex  flex-col justify-between border-r-[1px]  ">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pprofile" element={<PProfile />} />
            </Routes>{" "}
          </div>
          <Rightbar className="overflow-auto" />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
