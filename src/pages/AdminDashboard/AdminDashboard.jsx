import React, { useEffect, useState } from "react";

import { adminUsername } from "../../setting/Funcs/funcs";

import { useNavigate } from "react-router-dom";
import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import AdminPanelSideBar from "../../components/AdminPanelSideBar/AdminPanelSideBar";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

import { SecondryButton } from "../../components/Buttons/Buttons";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      const user = JSON.parse(localStorage.getItem(`userId`)).name;

      getUserData(getUserDataApi, user, (res) => {
        if (!res) {
          console.log(res);
          navigate("/login");
        } else if (res.username === adminUsername) {
          setShowPage(true);
        } else {
          setShowPage(false);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#131313]">
      <PreviosPage />
      <div className="container">
        <NavigationBar
          itemArray={[
            { title: "Upload", path: "uploadfile" },
            { title: "Users", path: "users" },
          ]}
        />
        {showPage ? (
          <div className="flex">
            <div className="hidden lg:block lg:w-1/6">
              <AdminPanelSideBar />
            </div>
            <div className="w-full lg:w-5/6">
              <h1 className="text-white font-inter-bold font-bold text-3xl text-center mt-5">
                Welcome Dear Admin...
              </h1>
              <div className="px-8 mt-5 flex flex-wrap justify-center items-center gap-5">
                <SecondryButton content="Home" path="/" />
                <SecondryButton content="Upload Song" path="/uploadfile" />
                <SecondryButton content="Users List" path="/users" />
                <SecondryButton content="Songs List" path="/" />
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-white font-inter-bold font-bold text-2xl text-center">
            You Don't Have Access To This Page
          </h2>
        )}
      </div>
    </div>
  );
}
