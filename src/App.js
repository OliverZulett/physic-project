import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import MainComponent from "./components/main/Main";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "bumblebee");
  }, []);
  useEffect(() => {
    document.title = "Physic Project";
  }, []);
  return (
    <React.Fragment>
      <HeaderComponent className="header" />
      <MainComponent className="header" />
      <FooterComponent className="header" />
    </React.Fragment>
  );
}

export default App;
