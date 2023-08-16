import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Leftbar from "./components/Leftbar";
import Home from "./pages/Home/Home";
import Rightbar from "./components/Rightbar";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <div className="items-start    md:ml-20 min-w-[6rem] md:min-w-[6rem] xl:min-w-[18rem]">
            <Leftbar />
          </div>
          <div className="flex flex-auto justify-between">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Rightbar className="overflow-auto" />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
