import React, { useEffect, useState } from "react";

import siteLogo from "../../assets/imgs/primary-imgs/site-logo.png";

import { Link, NavLink } from "react-router-dom";

import { getUserDataApi } from "../../setting/Funcs/API";
import { getUserData } from "../../setting/Funcs/funcs";

export default function NavigationBar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUserData(
      getUserDataApi,
      JSON.parse(localStorage.getItem(`userId`)).name,
      (res) => {
        setUserName(res.username);
      }
    );
  }, []);

  return (
    <header>
      <div className="container py-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 ml-4 mr-3">
              <Link to="/">
                <img src={siteLogo} alt="img" />
              </Link>
            </div>
            <nav className="text-white flex items-center gap-5">
              <NavLink
                className={(link) =>
                  link.isActive ? "active-page" : "not-active-page"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={(link) =>
                  link.isActive ? "active-page" : "not-active-page"
                }
                to="/list"
              >
                Songs List
              </NavLink>
              <NavLink
                className={(link) =>
                  link.isActive ? "active-page" : "not-active-page"
                }
                to="/uploadfile"
              >
                Upload Song
              </NavLink>
              <NavLink
                className={(link) =>
                  link.isActive ? "active-page" : "not-active-page"
                }
                to="/aboutus"
              >
                About Us
              </NavLink>
            </nav>
          </div>
          <div className="py-1 px-10 bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl flex justify-center items-center text-[#FF2E00] hover:bg-[#ff2f001f] hover:text-[#fff] transition-all">
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
      </div>
    </header>
  );
}
