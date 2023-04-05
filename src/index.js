import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ErrorPage, MasPage, WavesPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    action: () => redirect('/mas'),
    children: [
      {
        index: true,
        path: "/mas",
        element: <MasPage />,
      },
      {
        path: "/waves",
        element: <WavesPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
