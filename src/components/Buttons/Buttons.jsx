import React from "react";

import { Link } from "react-router-dom";

export function MainButton(props) {
  return (
    <div className="py-3 px-3 my-3 w-[150px] h-[60px] sm:w-[250px] sm:h-[50px] bg-[#FF2E00] text-xl rounded-2xl flex justify-center items-center text-[#131313] hover:bg-[#131313] hover:border hover:border-[#FF2E00] hover:text-[#fff] transition-all">
      <button
        className="font-inter-bold font-bold"
        onClick={props.clickHandler}
      >
        {!props.path ? (
          props.content
        ) : (
          <Link to={props.path}>{props.content}</Link>
        )}
      </button>
    </div>
  );
}

export function SecondryButton(props) {
  return (
    <div className="py-3 px-3 my-3 w-[150px] h-[60px] sm:w-[250px] sm:h-[50px] bg-[#131313] text-xl border border-[#FF2E00] rounded-2xl flex justify-center items-center text-[#FF2E00] hover:bg-[#ff2f001f] hover:text-[#fff] transition-all">
      <button className="font-inter-bold" onClick={props.clickHandler}>
        {!props.path ? (
          props.content
        ) : (
          <Link to={props.path}>{props.content}</Link>
        )}
      </button>
    </div>
  );
}
