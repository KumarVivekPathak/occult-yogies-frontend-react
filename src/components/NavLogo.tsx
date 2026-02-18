import React from "react";
import LogoNav from "../assets/logoNav.png";

const NavLogo : React.FC = () => {
    return (
        <div className="flex items-center">
            <img src={LogoNav} alt="logo" className="w-24 h-24 cover" />
            <h1 className="text-lg sm:text-xl md:text-4xl text-center times-new-roman font-bold text-textYellow">Occult Yogis</h1>
        </div>
    );
};

export default NavLogo;