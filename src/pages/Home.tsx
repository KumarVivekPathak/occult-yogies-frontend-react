import React from "react";
import NameAnalysis from "./nameFixing/NameAnalysis";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home : React.FC = () => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");
  console.log("Token : ", token);

  return (
    <div className="bg-red-500 font-sans leading-normal tracking-normal">
      <div className="bg-red-200 w-full p-24 py-24 flex justify-center items-center">
        <NameAnalysis />
      </div>
    </div>
  );
};

export default Home;
