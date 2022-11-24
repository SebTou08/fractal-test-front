import React from 'react';

import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MyOrders from "./orders/views/my-orders";
import NewOrder from "./orders/views/new-order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/orders',
    element: <MyOrders />
  },
  {
    path: '/edit/:id',
    element: <NewOrder />
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
