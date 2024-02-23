import React, { useEffect, useState } from "react";

import { adminUsername } from "../../setting/Funcs/funcs";

import { useNavigate } from "react-router-dom";

import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";
import { deleteSong } from "../../setting/Funcs/funcs";
import { deleteSongApi } from "../../setting/Funcs/API";
import { getSongsData } from "../../setting/Funcs/funcs";
import { getSongsDataApi } from "../../setting/Funcs/API";
import { editSongApi } from "../../setting/Funcs/API";
import { editSongData } from "../../setting/Funcs/funcs";
import { getSongData } from "../../setting/Funcs/funcs";
import { getSongDataApi } from "../../setting/Funcs/API";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AdminPanelSideBar from "../../components/AdminPanelSideBar/AdminPanelSideBar";
import PreviosPage from "../../components/PreviosPage/PreviosPage";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { SecondryButton, MainButton } from "../../components/Buttons/Buttons";

export default function Songs() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [songs, setSongs] = useState([]);
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [showConformDeleteModal, setShowConformDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [edittingSongId, setEdittingSongId] = useState("");

  const [edittingSongTitle, setEdittingSongTitle] = useState("");
  const [edittingSongSinger, setEdittingSongSinger] = useState("");
  const [edittingSongGenre, setEdittingSongGenre] = useState("");
  const [edittingSongMusic, setEdittingSongMusic] = useState("");
  const [edittingSongCover, setEdittingSongCover] = useState("");

  useEffect(() => {
    if (edittingSongId) {
      getSongData(getSongDataApi, edittingSongId, (res) => {
        setEdittingSongTitle(res.title);
        setEdittingSongSinger(res.singer);
        setEdittingSongGenre(res.genre);
        setEdittingSongCover(res.cover);
        setEdittingSongMusic(res.src);
      });
    }
  }, [edittingSongId]);

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      const user = JSON.parse(localStorage.getItem(`userId`)).name;

      getUserData(getUserDataApi, user, (res) => {
        if (!res) {
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

  useEffect(() => {
    getSongsData(getSongsDataApi, (res) => {
      let songsArray = Object.entries(res);
      setSongs((prev) => songsArray);
    });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#131313]">
      <PreviosPage />
      {showConformDeleteModal ? (
        <div className="w-screen h-[100dvh] backdrop-blur-md fixed z-50 top-0 right-0 left-0 m-auto flex items-center justify-center">
          <div className="w-[580px] h-[250px] bg-[#1d1d1d] rounded-2xl flex flex-col justify-center items-center text-white font-inter-bold font-bold text-xl">
            <p className="mb-6">Are Sure You Want To Delete The User?</p>
            <div className="flex gap-3">
              <SecondryButton
                clickHandler={(e) => {
                  e.preventDefault();
                  setEdittingSongId("");
                  setShowConformDeleteModal(false);
                }}
                content="Cancel"
              />
              <MainButton
                clickHandler={(e) => {
                  e.preventDefault();
                  setShowLoaderModal(true);
                  deleteSong(deleteSongApi, edittingSongId, () => {
                    setEdittingSongId("");
                    setShowConformDeleteModal(false);
                    getSongsData(getSongsDataApi, (res) => {
                      setShowLoaderModal(false);
                      let songsArray = Object.entries(res);
                      setSongs((prev) => songsArray);
                    });
                  });
                }}
                content="Conform"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
            <div className="relative w-[400px] h-[700px] bg-[#1d1d1d] rounded-2xl">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  setEdittingSongId("");
                  setEdittingSongTitle("");
                  setEdittingSongSinger("");
                  setEdittingSongGenre("");
                  setShowEditModal(false);
                }}
                className="absolute top-2 left-2"
              >
                <IoMdCloseCircleOutline color="#fff" size="1.5em" />
              </button>
              <form className="text-white font-bold font-inter-bold flex flex-col px-10 py-5">
                <label className="mb-3 text-lg" htmlFor="title">
                  Title
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="title"
                  value={edittingSongTitle}
                  onChange={(e) => {
                    setEdittingSongTitle(e.target.value);
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="singer">
                  Singer
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="singer"
                  value={edittingSongSinger}
                  onChange={(e) => {
                    setEdittingSongSinger(e.target.value);
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="genre">
                  Genre
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="genre"
                  value={edittingSongGenre}
                  onChange={(e) => {
                    setEdittingSongGenre(e.target.value);
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="src">
                  Song
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="src"
                  value={edittingSongMusic}
                  onChange={(e) => {
                    setEdittingSongMusic(e.target.value);
                  }}
                />
                <label className="mb-3 text-lg" htmlFor="cover">
                  Cover
                </label>
                <input
                  className="bg-red-600/20 rounded-3xl py-2 px-5 mb-10 border-none outline-none"
                  type="text"
                  id="cover"
                  value={edittingSongCover}
                  onChange={(e) => {
                    setEdittingSongCover(e.target.value);
                  }}
                />

                <input
                  type="submit"
                  className="cursor-pointer rounded-3xl py-2 px-5 bg-red-600/20"
                  onClick={(e) => {
                    e.preventDefault();

                    let songDatas = {
                      title: edittingSongTitle,
                      singer: edittingSongSinger,
                      genre: edittingSongGenre,
                      src: edittingSongMusic,
                      cover: edittingSongCover,
                    };

                    setShowLoaderModal(true);

                    editSongData(editSongApi, songDatas, edittingSongId, () => {
                      setEdittingSongId("");
                      setEdittingSongTitle("");
                      setEdittingSongSinger("");
                      setEdittingSongGenre("");
                      setEdittingSongCover("");
                      setEdittingSongMusic("");
                      setShowEditModal(false);
                      getSongsData(getSongsDataApi, (res) => {
                        setShowLoaderModal(false);
                        let songsArray = Object.entries(res);
                        setSongs((prev) => songsArray);
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
            { title: "Songs", path: "songs" },
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
                  <table className="table-fixed text-white w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-6">#</th>
                        <th className="text-left pb-6">Name</th>
                        <th className="text-left pb-6">Singer</th>
                        <th className="text-left pb-6">Genre</th>
                        <th className="text-left pb-6">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {songs.map((el, index) => (
                        <React.Fragment key={Math.random()}>
                          <tr>
                            <td className="size-[180px] rounded-l-md">
                              <img
                                className="size-full"
                                src={el[1].cover}
                                alt="img"
                              />
                            </td>
                            <td className="p-1.5 pl-5 bg-gray-800">
                              {el[1].title}
                            </td>
                            <td className="p-1.5 bg-gray-800">
                              {el[1].singer}
                            </td>
                            <td className="p-1.5 bg-gray-800">{el[1].genre}</td>
                            <td className="p-1.5 h-[180px] bg-gray-800 rounded-r-md flex items-center justify-start gap-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEdittingSongId(el[0]);
                                  setShowEditModal(true);
                                }}
                              >
                                <MdModeEditOutline size="1.5em" color="#fff" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEdittingSongId(el[0]);
                                  setShowConformDeleteModal(true);
                                }}
                              >
                                <MdDelete size="1.5em" color="#fff" />
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
