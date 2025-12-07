import { FieldLayout } from "./FieldLayout";
import PropTypes from "prop-types";
// import { store } from "../store.js";
import { useDispatch } from "react-redux";

import {
  SET_CURRENT_PLAYER,
  END_GAME,
  SET_DRAW,
  UPDATE_FIELD,
  SET_WINNER,
  SET_GAME_ACTIVE,
} from "../constants.js";

const winPatterns = [
  [0, 1, 2], // верхняя горизонталь
  [3, 4, 5], // средняя горизонталь
  [6, 7, 8], // нижняя горизонталь
  [0, 3, 6], // левая вертикаль
  [1, 4, 7], // средняя вертикаль
  [2, 5, 8], // правая вертикаль
  [0, 4, 8], // диагональ \
  [2, 4, 6], // диагональ /
];

export function Field() {
  const dispatch = useDispatch();

  // FUNCTIONS

  function containsArray(baseArray, arrayToCheck) {
    if (arrayToCheck.length < 3) return false;

    for (let i = 0; i < 3; i++) {
      if (!arrayToCheck.includes(baseArray[i])) {
        return false;
      }
    }

    return true;
  }

  // F win ior draw
  function checkWinDraw(updatedField, currentPlayer, isGameEnded) {
    const currentPattern = [];
    updatedField.forEach((cell, i) => {
      if (cell === currentPlayer) {
        currentPattern.push(i);
      }
    });

    winPatterns.forEach((pattern) => {
      if (containsArray(pattern, currentPattern)) {
        dispatch({ type: END_GAME });
        dispatch({ type: SET_WINNER, payload: currentPlayer });
        dispatch({ type: SET_GAME_ACTIVE, payload: false });
        return true;
      } else {
        console.log("No matches found");
      }
    });

    if (!isGameEnded && currentPattern.length >= 5) {
      dispatch({ type: END_GAME });
      dispatch({ type: SET_DRAW });
      dispatch({ type: SET_GAME_ACTIVE, payload: false });
      return true;
    }
  }

  //  F change Player
  function changecurrentPlayer(currentPlayer) {
    const otherPlayer = currentPlayer === "x" ? "o" : "x";
    dispatch({ type: SET_CURRENT_PLAYER, payload: otherPlayer });
  }

  // F = onClick
  function onClick(index, isGameEnded, field, currentPlayer) {
    if (isGameEnded) {
      return;
    }
    if (field[index]) {
      console.log("Already filled");
      return;
    }

    const updatedField = field.map((cell, i) => {
      let cellState = i === index ? currentPlayer : cell;
      return cellState;
    });
    console.log("Here", field);
    dispatch({ type: UPDATE_FIELD, payload: updatedField });
    checkWinDraw(updatedField, currentPlayer, isGameEnded);
    changecurrentPlayer(currentPlayer);
  }

  // RETURN
  return (
    <>
      <FieldLayout onClick={onClick} />
    </>
  );
}

Field.PropTypes = {
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
