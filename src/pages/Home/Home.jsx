import React, { useEffect } from "react";

import { MainButton, SecondryButton } from "../../components/Buttons/Buttons";

import Typewriter from "typewriter-effect";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      navigate("/list");
    }
  });

  return (
    <div
      style={{ height: "100dvh" }}
      className="container bg-[#131313] relative"
    >
      <div className="absolute right-0 left-0 bottom-8 md:bottom-0 md:top-0 mx-auto flex justify-center items-center flex-col">
        <h1 className="text-white text-4xl font-inter-sem mb-10">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  `Dancing between <br> The shadows <br> Of rhythm...`
                )

                .pauseFor(500)

                .start();
            }}
          />
        </h1>
        <MainButton path="/list" width="261" content="Get started" bg="#FF2E00" />
        <SecondryButton
          path="/login"
          width="261"
          content="Continue with Email"
          bg="#FF2E00"
        />
      </div>
    </div>
  );
}
