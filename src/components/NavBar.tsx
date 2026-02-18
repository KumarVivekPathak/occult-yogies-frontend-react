import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../service/APIFunctions";
import { useUser } from "../context/userContext";
import { ChevronRight } from "lucide-react";
import NavLogo from "./NavLogo";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";

const NavBar = () => {
  const { userData } = useUser();

  const user = {
    name: userData?.name || "",
    subscriptionType: "Pro",
    userId: userData?.email || "",
  };
  const userInitial = user.name.charAt(0).toUpperCase();

  const [showNumerologyDropdown, setShowNumerologyDropdown] = useState(false);
  const [showRemedialDropdown, setShowRemedialDropdown] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileNumerologyDropdown, setShowMobileNumerologyDropdown] =
    useState(false);
  const [showCrystalDropdown, setShowCrystalDropdown] = useState(false);

  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true); // scrolling up
      } else {
        setShowNavbar(false); // scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await Logout();
      console.log("Logout successful", response);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`fixed w-full  bg-darkPurple shadow-xl z-10 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className=" mx-auto px-10 h-16 flex justify-between items-center">
        <section className="flex-shrink-0">
          <NavLogo />
        </section>

        <section className="flex space-x-6 items-center h-full">
          <div
            className="relative h-full"
            onMouseEnter={() => setShowNumerologyDropdown(true)}
            onMouseLeave={() => setShowNumerologyDropdown(false)}
            onClick={() => setShowNumerologyDropdown(true)}
          >
            <span className="text-textYellow h-full hover:text-bgYellow mx-3 flex items-center rounded-md text-lg font-medium">
              Numerology
            </span>
            {showNumerologyDropdown && (
              <div className="absolute flex flex-col right-2 w-64 bg-darkPurple border-3 border-grey rounded-md shadow-lg py-2 gap-2 z-10">
                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/name-fixing"
                >
                  Name Fixing
                  <ChevronRight />
                </Link>
                <div
                  className="relative group"
                  onMouseLeave={() => setShowMobileNumerologyDropdown(false)}
                >
                  <div
                    className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between cursor-pointer"
                    onMouseEnter={() => setShowMobileNumerologyDropdown(true)}
                    onClick={() =>
                      setShowMobileNumerologyDropdown(
                        !showMobileNumerologyDropdown
                      )
                    }
                  >
                    Mobile Numerology
                    <ChevronRight />
                  </div>
                  {showMobileNumerologyDropdown && (
                    <div
                      className="absolute bg-purple top-0 left-full w-72 border-3 border-grey rounded-md shadow-lg py-2 z-10"
                      onMouseEnter={() => setShowMobileNumerologyDropdown(true)}
                      onMouseLeave={() =>
                        setShowMobileNumerologyDropdown(false)
                      }
                    >
                      <Link
                        className="p-6 py-2 text-textYellow hover:text-bgYellow flex items-center justify-between hover:cursor-pointer"
                        to="/mobile-numerology"
                      >
                        Basic Mobile Numerology
                        <ChevronRight />
                      </Link>
                      <Link
                        className="px-6 py-2 text-textYellow hover:text-bgYellow flex items-center justify-between hover:cursor-pointer"
                        to="/advance-mobile-numerology"
                      >
                        Advanced Mobile Numerology
                        <ChevronRight />
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/loshu-grid-mastery"
                >
                  Loshu Grid Mastery
                  <ChevronRight />
                </Link>

                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/match-loshu"
                >
                  Match Loshu
                  <ChevronRight />
                </Link>

                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/match-vedic"
                >
                  Match Vedic
                  <ChevronRight />
                </Link>
              </div>
            )}
          </div>

          <div
            className="relative h-full"
            onMouseEnter={() => setShowRemedialDropdown(true)}
            onMouseLeave={() => setShowRemedialDropdown(false)}
            onClick={() => setShowRemedialDropdown(true)}
          >
            <span className="text-textYellow h-full hover:text-bgYellow mx-3 flex items-center rounded-md text-lg font-medium">
              Remedial
            </span>
            {showRemedialDropdown && (
              <div className="absolute flex flex-col right-2 w-64 bg-darkPurple border-2 border-grey rounded-md shadow-lg py-2 gap-2 z-10">
                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/vedic-switch-word"
                >
                  Vedic Switchword
                  <ChevronRight />
                </Link>

                <Link
                  className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between"
                  to="/divine-healing-codes"
                >
                  Divine Healing Codes
                  <ChevronRight />
                </Link>

                <div
                  className="relative group"
                  onMouseLeave={() => setShowCrystalDropdown(false)}
                >
                  <div
                    className="px-6 text-textYellow hover:text-bgYellow flex items-center justify-between cursor-pointer"
                    onMouseEnter={() => setShowCrystalDropdown(true)}
                    onClick={() => setShowCrystalDropdown(!showCrystalDropdown)}
                  >
                    Crystal
                    <ChevronRight />
                  </div>
                  {showCrystalDropdown && (
                    <div
                      className="absolute bg-purple top-0 left-full w-56 border-3 border-grey rounded-md shadow-lg py-2 z-10"
                      onMouseEnter={() => setShowCrystalDropdown(true)}
                      onMouseLeave={() => setShowCrystalDropdown(false)}
                    >
                      <Link
                        className="p-6 py-2 text-textYellow hover:text-bgYellow flex items-center justify-between hover:cursor-pointer"
                        to="/crystal-intermediate"
                      >
                        Intermediate Crystal
                        <ChevronRight />
                      </Link>
                      <Link
                        className="px-6 py-2 text-textYellow hover:text-bgYellow flex items-center justify-between hover:cursor-pointer"
                        to="/crystal-advanced"
                      >
                        Advanced Crystal
                        <ChevronRight />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className="relative h-full "
            onMouseEnter={() => setShowReportsDropdown(true)}
            onMouseLeave={() => setShowReportsDropdown(false)}
          >
            <span className="text-textYellow h-full hover:text-bgYellow mx-3 flex items-center rounded-md text-lg font-medium">
              Reports
            </span>
            {showReportsDropdown && (
              // <div className="absolute flex flex-row right-2 p-auto m-auto w-max bg-darkPurple border border-gray-200 rounded-md shadow-lg py-2 gap-2 z-10 ">
              <div className="absolute flex flex-row right-2 p-auto m-auto w-max bg-darkPurple border-3 border-button rounded-md shadow-lg py-2 gap-2 z-10 ">
                <section>
                  <span className="block px-6 text-left text-textYellow">
                    Numerology
                  </span>
                  <ul className="list-disc pl-10 pr-4 py-1 text-left text-textYellow">
                    <li>
                      <Link
                        to="/name-fixing"
                        className="py-1 hover:text-bgYellow"
                      >
                        Name Fixing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mobile-numerology/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Mobile Numerology
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/loshu-grid/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Loshu Grid
                      </Link>
                    </li>
                  </ul>
                </section>

                <section>
                  <span className="block px-6 text-textYellow text-left">
                    Remidial
                  </span>
                  <ul className="list-disc pl-10 pr-4 py-1 text-textYellow text-left ">
                    <li>
                      <Link
                        to="/vedic-switchword/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Vedic Switchword
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/divine-healing-codes/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Divine Healing Codes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/crystal-intermediate/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Crystal Intermediate
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/crystal-advanced/list"
                        className="py-1 hover:text-bgYellow"
                      >
                        Crystal Advanced
                      </Link>
                    </li>
                  </ul>
                </section>

                <section>
                  <span className="block px-6 text-textYellow text-left">
                    Others
                  </span>
                  <ul className="list-disc pl-10 pr-4 py-1 text-textYellow text-left ">
                    <li>
                      <Link to="/" className="py-1 hover:text-bgYellow">
                        Yet to come
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
            )}
          </div>

          <div
            className="relative flex h-full items-center justify-center "
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-bgYellow text-darkPurple rounded-full font-bold text-lg">
              {userInitial}
            </div>
            {showProfileDropdown && (
              <div className="absolute z-10 right-0 top-full px-2 bg-darkPurple border border-gray-200 rounded-md shadow-lg py-1 ">
                <article className="flex flex-row items-center justify-between gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-bgYellow text-darkPurple rounded-full font-bold text-lg">
                    {userInitial}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-bgYellow bg-textYellow px-2 py-1 rounded-md">
                      {user.subscriptionType}
                    </span>
                    <span className="text-bgYellow">{user.userId}</span>
                  </div>
                </article>
                <hr className="my-2 border-gray-200" />
                <ol className="flex flex-col list-disc pl-2 pr-4 py-1 text-textYellow justify-start items-start ">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-textYellow py-1 hover:text-bgYellow"
                  >
                    <FaRegCircleUser size={20} /> Profile
                  </Link>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-textYellow py-1 hover:text-bgYellow"
                  >
                    <AiOutlineLogout size={20} /> Logout
                  </Link>
                </ol>
              </div>
            )}
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
