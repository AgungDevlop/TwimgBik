import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";

import { Home } from "./pages/Home";
import { PlayVideo } from "./pages/PlayVideo";
import { Download } from "./pages/Download";
import { Contact } from "./pages/Contact";
import Redirect from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" replace />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <PlayVideo />,
      },
      {
        path: "download",
        element: <Download />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "play/:id",
        element: <PlayVideo />,
      },
      {
        path: ":id",
        element: <PlayVideo />,
      },
      {
        path: "v/:id",
        element: <PlayVideo />,
      },
      {
        path: "e/:id",
        element: <PlayVideo />,
      },
      {
        path: "d/:id",
        element: <PlayVideo />,
      },
      {
        path: "f/:id",
        element: <PlayVideo />,
      },
      {
        path: "view/:id",
        element: <PlayVideo />,
      },
      {
        path: "share/:id",
        element: <PlayVideo />,
      },
      {
        path: "s/:id",
        element: <Redirect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);