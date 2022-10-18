import React from "react";
import { ButtonBack } from "../ButtonBack/ButtonBack";
import "./Order.scss";

export const Order = () => {
  const travelMinutes = 50;
  const priceOneWay = 700;
  const priceRoundtrip = 1200;
  const fromPoint = ["из A в B", "из B в A", "из A в B и обратно в А"];
  const timeInB = [
    "11:00",
    "11:30",
    "12:00",
    "12:45",
    "13:15",
    "14:00",
    "14:30",
    "15:00",
    "15:35",
    "16:10",
    "17:00",
    "17:30",
    "17:45",
    "18:30",
  ];
  let timeInA = [
    "11:45",
    "12:10",
    "12:35",
    "12:55",
    "13:35",
    "14:00",
    "14:45",
    "15:10",
    "15:35",
    "16:00",
    "17:30",
    "17:50",
    "18:40",
    "19:00",
  ];

  const [selectDirection, setSelectDirection] = React.useState<number>(0);
  const [timeEditInA, setTimeEditInA] = React.useState<string[]>(timeInA);
  const [inputValue, setInputValue] = React.useState<string>("1");
  const [clickсCountTicket, setClickсCountTicket] =
    React.useState<boolean>(false);
  const currentUTC = 3;
  const timeDifferent = new Date().getTimezoneOffset();
  const [selectActiveRound, setSelectActiveRound] =
    React.useState<boolean>(false);
  const [selectActiveTimeIn, setSelectActiveTimeIn] =
    React.useState<boolean>(false);

  const getMinuteAmount = (time: string) => {
    let minutes = Number(time.slice(3)) + Number(time.slice(0, -3)) * 60;
    minutes = minutes - currentUTC * 60 - timeDifferent;
    return minutes;
  };

  const getTimeStr = (minutes: number) => {
    let hours = Math.trunc(minutes / 60);
    if (hours > 23) {
      hours -= 24;
    }
    if (hours < 0) {
      hours = 24 + hours;
    }
    minutes = minutes % 60;
    let minuteStr = `${minutes}`;

    if (minuteStr.length === 1) {
      minuteStr = `0${minuteStr}`;
    }
    return `${hours}:${minuteStr}`;
  };

  const getDifferenceUTC = (time: string) => {
    let minutes = getMinuteAmount(time);
    let timeStr = getTimeStr(minutes);
    return timeStr;
  };

  const [countTimeOutA, setCountTimeOutA] = React.useState<string>(
    getDifferenceUTC(timeInB[0])
  );

  const [countTimeOutB, setCountTimeOutB] = React.useState<string>(
    getDifferenceUTC(timeInA[0])
  );

  const onChangeDirection = (value: string) => {
    setClickсCountTicket(false);
    setSelectDirection(Number(value));
  };

  const onChangeTimeInA = (value: string) => {
    setCountTimeOutB(value);
    let minutes = Number(value.slice(3)) + Number(value.slice(0, -3)) * 60;
    const arrMinutesFrom = timeInB
      .map((item) => getMinuteAmount(item))
      .filter((item) => minutes + travelMinutes < item)
      .map((item) => getTimeStr(item));

    if (selectDirection === 2 && selectActiveRound) {
      setSelectActiveTimeIn(true);
    }
  };

  const onChangeTimeInB = (value: string) => {
    setCountTimeOutA(value);
    let minutes = Number(value.slice(3)) + Number(value.slice(0, -3)) * 60;
    const arrMinutesFrom = timeInA
      .map((item) => getMinuteAmount(item))
      .filter((item) => minutes + travelMinutes < item)
      .map((item) => getTimeStr(item));

    if (selectDirection === 0) {
      setSelectActiveTimeIn(true);
    }

    if (selectDirection === 1) {
      setSelectActiveTimeIn(true);
    }

    if (selectDirection === 2) {
      setSelectActiveRound(true);
    }

    if (selectDirection === 2) {
      setTimeEditInA(arrMinutesFrom);
    }
  };

  const getTimeTravelStr = (time: string) => {
    let minutes = Number(time.slice(3)) + Number(time.slice(0, -3)) * 60;
    minutes += travelMinutes;
    return getTimeStr(minutes);
  };

  const onClickсCountTicket = () => {
    setClickсCountTicket(true);
  };

  const onClickсRepeat = () => {
    window.location.reload();
  };
  return (
    <>
      <ButtonBack />

      <div className="order">
        <label htmlFor="direction">
          <span>Выберите направление:</span>
          <select
            disabled={Boolean(clickсCountTicket)}
            onChange={(event) => {
              onChangeDirection(event.target.value);
            }}
            name="route"
            id="route"
          >
            {fromPoint.map((item, i) => (
              <option value={i} key={i}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="timeDispatch">
          <label htmlFor="time">
            <span>Выберите время отправления:</span>
            <select
              disabled={Boolean(clickсCountTicket)}
              onChange={(event) => {
                onChangeTimeInA(event.target.value);
                onChangeTimeInB(event.target.value);
              }}
              name="time"
              id="time"
            >
              <option>{"Выберите"}</option>
              {!selectDirection &&
                timeInB.map((value, i) => (
                  <option key={i}>{getDifferenceUTC(value)}</option>
                ))}

              {selectDirection === 1 &&
                timeInA.map((value, i) => (
                  <option key={i}> {getDifferenceUTC(value)}</option>
                ))}

              {selectDirection === 2 &&
                timeInB.map((value, i) => (
                  <option key={i}> {getDifferenceUTC(value)}</option>
                ))}
            </select>
          </label>

          {selectDirection === 2 && (
            <label htmlFor="time">
              <span>Выберите время обратно:</span>
              {timeEditInA.length > 0 && (
                <>
                  <select
                    disabled={
                      Boolean(!selectActiveRound) || Boolean(clickсCountTicket)
                    }
                    onChange={(event) => {
                      onChangeTimeInA(event.target.value);
                    }}
                    name="time"
                    id="time"
                  >
                    <option>{"Выберите"}</option>
                    {timeEditInA.map((value, i) => (
                      <option key={i}>{value}</option>
                    ))}
                  </select>
                </>
              )}

              {timeEditInA.length === 0 && (
                <span className="ticket-alert">Рейсов нет</span>
              )}
            </label>
          )}
        </div>

        <label htmlFor="num">
          <span>Количество билетов:</span>
          <input
            disabled={Boolean(clickсCountTicket)}
            id="num"
            type="number"
            min="1"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          {!clickсCountTicket && (
            <button
              disabled={Boolean(!selectActiveTimeIn)}
              onClick={() => onClickсCountTicket()}
            >
              Посчитать
            </button>
          )}
          {clickсCountTicket && (
            <button onClick={() => onClickсRepeat()}>Заказать ещё</button>
          )}
        </label>
      </div>
      {clickсCountTicket && selectDirection === 0 && (
        <p className="info">
          Вы выбрали {inputValue} билет(a) по маршруту{" "}
          {fromPoint[selectDirection]} стоимостью{" "}
          {priceOneWay * Number(inputValue)}руб. <br />
          Это путешествие займет у вас {travelMinutes} минут.
          <br /> Теплоход отправляется из пункта А в {countTimeOutA}, а прибудет
          в пункт В в {getTimeTravelStr(countTimeOutA)}.
        </p>
      )}
      {clickсCountTicket && selectDirection === 1 && (
        <p className="info">
          Вы выбрали {inputValue} билета по маршруту{" "}
          {fromPoint[selectDirection]} стоимостью{" "}
          {priceOneWay * Number(inputValue)}руб. <br />
          Это путешествие займет у вас {travelMinutes} минут.
          <br /> Теплоход отправляется из пункта В в {countTimeOutB}, а прибудет
          в пункт А в {getTimeTravelStr(countTimeOutB)}.
        </p>
      )}

      {clickсCountTicket && selectDirection === 2 && (
        <p className="info">
          Вы выбрали {inputValue} билет(a) по маршруту{" "}
          {fromPoint[selectDirection]} стоимостью{" "}
          {priceRoundtrip * Number(inputValue)}руб. <br />
          Путешествие в одну сторону займет у вас {travelMinutes} минут.
          <br /> Туда: теплоход отправляется из пункта А в {countTimeOutA}, а
          прибудет в пункт В в {getTimeTravelStr(countTimeOutA)}.
          <br /> Обратно: теплоход отправляется из пункта В в {countTimeOutB}, а
          прибудет в пункт А в {getTimeTravelStr(countTimeOutB)}.
        </p>
      )}
    </>
  );
};
