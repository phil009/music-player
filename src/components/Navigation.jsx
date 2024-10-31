import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navigation = () => {
  const { onLogout } = useUser();
  return (
    <>
      <aside className="shadow-lg border-r border-prussianBlue w-16 p-4 flex flex-col items-center justify-end">
        <div className="flex flex-col items-center gap-4">
          <button className="" onClick={onLogout}>
            <Icon fontSize={24} icon={"material-symbols:logout"} />
          </button>
          <Link to={"/admin"}>
            <button>
              <Icon fontSize={24} icon={"ri:admin-line"} />
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
