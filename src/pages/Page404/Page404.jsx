import React from "react";

import { SecondryButton } from "../../components/Buttons/Buttons";

export default function Page404() {
  return (
    <div
      style={{ height: "100dvh" }}
      className="bg-[#131313] flex justify-center items-center flex-col"
    >
      <div className="mb-5 w-52 sm:w-auto">
        <img
          className="size-full"
          src="src\assets\imgs\gifs\404.png"
          alt="img"
        />
      </div>
      <SecondryButton path="/" content="Main Page" />
    </div>
  );
}
