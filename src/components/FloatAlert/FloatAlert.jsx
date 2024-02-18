import React from "react";

export default function FloatAlert({ content, type }) {
  return (
    <div
      className={`fixed top-5 left-5  w-72 h-14 flex items-center rounded-xl px-4 py-2 text-[#131313] font-bold font-inter-reg ${
        type === "error" ? "bg-red-600" : ""
      } ${type === "success" ? "bg-green-600" : ""}`}
    >
      {content}
    </div>
  );
}
