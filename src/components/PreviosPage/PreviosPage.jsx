import React from "react";

import { useNavigate } from "react-router-dom";

import { IoMdArrowBack } from "react-icons/io";

export default function PreviosPage(props) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-9 left-8 text-white cursor-pointer z-50">
      <button
        onClick={() => {
          if (props.path) {
            navigate(props.path);
          } else {
            navigate(-1);
          }
        }}
      >
        <IoMdArrowBack size="1.5em" />
      </button>
    </div>
  );
}
