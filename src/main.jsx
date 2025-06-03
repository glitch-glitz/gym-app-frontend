import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage.jsx";
import { AddMemberPage } from "./pages/add-member.jsx";
import { MemberListPage } from "./pages/MemberListPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, 
  },
  {
    path: "/members",
    element: <MemberListPage />, 
  },
  {
    path: "/add-member",
    element: <AddMemberPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
