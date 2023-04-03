import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";

function App() {
  useEffect(() => {
    document.title = "Physic Project";
    document.documentElement.setAttribute("data-theme", "emerald");
  }, []);

  return (
    <React.Fragment>
      <HeaderComponent className="header" />
      <main className="mx-3">
        <Outlet />
      </main>
      <FooterComponent className="header" />
    </React.Fragment>
  );
}

export default App;
