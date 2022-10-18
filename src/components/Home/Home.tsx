import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const onClicklLayout = () => {
    navigate("/layout");
  };

  const onClicklOrder = () => {
    navigate("/order");
  };

  const onClicklTable = () => {
    navigate("/table");
  };

  return (
    <div className="buttons">
      <button onClick={() => onClicklLayout()}>Вёрстка</button>
      <button onClick={() => onClicklOrder()}>Заказ билетов</button>
      <button onClick={() => onClicklTable()}>Пример адаптивной таблицы</button>
    </div>
  );
};
