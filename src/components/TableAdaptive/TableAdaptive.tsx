import { ButtonBack } from "../ButtonBack/ButtonBack";
import "./TableAdaptive.scss";

export const TableAdaptive = () => {
  return (
    <>
      <ButtonBack />
      <table className="table">
        <thead>
          <tr>
            <th>Заголовок 1</th>
            <th>Заголовок 2</th>
            <th>Заголовок 3</th>
            <th>Заголовок 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>Заголовок 1</span>Контент 1
            </td>
            <td>
              <span>Заголовок 2</span>Контент 1
            </td>
            <td>
              <span>Заголовок 3</span>Контент 1
            </td>
            <td>
              <span>Заголовок 4</span>Контент 1
            </td>
          </tr>
          <tr>
            <td>
              <span>Заголовок 1</span>Контент 2
            </td>
            <td>
              <span>Заголовок 2</span>Контент 2
            </td>
            <td>
              <span>Заголовок 3</span>Контент 2
            </td>
            <td>
              <span>Заголовок 4</span>Контент 2
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
