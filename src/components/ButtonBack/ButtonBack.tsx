import "./ButtonBack.scss";
import { useNavigate } from "react-router-dom";

export const ButtonBack = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <button className="button" onClick={() => onClickBack()}>
      Назад
    </button>
  );
};
