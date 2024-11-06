import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getCurrentUser } from "../services/auth";

const Navigation = ({ openNav }) => {
  const { onLogout } = useUser();
  const user = getCurrentUser();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      <div
        className={`grid h-[100dvh] transition-all duration-500 absolute sm:relative z-50 bg-richBlack ${
          openNav ? "grid-cols-[1fr}" : "grid-cols-[0fr]"
        }`}
      >
        <div className="overflow-hidden h-full">
          <aside className="h-full shadow-lg border-r border-prussianBlue p-4 flex flex-col items-center justify-end">
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
        </div>
      </div>
    </>
  );
};

export default Navigation;
