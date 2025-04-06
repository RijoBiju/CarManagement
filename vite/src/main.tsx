import React from "react";
import ReactDOM from "react-dom/client";

import "../app/globals.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.tsx";
import CarPage from "./pages/CarPage.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ExpensesPage from "./pages/ExpensesPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import DashboardPageLayout from "./pages/DashboardPageLayout.tsx";

import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cars",
        element: (
          <ProtectedRoute>
            <CarsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cars/:carId",
        element: (
          <ProtectedRoute>
            <CarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "expenses",
        element: (
          <ProtectedRoute>
            <ExpensesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

