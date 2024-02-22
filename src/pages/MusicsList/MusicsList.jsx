import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import PreviosPage from "../../components/PreviosPage/PreviosPage";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Loader from "../../components/Loader/Loader";

import MusicBox from "../../components/MusicBox/MusicBox";

import { getSongsDataApi } from "../../setting/Funcs/API";
import { getSongsData } from "../../setting/Funcs/funcs";

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
    getSongsData(getSongsDataApi, (res) => {
      const songs = Object.entries(res);
      setSongs(songs);
      setIsDatasLoadedset(true);
    });
  }, []);

  return (
    <div className="bg-[#131313]">
      <div className="container min-h-[100dvh]">
        <PreviosPage />
        <NavigationBar />
        {!isDatasLoaded ? (
          <Loader />
        ) : (
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {songs.map((el) => (
              <MusicBox
                key={Math.random()}
                path={`/play/${el[0]}`}
                title={el[1].title}
                singer={el[1].singer}
                cover={el[1].cover}
                genre={el[1].genre}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
