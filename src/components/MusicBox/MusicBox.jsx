import React from "react";

import { Link } from "react-router-dom";

export default function MusicBox({ title, cover, singer, genre, path }) {
  return (
    <div className="bg-[#161616] text-white px-4 py-2 rounded-2xl 2xl:w-[350px] 2xl:h-[460px] xl:w-[230px] xl:h-[340px] lg:w-[230px] lg:h-[340px] md:w-[230px] md:h-[340px] sm:w-[230px] sm:h-[340px] w-[280px] h-auto">
      <div className="mx-auto flex justify-center">
        <Link to={path}>
          <img
            className="rounded-2xl overflow-hidden w-[338px]"
            loading="lazy"
            src={cover}
            alt="img"
          />
        </Link>
      </div>
      <h2 className="2xl:text-3xl xl:text-2xl text-lg sm:mb-5 mb-4 mt-2 font-abel-reg tracking-wider line-clamp-1">
        <Link to={path}>{title}</Link>
      </h2>
      <div className="flex flex-col gap-1">
        <span className="text-slate-400">{singer}</span>
        <span className="text-slate-400">{genre}</span>
      </div>
    </div>
  );
}
