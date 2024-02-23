import React, { useEffect, useState } from "react";

import { adminUsername } from "../../setting/Funcs/funcs";

import { MainButton } from "../../components/Buttons/Buttons";

import { postSongData } from "../../setting/Funcs/funcs";
import { postSongDataApi } from "../../setting/Funcs/API";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../setting/Funcs/funcs";
import { getUserDataApi } from "../../setting/Funcs/API";

export default function UploadSong() {
  const [songName, setSongName] = useState("");
  const [songGener, setsongGener] = useState("");
  const [songCover, setSongCover] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songSinger, setSongSinger] = useState("");

  const [showPage, setShowPage] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="bg-[#131313] min-h-[100dvh]">
      <div className="container">
        {showPage ? (
          <>
            <div className="flex items-center justify-center flex-col">
              <form className="flex flex-col justify-center items-center w-[400px]">
                <label
                  className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start sm:w-full"
                  htmlFor="songName"
                >
                  Song Name:
                </label>
                <input
                  className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg sm:w-full"
                  id="songName"
                  type="text"
                  placeholder="Dancin"
                  value={songName}
                  onChange={(e) => {
                    setSongName(e.target.value);
                  }}
                />
                <label
                  className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start sm:w-full"
                  htmlFor="songSinger"
                >
                  Song Singer:
                </label>
                <input
                  className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg sm:w-full"
                  id="songSinger"
                  type="text"
                  placeholder="H..."
                  value={songSinger}
                  onChange={(e) => {
                    setSongSinger(e.target.value);
                  }}
                />
                <label
                  className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start sm:w-full"
                  htmlFor="songGener"
                >
                  Song Gener:
                </label>
                <input
                  className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg sm:w-full"
                  id="songGener"
                  type="text"
                  placeholder="Pop"
                  value={songGener}
                  onChange={(e) => {
                    setsongGener(e.target.value);
                  }}
                />
                <label
                  className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start sm:w-full"
                  htmlFor="cover"
                >
                  Cover Url:
                </label>
                <input
                  className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg sm:w-full"
                  id="cover"
                  type="text"
                  placeholder="https://example"
                  value={songCover}
                  onChange={(e) => {
                    setSongCover(e.target.value);
                  }}
                />
                <label
                  className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start sm:w-full"
                  htmlFor="song"
                >
                  Song Url:
                </label>
                <input
                  className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg sm:w-full"
                  id="song"
                  type="text"
                  placeholder="https://example"
                  value={songUrl}
                  onChange={(e) => {
                    setSongUrl(e.target.value);
                  }}
                />

                <MainButton
                  content="Submit"
                  clickHandler={(e) => {
                    e.preventDefault();

                    let songData = {
                      title: songName,
                      genre: songGener,
                      src: songUrl,
                      cover: songCover,
                      singer: songSinger,
                    };

                    postSongData(postSongDataApi, songData, (res) => {
                      if (res) {
                        navigate("/list");
                      }
                    });
                  }}
                />
              </form>
            </div>
          </>
        ) : (
          <h2 className="text-white font-inter-bold font-bold text-2xl text-center">
            You Don't Have Access To This Page
          </h2>
        )}
      </div>
    </div>
  );
}
