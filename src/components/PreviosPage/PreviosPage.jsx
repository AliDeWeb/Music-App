import React from "react";

import { useNavigate } from "react-router-dom";

import { IoMdArrowBack } from "react-icons/io";

export default function PreviosPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-8 left-8 text-white">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowBack size="2em" />
      </button>
    </div>
  );
}
