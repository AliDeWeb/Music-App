import React from "react";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";

import { NavLink } from "react-router-dom";

export default function AdminPanelSideBar() {
  return (
    <div className="divide-y-[1px] divide-gray-400  font-inter-sem font-bold text-lg h-[90dvh] overflow-auto">
      <div className="py-6 pl-2">
        <NavLink
          className={(link) =>
            link.isActive
              ? "flex items-center gap-2 text-red-600 pl-3"
              : "flex items-center gap-2 text-white transition-all relative before:content-[''] before:w-[0] before:h-[7px] before:bg-red-600 before:rounded-full before:absolute before:top-0 before:bottom-0 before:left-1 before:my-auto before:transition-all  hover:pl-[30px] hover:before:w-[20px]"
          }
          to="/admin-panel"
        >
          <IoHomeOutline color="#fff" />
          Panel
        </NavLink>
      </div>
      <div className="py-6 pl-2">
        <NavLink
          className={(link) =>
            link.isActive
              ? "flex items-center gap-2 text-red-600 pl-3"
              : "flex items-center gap-2 text-white transition-all relative before:content-[''] before:w-[0] before:h-[7px] before:bg-red-600 before:rounded-full before:absolute before:top-0 before:bottom-0 before:left-1 before:my-auto before:transition-all  hover:pl-[30px] hover:before:w-[20px]"
          }
          to="/"
        >
          <FaRegUser color="#fff" />
          Users
        </NavLink>
      </div>
      <div className="py-6 pl-2">
        <NavLink
          className={(link) =>
            link.isActive
              ? "flex items-center gap-2 text-red-600 pl-3"
              : "flex items-center gap-2 text-white transition-all relative before:content-[''] before:w-[0] before:h-[7px] before:bg-red-600 before:rounded-full before:absolute before:top-0 before:bottom-0 before:left-1 before:my-auto before:transition-all  hover:pl-[30px] hover:before:w-[20px]"
          }
          to="/"
        >
          <IoMusicalNotesOutline color="#fff" />
          Songs List
        </NavLink>
      </div>
      <div className="py-6 pl-2">
        <NavLink
          className={(link) =>
            link.isActive
              ? "flex items-center gap-2 text-red-600 pl-3"
              : "flex items-center gap-2 text-white transition-all relative before:content-[''] before:w-[0] before:h-[7px] before:bg-red-600 before:rounded-full before:absolute before:top-0 before:bottom-0 before:left-1 before:my-auto before:transition-all  hover:pl-[30px] hover:before:w-[20px]"
          }
          to="/uploadfile"
        >
          <MdOutlineCloudUpload color="#fff" />
          Upload
        </NavLink>
      </div>
    </div>
  );
}
