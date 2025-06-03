import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddMemberPage } from "./pages/add-member.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <>Display all members</>,
  },
  {
    path: '/add-member',
    element: <AddMemberPage/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
