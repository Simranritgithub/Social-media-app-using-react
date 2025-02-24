import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Create from "./components/Create.jsx";
import PostList from "./components/Postlist.jsx";
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  
  children:[

    { path: "/", element: <PostList />},
     { path:"/create" , element:<Create/>
    }],},
    
  ]);
  


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router ={router} />
  </React.StrictMode>
);
