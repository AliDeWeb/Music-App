import React, { useEffect, useState } from "react";

import { adminUsername } from "../../setting/Funcs/funcs";

import siteLogo from "../../assets/imgs/primary-imgs/site-logo.png";

import { Link, NavLink } from "react-router-dom";

import { getUserDataApi } from "../../setting/Funcs/API";
import { getUserData } from "../../setting/Funcs/funcs";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

export default function NavigationBar(props) {
  const [userName, setUserName] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      getUserData(
        getUserDataApi,
        JSON.parse(localStorage.getItem(`userId`)).name,
        (res) => {
          if (!res) {
            navigate("/login");
          } else {
            setUserName(res.username);
          }
        }
      );
    }
  }, []);

  return (
    <header>
      <div className="container py-7 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 ml-4 mr-10">
              <Link to="/">
                <img src={siteLogo} alt="img" />
              </Link>
            </div>
            <nav className="text-white hidden lg:flex items-center gap-8 child:transition-all">
              <NavLink
                className={(link) =>
                  link.isActive
                    ? "active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                    : "not-active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={(link) =>
                  link.isActive
                    ? "active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                    : "not-active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                }
                to="/list"
              >
                Songs List
              </NavLink>
              <NavLink
                className={(link) =>
                  link.isActive
                    ? "active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                    : "not-active-page hover:border hover:border-red-600 hover:shadow-lg hover:shadow-zinc-600 rounded px-1 py-0.5"
                }
                to="/aboutus"
              >
                About Us
              </NavLink>
            </nav>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-4">
            {userName === adminUsername ? (
              <button className="py-1 px-4 bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl lg:flex justify-center items-center text-[#FF2E00] hover:bg-[#ff2f001f] hover:text-[#fff] transition-all">
                <Link
                  className="text-white capitalize font-inter-bold font-bold"
                  to="/admin-panel"
                >
                  Panel
                </Link>
              </button>
            ) : (
              ""
            )}
            <button className="py-1 px-10 bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl lg:flex justify-center items-center text-[#FF2E00] hover:bg-[#ff2f001f] hover:text-[#fff] transition-all">
              <Link
                className="text-white capitalize font-inter-bold font-bold"
                to="/dashboard"
              >
                {userName}
              </Link>
            </button>
          </div>
          <div className="lg:hidden">
            <div>
              <RxHamburgerMenu
                onClick={() => {
                  setShowMenu(true);
                }}
                className="text-white"
                size="1.8em"
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            showMenu ? "opacity-1 visible" : "opacity-0 invisible"
          } absolute top-0 bottom-0 right-0 bg-[#131313] w-64 h-[100dvh] rounded-xl border-l-4 px-8 py-4 divide-y-2 transition-all z-50`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <IoClose className="text-white" size="1.5em" />
            </button>
            <div className="py-1.5 px-4 bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl md:flex justify-center items-center text-[#FF2E00] hover:bg-[#ff2f001f] hover:text-[#fff] transition-all">
              <button>
                <Link
                  className="text-white capitalize font-inter-bold font-bold"
                  to="/dashboard"
                >
                  {userName}
                </Link>
              </button>
            </div>
          </div>
          <nav className="text-white mt-3 pt-5 flex flex-col justify-center gap-4">
            <Link className="px-1 py-0.5" to="/">
              Home
            </Link>
            <Link className="px-1 py-0.5" to="/list">
              Songs List
            </Link>
            <Link className="px-1 py-0.5" to="/aboutus">
              About Us
            </Link>
            {userName === adminUsername ? (
              <Link className="px-1 py-0.5" to="/admin-panel">
                Panel
              </Link>
            ) : (
              ""
            )}
            {props.itemArray
              ? props.itemArray.map((el) => (
                  <Link
                    key={Math.random()}
                    className="px-1 py-0.5"
                    to={`/${el.path}`}
                  >
                    {el.title}
                  </Link>
                ))
              : ""}
          </nav>
        </div>

        <div
          className={`${
            showMenu ? "opacity-1 visible" : "opacity-0 invisible"
          } w-screen h-[100dvh] fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm transition-all duration-300`}
        ></div>
      </div>
    </header>
  );
}
