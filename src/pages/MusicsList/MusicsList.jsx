import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import PreviosPage from "../../components/PreviosPage/PreviosPage";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Loader from "../../components/Loader/Loader";

import MusicBox from "../../components/MusicBox/MusicBox";

export default function MusicsList() {
  const [songs, setSongs] = useState([]);
  const [isDatasLoaded, setIsDatasLoadedset] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(`userId`)) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetch("https://65d3889f522627d5010918fd.mockapi.io/song_lists")
      .then((res) => res.json())
      .then((res) => {
        setIsDatasLoadedset(true);
        setSongs(res);
      });
  }, [songs]);

  return (
    <div className="container bg-[#131313] min-h-[100dvh]">
      <PreviosPage />
      <NavigationBar />
      {!isDatasLoaded ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {songs.map((el) => (
            <MusicBox
              key={el.id}
              path={`/play/${el.id}`}
              title={el.title}
              singer={el.singer}
              cover={el.cover}
              genre={el.genre}
            />
          ))}
        </div>
      )}
    </div>
  );
}
