import React from "react";
import ReactDOM from "react-dom/client";

import "../app/globals.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.tsx";
import CarPage from "./pages/CarPage.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ExpensesPage from "./pages/ExpensesPage.tsx";
// import ArchivesPage from "./pages/ArchivesPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    children: [
      {
        path: "cars",
        element: <CarsPage />,
      },
      {
        path: "cars/:carId",
        element: <CarPage />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
      },
      // {
      //   path: "archives",
      //   element: <ArchivesPage />,
      // },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

