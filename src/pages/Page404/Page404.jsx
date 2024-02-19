import React, { useEffect } from "react";

import { SecondryButton } from "../../components/Buttons/Buttons";

import PreviosPage from "../../components/PreviosPage/PreviosPage";

import { useNavigate } from "react-router-dom";

import img404 from "../../assets/imgs/gifs/img404.png";

export default function Page404() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div
      style={{ height: "100dvh" }}
      className="bg-[#131313] flex justify-center items-center flex-col"
    >
      <PreviosPage />
      <div className="mb-5 w-52 sm:w-auto">
        <img className="size-full" src={img404} alt="img" />
      </div>
      <SecondryButton path="/" content="Main Page" />
    </div>
  );
}
