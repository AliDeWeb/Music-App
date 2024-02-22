import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import AdminPanelSideBar from "../../components/AdminPanelSideBar/AdminPanelSideBar";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      const user = JSON.parse(localStorage.getItem(`userId`)).name;

      getUserData(getUserDataApi, user, (res) => {
        if (res.username === "alideweb") {
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
        <NavigationBar itemArray={[{ title: "Upload", path: "uploadfile" }]} />
        {showPage ? (
          <div className="flex">
            <div className="hidden lg:block lg:w-1/6">
              <AdminPanelSideBar />
            </div>
            <div className="w-full lg:w-5/6">
              <h1 className="text-white font-inter-bold font-bold text-3xl text-center mt-5">
                Welcome Dear Admin...
              </h1>
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
