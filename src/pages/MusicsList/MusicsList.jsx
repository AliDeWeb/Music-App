import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function MusicsList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://65d3889f522627d5010918fd.mockapi.io/song_lists")
      .then((res) => res.json())
      .then((res) => setSongs(res));
  }, [songs]);

  return (
    <div className="container bg-[#131313] min-h-[100dvh]">
      <div className="w-full lg:w-4/5 mx-auto">
        {window.innerWidth > 1024 ? (
          <table className="font-inter-sem border-separate border-spacing-5 table-fixed text-white w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Cover</th>
                <th>Song</th>
                <th>Singer</th>
                <th>Gener</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td className="text-center">{song.id}</td>
                  <td>
                    <Link to={`/play/${song.id}`}>
                      <img
                        src={song.cover}
                        alt="img"
                        width="80"
                        height="80"
                        className="mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="text-center font-inter-bold font-bold text-lg">
                    <Link to={`/play/${song.id}`}>{song.title}</Link>
                  </td>
                  <td className="text-center">{song.singer}</td>
                  <td className="text-center">{song.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : window.innerWidth > 768 ? (
          <table className="font-inter-sem border-separate border-spacing-5 table-fixed text-white w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Cover</th>
                <th>Song</th>
                <th>Singer</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td className="text-center">{song.id}</td>

                  <td>
                    <Link to={`/play/${song.id}`}>
                      <img
                        src={song.cover}
                        alt="img"
                        width="80"
                        height="80"
                        className="mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="text-center font-inter-bold font-bold text-lg">
                    <Link to={`/play/${song.id}`}>{song.title}</Link>
                  </td>
                  <td className="text-center">{song.singer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="font-inter-sem border-separate border-spacing-5 table-fixed text-white w-full">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Song</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td>
                    <Link to={`/play/${song.id}`}>
                      <img
                        src={song.cover}
                        alt="img"
                        width="80"
                        height="80"
                        className="mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="text-center font-inter-bold font-bold text-lg">
                    <Link to={`/play/${song.id}`}>{song.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
