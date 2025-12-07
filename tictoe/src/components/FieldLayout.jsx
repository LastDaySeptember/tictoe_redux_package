import styles from "./FieldLayout.module.css";
import PropTypes from "prop-types";
// import { store } from "../store.js";
import { useSelector } from "react-redux";
import {
  selectIsActive,
  selectField,
  selectCurrentPlayer,
  selectIsGameEnded,
} from "../selectors";

export function FieldLayout({ onClick }) {
  // const appState = store.getState(); OLD GET STATE
  const isActive = useSelector(selectIsActive);
  const field = useSelector(selectField);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const isGameEnded = useSelector(selectIsGameEnded);

  const containerState = isActive ? "active" : "disabled";

  return (
    <>
      <div className={`${styles["container"]} ${styles[containerState]}`}>
        {field.map((cell, index) => {
          return (
            <div
              key={index}
              className={`${styles["cell"]} ${styles[containerState]}`}
              onClick={() => {
                onClick(index, isGameEnded, field, currentPlayer);
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>
    </>
  );
}

FieldLayout.PropTypes = {
  field: PropTypes.array,
  setField: PropTypes.function,
  currentPlayer: PropTypes.string,
  setCurrentPlayer: PropTypes.function,
  isGameEnded: PropTypes.bool,
  setIsGameEnded: PropTypes.function,
  isDraw: PropTypes.bool,
  setIsDraw: PropTypes.function,
  winPatterns: PropTypes.array,
  winner: PropTypes.string,
  setWinner: PropTypes.function,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.function,
};
