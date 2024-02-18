import React from "react";

import { MainButton } from "../../components/Buttons/Buttons";
import { postUsersLoginData } from "../../setting/Funcs/funcs";

//? Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConformPassword, setUserConformPassword] = useState("");

  return (
    <div
      style={{ height: "100dvh" }}
      className="container bg-[#131313] flex items-center justify-center"
    >
      <form className="flex flex-col justify-center items-center w-[400px]">
        <label
          className="font-inter-bold text-white mb-2 text-lg block text-start w-full"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg w-full"
          id="username"
          type="text"
          placeholder="john-1234"
          onChange={(e) => {
            setUserName((prev) => e.target.value.trim().toLowerCase());
          }}
          value={userName}
        />
        <label
          className="font-inter-bold text-white mb-2 text-lg block text-start w-full"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg w-full"
          id="email"
          type="text"
          placeholder="abc@example.com"
          onChange={(e) => {
            setUserEmail((prev) => e.target.value.trim().toLowerCase());
          }}
          value={userEmail}
        />
        <label
          className="font-inter-bold text-white mb-2 text-lg block text-start w-full"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg w-full"
          id="password"
          type="password"
          placeholder="!1234"
          onChange={(e) => {
            setUserPassword((prev) => e.target.value.trim().toLowerCase());
          }}
          value={userPassword}
        />
        <label
          className="font-inter-bold text-white mb-2 text-lg block text-start w-full"
          htmlFor="password-conform"
        >
          Conform Password:
        </label>
        <input
          className="outline-none bg-[#131313] text-[#FF2E00] border border-[#FF2E00] mb-3 py-3 px-5 rounded-2xl font-inter-sem text-lg w-full"
          id="password-conform"
          type="password"
          placeholder="!1234"
          onChange={(e) => {
            setUserConformPassword((prev) =>
              e.target.value.trim().toLowerCase()
            );
          }}
          value={userConformPassword}
        />

        <MainButton
          content="Submit"
          clickHandler={(e) => {
            e.preventDefault();

            let userData = {
              username: userName,
              email: userEmail,
              password: userPassword,
            };

            postUsersLoginData("", userData, () => {
              useNavigate("/main");
            });
          }}
        />
      </form>
    </div>
  );
}