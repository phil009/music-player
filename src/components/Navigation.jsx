import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getCurrentUser } from "../services/auth";

const Navigation = () => {
  const { onLogout } = useUser();
  const user = getCurrentUser();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      <aside className="shadow-lg border-r border-prussianBlue w-16 p-4 flex flex-col items-center justify-end">
        <div className="flex flex-col items-center gap-4">
          <button className="" onClick={onLogout}>
            <Icon fontSize={24} icon={"material-symbols:logout"} />
          </button>
          {user.isAdmin &&
            (isAdminPage ? (
              <Link to={"/musicplayer"}>
                <button className="p-2 bg-eggShell rounded-full text-richBlack hover:bg-silverLakeBlue">
                  <Icon fontSize={24} icon={"icon-park-outline:music"} />
                </button>
              </Link>
            ) : (
              <Link to={"/admin"}>
                <button className="p-2 bg-eggShell rounded-full text-richBlack hover:bg-silverLakeBlue">
                  <Icon fontSize={24} icon={"ri:admin-line"} />
                </button>
              </Link>
            ))}
        </div>
      </aside>
    </>
  );
};

export default Navigation;
