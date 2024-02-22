import React, { useEffect, useState } from "react";

import "../../assets/css/output.css";

import { useNavigate } from "react-router-dom";

import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";
import { deleteUser } from "../../setting/Funcs/funcs";
import { deleteUserApi } from "../../setting/Funcs/API";
import { getUsersData } from "../../setting/Funcs/funcs";
import { getUsersDataApi } from "../../setting/Funcs/API";
import { editUserApi } from "../../setting/Funcs/API";
import { editUserData } from "../../setting/Funcs/funcs";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AdminPanelSideBar from "../../components/AdminPanelSideBar/AdminPanelSideBar";
import PreviosPage from "../../components/PreviosPage/PreviosPage";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Users() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [users, setUsers] = useState([]);
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [edittingUserId, setEdittingUserId] = useState("");

  const [edittingUserUsername, setEdittingUserUsername] = useState("");
  const [edittingUserEmail, setEdittingUserEmail] = useState("");
  const [edittingUserPassword, setEdittingUserPassword] = useState("");

  useEffect(() => {
    if (edittingUserId) {
      getUserData(getUserDataApi, edittingUserId, (res) => {
        setEdittingUserUsername(res.username);
        setEdittingUserEmail(res.email);
        setEdittingUserPassword(res.password);
      });
    }
  }, [edittingUserId]);

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      const user = JSON.parse(localStorage.getItem(`userId`)).name;

      getUserData(getUserDataApi, user, (res) => {
        if (!res) {
          navigate("/login");
        } else if (res.username === "alideweb") {
          setShowPage(true);
        } else {
          setShowPage(false);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getUsersData(getUsersDataApi, (res) => {
      let usersArray = Object.entries(res);
      setUsers((prev) => usersArray);
    });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#131313]">
      <PreviosPage />
      {showLoaderModal ? (
        <div className="w-screen h-[100dvh] backdrop-blur-md fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-32 w-32 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        {showEditModal ? (
          <div className="w-screen h-[100dvh] backdrop-blur-md fixed z-50 top-0 right-0 left-0 m-auto flex items-center justify-center">
            <div className="w-96 h-[430px] bg-[#1d1d1d] rounded-2xl">
              <form className="text-white font-bold font-inter-bold flex flex-col px-6 py-3">
                <label className="mb-3 text-lg" htmlFor="username">
                  Username
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="username"
                  value={edittingUserUsername}
                  onChange={(e) => {
                    setEdittingUserUsername(
                      e.target.value.trim().toLowerCase()
                    );
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="email"
                  value={edittingUserEmail}
                  onChange={(e) => {
                    setEdittingUserEmail(e.target.value.trim().toLowerCase());
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="password">
                  Password
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="password"
                  value={edittingUserPassword}
                  onChange={(e) => {
                    setEdittingUserPassword(
                      e.target.value.trim().toLowerCase()
                    );
                  }}
                />

                <input
                  type="submit"
                  className="cursor-pointer rounded-3xl py-2 px-5 bg-red-600/20"
                  onClick={(e) => {
                    e.preventDefault();

                    let userDatas = {
                      username: edittingUserUsername,
                      email: edittingUserEmail,
                      password: edittingUserPassword,
                    };

                    setShowLoaderModal(true);

                    editUserData(editUserApi, userDatas, edittingUserId, () => {
                      setEdittingUserId("");
                      setEdittingUserUsername("");
                      setEdittingUserEmail("");
                      setEdittingUserPassword("");
                      setShowEditModal(false);
                      getUsersData(getUsersDataApi, (res) => {
                        let usersArray = Object.entries(res);
                        setUsers((prev) => usersArray);
                        setShowLoaderModal(false);
                      });
                    });
                  }}
                />
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        <NavigationBar
          itemArray={[
            { title: "Upload", path: "uploadfile" },
            { title: "Users", path: "users" },
          ]}
        />
        {showPage ? (
          <div className="flex justify-center">
            {window.innerWidth < 640 ? (
              <h2 className="text-white font-inter-bold font-bold text-2xl text-center">
                Dear Admin Please Log In with Computer,
                <br />
                This Page Is Not Supported In Phones
              </h2>
            ) : (
              <>
                <div className="hidden lg:block lg:w-1/6">
                  <AdminPanelSideBar />
                </div>
                <div className="w-full lg:w-5/6 px-10">
                  <table className="table-auto text-white w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-6">#</th>
                        <th className="text-left pb-6">Username</th>
                        <th className="text-left pb-6">Email</th>
                        <th className="text-left pb-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((el, index) => (
                        <React.Fragment key={Math.random()}>
                          <tr>
                            <td className="p-1.5 bg-red-500 rounded-l-md">
                              {index + 1}
                            </td>
                            <td className="p-1.5 pl-5 bg-gray-800">
                              {el[1].username}
                            </td>
                            <td className="p-1.5 bg-gray-800">{el[1].email}</td>
                            <td className="p-1.5 bg-gray-800 rounded-r-md flex items-center justify-start gap-2 h-[41px]">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEdittingUserId(el[0]);
                                  setShowEditModal(true);
                                }}
                              >
                                <MdModeEditOutline size="1.2em" color="#fff" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowLoaderModal(true);
                                  deleteUser(deleteUserApi, el[0], () => {
                                    getUsersData(getUsersDataApi, (res) => {
                                      setShowLoaderModal(false);
                                      let usersArray = Object.entries(res);
                                      setUsers((prev) => usersArray);
                                    });
                                  });
                                }}
                              >
                                <MdDelete size="1.2em" color="#fff" />
                              </button>
                            </td>
                          </tr>
                          <br />
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
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
