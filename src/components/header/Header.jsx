import React from "react";
import { Link } from "react-router-dom";
// import { Outlet, Link } from "react-router-dom";

export default function HeaderComponent() {
  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/mas">MAS</Link>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
