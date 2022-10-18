import React from "react";
import { ExcursionBlock } from "../ExcursionBlock/ExcursionBlock";
import "./App.scss";
import items from "../../excursionsData.json";
import { TableAdaptive } from "../TableAdaptive/TableAdaptive";
import { Order } from "../Order/Order";
import { Home } from "../Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ButtonBack } from "../ButtonBack/ButtonBack";

const excursions = items.map((obj: any) => (
  <ExcursionBlock key={obj.id} {...obj} />
));

const excursionBack = (
  <>
    <ButtonBack />
    {excursions}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/layout",
    element: excursionBack,
  },

  {
    path: "/table",
    element: <TableAdaptive />,
  },
  {
    path: "/order",
    element: <Order />,
  },
]);

const App = () => {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
