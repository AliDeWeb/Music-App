import React, { useEffect, useState, useMemo } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

export default function Player() {
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://65d3889f522627d5010918fd.mockapi.io/song_lists/${param.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          navigate(-1);
        }
      })
      .then((res) => {
        setSongData({
          title: res.title,
          singer: res.singer,
          src: res.src,
          cover: res.cover,
        });
      });
  }, []);

  const [songData, setSongData] = useState({});

  return (
    <div
      style={{ height: "100dvh" }}
      className="container bg-[#131313] flex justify-end sm:justify-center items-center flex-col"
    >
      <PreviosPage />
      <div className="rounded-xl overflow-hidden mb-5 shadow-md shadow-slate-700 w-[240px] sm:w-[340px]">
        <img src={songData?.cover} alt="img" />
      </div>
      <h1 className="text-white font-inter-bold text-2xl mb-2">
        {songData?.title}
      </h1>
      <span className="text-white font-inter-reg text-sm">
        {songData?.singer}
      </span>
      <AudioPlayer className="audio-player" src={songData?.src} />
    </div>
  );
}
