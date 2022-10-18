import { click } from "@testing-library/user-event/dist/click";
import { request } from "http";
import React from "react";
import ExcursionImg from "../../img/Excursion2.png";
import "./ExcursionBlock.scss";

type ExcursionBlockProps = {
  id: number;
  title: string;
  duration: string;
  timeExit: string[];
  price: number;
  priceJetty: number;
  nameImage: string;
  status: string;
  statusColor: string;
  statusLocation: string;
};

export const ExcursionBlock: React.FC<ExcursionBlockProps> = ({
  id,
  title,
  duration,
  timeExit,
  price,
  priceJetty,
  status,
  statusColor,
  statusLocation,
  nameImage,
}) => {
  const [clickTime, setClickTime] = React.useState<Boolean>(false);

  let timeAll = timeExit.concat();
  let time: string[] = [];

  if (timeAll.length > 4) {
    time = timeAll.slice(0, 3);
    time.push("еще...");
    timeAll.push("скрыть");
  } else {
    time = timeAll.concat();
  }

  const onClickTime = (i: number) => {
    if (time[i] === "еще...") {
      setClickTime(true);
    }
    if (timeAll[i] === "скрыть") {
      setClickTime(false);
    }
  };

  return (
    <div className="excursion">
      <div className="excursion__img">
        {status && (
          <p
            className={`excursion__img-text excursion__img-text-${statusColor} ${statusLocation}`}
          >
            {status}
          </p>
        )}
        <img
          className="excursion__img-content"
          src={require(`../../img/${nameImage}`)}
          alt="Фото экскурсии"
        />
      </div>
      <div className="excursion__text">
        <h2 className="excursion__title">{title}</h2>
        <span className="excursion__time">{duration}</span>
        <ul className="excursion__description-list">
          <li className="excursion__description-item excursion__description-one">
            Билет на целый день
          </li>
          <li className="excursion__description-item excursion__description-two">
            Неограниченное число катаний
          </li>
          <li className="excursion__description-item excursion__description-three">
            6 остановок у главных достопримечательностей
          </li>
          <li
            className={
              clickTime
                ? "excursion__description-item excursion__description-four_active"
                : "excursion__description-item excursion__description-four"
            }
          >
            <p className={"excursion__time-title"}>Ближайший рейс сегодня</p>
            {!clickTime && (
              <ul className="excursion__time-list">
                {time.map((timeValue, i) => (
                  <li
                    className="excursion__time-item"
                    key={i}
                    onClick={() => onClickTime(i)}
                  >
                    {timeValue}
                  </li>
                ))}
              </ul>
            )}
            {clickTime && (
              <ul className="excursion__time-list">
                {timeAll.map((timeValue, i) => (
                  <li
                    className="excursion__time-item"
                    key={i}
                    onClick={() => onClickTime(i)}
                  >
                    {timeValue}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <div className="excursion__bottom">
          <div className="excursion__price">
            <p className="excursion__price-basic">{price} ₽</p>
            {priceJetty && (
              <p className="excursion__price-jetty">
                {priceJetty} ₽ на причале
              </p>
            )}
          </div>
          <button className="excursion__button">Подробнее</button>
        </div>
      </div>
    </div>
  );
};
