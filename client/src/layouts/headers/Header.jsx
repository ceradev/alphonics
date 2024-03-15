import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { LuLibrary } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { TbMusicSearch } from "react-icons/tb";
import { FaHome, FaUser } from "react-icons/fa";
import { useEffect } from "react";

const Header = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const toogleProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <nav>
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpenMenu ? "true" : "false"}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 ${isOpenMenu ? "hidden" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpenMenu ? "" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center mr-4">
              <img
                className="h-24 w-auto cursor-pointer hover:transition-transform duration-300 hover:transform hover:scale-110"
                src={logo}
                alt="Alphonics Logo"
                onClick={() => window.location.assign("/")}
              />
            </div>
            <div className="hidden sm:flex space-x-4">
              <a
                href="/"
                className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                <FaHome className="h-4 w-4 mr-1" />
                Home
              </a>
              <a
                href="/discover"
                className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                <TbMusicSearch className="h-4 w-4 mr-1" />
                Discover
              </a>
              <a
                href="/library"
                className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                <LuLibrary className="h-4 w-4 mr-1" />
                Library
              </a>
            </div>
          </div>
          {isAuth ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={toogleProfile}
                    className="relative flex rounded-full text-sm hover:transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                    id="user-menu-button"
                    aria-expanded={isOpenProfile ? "true" : "false"}
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <CgProfile className="h-7 w-7 text-gray-300" />
                  </button>
                </div>
                {isOpenProfile && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:text-red-500"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:text-red-500"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:text-red-500"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  onClick={toogleProfile}
                  className="relative flex rounded-full text-smcursor-pointer hover:transition-transform duration-300 hover:transform hover:scale-110"
                  id="user-menu-button"
                  aria-expanded={isOpenProfile ? "true" : "false"}
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <FaUser className="h-7 w-7 text-gray-300" />
                </button>
              </div>
              {isOpenProfile && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <a
                    href="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:text-red-500"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Sign Up
                  </a>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:text-red-500"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Log In
                  </a>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
      <div
        className={`sm:hidden ${isOpenMenu ? "" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/"
            className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            <FaHome className="h-4 w-4 mr-1" />
            Home
          </a>
          <a
            href="/discover"
            className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            <TbMusicSearch className="h-4 w-4 mr-1" />
            Discover
          </a>
          <a
            href="/library"
            className="flex items-center text-gray-300 hover:transition-colors duration-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            <LuLibrary className="h-4 w-4 mr-1" />
            Library
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
