import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Loader from "../../components/Loader/Loader";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

import FloatAlert from "../../components/FloatAlert/FloatAlert";

import { getSongsData } from "../../setting/Funcs/funcs";
import { getSongsDataApi } from "../../setting/Funcs/API";
import { getSongData } from "../../setting/Funcs/funcs";
import { getSongDataApi } from "../../setting/Funcs/API";

export default function Player() {
  const param = useParams();
  const navigate = useNavigate();

  const [musicId, setMusicId] = useState(param.id);
  const [songData, setSongData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [songs, setSongs] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);

  useEffect(() => {
    if (!localStorage.getItem(`userId`)) {
      navigate("/login");
    }

    getSongsData(getSongsDataApi, (res) => {
      setSongs(Object.entries(res));
    });
  }, []);

  useEffect(() => {
    let currentsongIndex = songs.findIndex((el) => el[0] === musicId);
    setCurrentMusicIndex(currentsongIndex);
  });

  useEffect(() => {
    getSongData(getSongDataApi, musicId, (res) => {
      if (!res) {
        navigate("/list");
      } else {
        setSongData({
          title: res.title,
          singer: res.singer,
          src: res.src,
          cover: res.cover,
        });

        setIsDataLoaded(true);
      }
    });
  }, [musicId]);

  useEffect(() => {
    setIsDataLoaded(false);
    navigate(`/play/${musicId}`);
  }, [musicId]);

  return (
    <div className="bg-[#131313]">
      <div className="container h-[100dvh] flex justify-end sm:justify-center items-center flex-col">
        {!isDataLoaded ? (
          <div className="mb-5">
            <Loader />
          </div>
        ) : (
          <>
            <PreviosPage path="/list" />
            <div className="rounded-xl overflow-hidden mb-5 shadow-md shadow-slate-700 w-[240px] sm:w-[340px]">
              <img src={songData?.cover} alt="img" />
            </div>
            <h1 className="text-white font-inter-bold text-2xl mb-2">
              {songData?.title}
            </h1>
            <span className="text-white font-inter-reg text-sm">
              {songData?.singer}
            </span>
            <AudioPlayer
              showSkipControls
              showDownloadProgress={false}
              showJumpControls={false}
              onPlayError={() => <FloatAlert type="error" content="Error!" />}
              className="audio-player"
              src={songData?.src}
              onClickNext={() => {
                if (currentMusicIndex === songs.length - 1) {
                  return false;
                } else {
                  setMusicId(songs[currentMusicIndex + 1][0]);
                }
              }}
              onClickPrevious={() => {
                if (!(+param.id === 1)) {
                  if (currentMusicIndex === 0) {
                    return false;
                  } else {
                    setMusicId(songs[currentMusicIndex - 1][0]);
                  }
                } else {
                  return false;
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
