import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Componants/Pages/Home/Home.jsx";
import AddForm from "./Componants/Pages/AddChocolate/AddForm.jsx";
import UpdateData from "./Componants/Pages/UodateData/UpdateData.jsx";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => fetch(`http://localhost:5300/chocolats`),
  },
  {
    path: "add-chocolate",
    element: <AddForm></AddForm>,
  },
  {
    path: "chocolate-Update/:id",
    element: <UpdateData />,
    loader: ({ params }) =>
      fetch(`http://localhost:5300/chocolats/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
