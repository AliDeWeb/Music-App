import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { MainButton } from "../../components/Buttons/Buttons";
import { postUsersLoginData, emailAuth } from "../../setting/Funcs/funcs";
import { postUsersDataApi } from "../../setting/Funcs/API";
import PreviosPage from "../../components/PreviosPage/PreviosPage";
import FloatAlert from "../../components/FloatAlert/FloatAlert";

export default function LoginPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConformPassword, setUserConformPassword] = useState("");

  const [isEmailTrue, setIsEmailTrue] = useState(true);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`userId`)) {
      navigate("/list");
    }
  });

  useEffect(() => {
    if (emailAuth(userEmail)) {
      setIsEmailTrue((prev) => true);
    } else {
      setIsEmailTrue((prev) => false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userPassword === userConformPassword) {
      setIsPasswordsMatch((prev) => true);
    } else {
      setIsPasswordsMatch((prev) => false);
    }
  }, [userPassword, userConformPassword]);

  return (
    <div
      style={{ height: "100dvh" }}
      className="container bg-[#131313] flex items-center justify-center"
    >
      <PreviosPage />
      {isDataValid ? <FloatAlert type="success" content="Let's Go..." /> : ""}
      {!isEmailTrue ? (
        <FloatAlert type="error" content="Email Is Not Valid!" />
      ) : (
        ""
      )}
      {!isPasswordsMatch ? (
        <FloatAlert type="error" content="Passwords Are Not Valid!" />
      ) : (
        ""
      )}
      <form className="flex flex-col justify-center items-center w-[400px]">
        <label
          className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start w-full"
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
          className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start w-full"
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
          className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start w-full"
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
          className="cursor-pointer font-inter-bold text-white mb-2 text-lg block text-start w-full"
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

            if (isEmailTrue && isPasswordsMatch && userName.length) {
              setIsDataValid((prev) => true);

              let userData = {
                username: userName,
                email: userEmail,
                password: userPassword,
              };

              postUsersLoginData(postUsersDataApi, userData, (res) => {
                localStorage.setItem(`userId`, JSON.stringify(res));
                navigate("/list");
              });
            }
          }}
        />
      </form>
    </div>
  );
}
