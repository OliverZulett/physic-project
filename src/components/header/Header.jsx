import React from "react";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
  return (
    <header className="p-2">
      <div className="navbar bg-primary rounded-box">
        <div className="flex-1">
          <h1 className="text-xl font-semibold ml-3">Proyecto de Fisica</h1>
        </div>
        <div className="flex-none">
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/mas">M.A.S</Link>
            </li>
            <li>
              <Link to="/waves">ondas</Link>
            </li>
          </ul> */}
          <h1 className="text-xl mr-3">Movimiento Armonico Simple</h1>
        </div>
      </div>
    </header>
  );
}
