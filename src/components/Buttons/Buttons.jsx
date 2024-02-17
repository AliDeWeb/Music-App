import React from "react";

import { Link } from "react-router-dom";

export function MainButton(props) {
  return (
    <div className="my-3 w-[250px] h-[50px] bg-[#FF2E00] text-xl rounded-2xl flex justify-center items-center text-[#131313]">
      <button className="font-inter-bold">
        <Link to={props.path}>{props.content}</Link>
      </button>
    </div>
  );
}

export function SecondryButton(props) {
  return (
    <div className="my-3 w-[250px] h-[50px] bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl flex justify-center items-center text-[#FF2E00]">
      <button className="font-inter-bold">
        <Link to={props.path}>{props.content}</Link>
      </button>
    </div>
  );
}
