import React, { useEffect, useState } from "react";

import PreviosPage from "../../components/PreviosPage/PreviosPage";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";
import { editUserData } from "../../setting/Funcs/funcs";
import { editUserApi } from "../../setting/Funcs/API";

import { BarChart, Bar, XAxis } from "recharts";

const data = [
  { name: "Pop", uv: 400 },
  { name: "Rock", uv: 200 },
  { name: "Phonk", uv: 150 },
  { name: "Classic", uv: 310 },
  { name: "Country", uv: 170 },
];

export default function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  useEffect(() => {
    getUserData(
      getUserDataApi,
      JSON.parse(localStorage.getItem(`userId`)).name,
      (res) => {
        setUserInfo(res);
      }
    );
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  return (
    <div className="min-h-[100dvh] bg-[#131313]">
      <PreviosPage />
      <div className="container">
        <NavigationBar />
        <div className="flex flex-col lg:flex-row lg:gap-0">
          <div className="lg:w-1/6">
            <div className="size-36 mx-auto">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="img"
                className="size-full"
              />
            </div>
            <h1 className="text-white mt-5 text-2xl">
              {!isNameEditing ? (
                username ? (
                  username
                ) : (
                  `loading...`
                )
              ) : (
                <input
                  className="outline-none py-3 px-5 bg-[#131313] text-white border border-[#FF2E00] mb-3 rounded-2xl font-inter-sem text-lg"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              )}
            </h1>
            <p className="text-white mt-3 text-xl">
              {!isEmailEditing ? (
                email ? (
                  email
                ) : (
                  `loading...`
                )
              ) : (
                <input
                  className="outline-none py-3 px-5 bg-[#131313] text-white border border-[#FF2E00] mb-3 rounded-2xl font-inter-sem text-lg"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              )}
            </p>
            <div className="flex justify-center lg:justify-start lg:flex-col mt-10 items-start gap-4 child:text-white child:py-2 child:px-4 child:border child:border-red-600 child:rounded-xl child-hover:bg-red-600/20 child:transition-all child:flex child:justify-center child:items-center">
              <button
                onClick={(e) => {
                  if (e.target.innerHTML === `Edit Name`) {
                    setIsNameEditing((prev) => true);
                  } else {
                    e.target.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>`;

                    let userData = {
                      username: username,
                      email: email,
                      password: userInfo.password,
                    };

                    editUserData(
                      editUserApi,
                      userData,
                      JSON.parse(localStorage.getItem(`userId`)).name,
                      (res) => {
                        location.reload();
                      }
                    );
                  }
                }}
              >
                {isNameEditing ? `Submit` : `Edit Name`}
              </button>
              <button
                onClick={(e) => {
                  if (e.target.innerHTML === `Edit Email`) {
                    setIsEmailEditing((prev) => true);
                  } else {
                    e.target.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>`;

                    let userData = {
                      username: username,
                      email: email,
                      password: userInfo.password,
                    };

                    editUserData(
                      editUserApi,
                      userData,
                      JSON.parse(localStorage.getItem(`userId`)).name,
                      (res) => {
                        location.reload();
                      }
                    );
                  }
                }}
              >
                {isEmailEditing ? `Submit` : `Edit Email`}
              </button>
            </div>
          </div>
          <div className="lg:w-5/6">
            <p className="text-center text-[#a0a0a0] text-4xl hidden lg:block">
              Welcome{" "}
              <span className="text-white">
                {username ? username : `loading`}
              </span>{" "}
              ...
            </p>
            <div className="flex flex-col lg:pl-14 mt-16">
              <p className="text-white text-2xl font-abel-reg font-bold text-center hidden lg:block">
                You're Interested In:
              </p>
              <div className="lg:mt-5 flex justify-center">
                <BarChart
                  style={{ width: `600px`, height: `300px` }}
                  width={600}
                  height={300}
                  data={data}
                >
                  <XAxis dataKey="name" />
                  <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
