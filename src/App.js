import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route, Routes, Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import MainComponent from "./components/main/Main";
import {MASComponent} from "./pages";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "bumblebee");
  }, []);
  useEffect(() => {
    document.title = "Physic Project";
  }, []);
  const router = createBrowserRouter([
    {
      path: "/mas",
      element: <MASComponent />,
    },
  ]);
  return (
    <React.Fragment>
      <HeaderComponent className="header" />
      <main>
        <RouterProvider router={router} />
      </main>
      <FooterComponent className="header" />
    </React.Fragment>
  );
}

export default App;
