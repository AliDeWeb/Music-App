import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Loader from "../../components/Loader/Loader";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

import FloatAlert from "../../components/FloatAlert/FloatAlert";

export default function Player() {
  const param = useParams();
  const navigate = useNavigate();

  const [musicId, setMusicId] = useState(param.id);
  const [songData, setSongData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(`userId`)) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetch(`https://65d3889f522627d5010918fd.mockapi.io/song_lists/${musicId}`)
      .then((res) => {
        if (res.ok === true) {
          return res.json();
        } else {
          navigate("/play/1");
          setMusicId("1");
        }
      })
      .then((res) => {
        setSongData({
          title: res.title,
          singer: res.singer,
          src: res.src,
          cover: res.cover,
        });

        setIsDataLoaded(true);
      });
  }, [musicId]);

  useEffect(() => {
    setIsDataLoaded(false);
    navigate(`/play/${musicId}`);
  }, [musicId]);

  return (
    <div
      style={{ height: "100dvh" }}
      className="container bg-[#131313] flex justify-end sm:justify-center items-center flex-col"
    >
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
              setMusicId(String(+param.id + 1));
            }}
            onClickPrevious={() => {
              if (!(+param.id === 1)) {
                setMusicId(String(+param.id - 1));
              } else {
                return false;
              }
            }}
          />
        </>
      )}
    </div>
  );
}
