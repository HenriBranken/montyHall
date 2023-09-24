import React, { useReducer } from "react";
import StartGame from "./components/StartGame";
import PromptUser from "./components/PromptUser";
import FinalStep from "./components/FinalStep";
import Results from "./components/Results";
import classes from "./components/Wrapper.module.css";

// A function that randomly picks an element from an array of values.
// The randomly-chosen value is returned.
function randomlyChoose(someArray) {
  return someArray[Math.floor(Math.random() * someArray.length)];
}

// This function removes the specified `value` from `someArray` so that it is no longer present in `someArray`.
// The shortened `someArray` is returned.
// To understand why this function is used, have a look at the Python code in the `README.md` file.
function removeFromArray(value, someArray) {
  let index = someArray.indexOf(value);
  someArray.splice(index, 1);
  return someArray;
}

// A CONSTANT holding the names for our three doors: "a", "b", and "c".
const DOORARRAY = ["a", "b", "c"];

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

// This is the reducer function that manipulates the state based on certain `if` conditions.
// This function consumes the value returned by `dispatchAction`.
const gameReducer = (state, action) => {
  // If the user clicks on the `Reset` button, then the state is reverted back to its initial state.
  // Therefore, the user can start a new game.

  // The <StartGame/> component renders a blank new slate for the user to restart the game.
  if (action.type === "reset") {
    return {
      winDoorLocation: "",
      openDoorArr: ["a", "b", "c"],
      unshownDoorArr: ["a", "b", "c"],
      initDoorPick: "",
      hintDoor: "",
      finalDoorPick: "",
      content: <StartGame />,
      phase: 0,
    };
  }

  // In this part, the computer randomly selects a door to be the winning door.
  // As a result, `winDoorLocation` and `openDoorArr` gets updated.

  // The <PromptUser/> component instructs the user to click on one of the three (blank) doors.
  if (action.type === "initWinDoor") {
    let x = randomlyChoose(DOORARRAY);
    let newOpenDoorArr = removeFromArray(x, state.openDoorArr);
    console.log("Winning Door", x);
    return {
      winDoorLocation: x,
      openDoorArr: newOpenDoorArr,
      unshownDoorArr: ["a", "b", "c"],
      initDoorPick: "",
      hintDoor: "",
      finalDoorPick: "",
      content: <PromptUser />,
      phase: 1,
    };
  }
  // Here, the user has picked a door (as identified by `action.value`).
  // The computer randomly chooses a Goat Door to display to the user.
  // Overall, we update `openDoorArr`, `unshownDoorArr`, `initDoorPick` & `hintDoor` of the state.
  // At this point, the user needs to make a final decision between
  // `initDoorPick` and `newNewUnshownDoorArray[0]`.

  // <FinalStep/> renders 1 goat, and 2 question-mark doors to the user.
  if (action.type === "selectionMade") {
    let doorPick = action.value;
    let newUnshownDoorArray = removeFromArray(doorPick, state.unshownDoorArr);
    let newOpenDoorArr =
      doorPick !== state.windoorLocation
        ? removeFromArray(doorPick, state.openDoorArr)
        : [...state.openDoorArr];
    let newHintDoor = randomlyChoose(newOpenDoorArr);
    let newNewUnshownDoorArray = removeFromArray(
      newHintDoor,
      newUnshownDoorArray
    );
    console.log("Doorpick:", doorPick);
    console.log("Hint", newHintDoor);
    return {
      winDoorLocation: state.winDoorLocation,
      openDoorArr: newOpenDoorArr,
      unshownDoorArr: newNewUnshownDoorArray,
      initDoorPick: doorPick,
      hintDoor: newHintDoor,
      finalDoorPick: "",
      content: (
        <FinalStep
          initial={doorPick}
          hint={newHintDoor}
          option={newNewUnshownDoorArray[0]}
        />
      ),
      phase: 2,
    };
  }
  // At this point, the user has made his/her final decision.
  // The computer evaluates whether the user won or lost by comparing `winDoorLocation` with `finalChoice`.
  // The `finalDoorPick` of the state gets updated.
  // The <Result/> component renders the final outcome on the screen.
  if (action.type === "finalChoice") {
    let finalChoice = action.value;
    let outcome = finalChoice === state.winDoorLocation;
    return {
      winDoorLocation: state.winDoorLocation,
      openDoorArr: state.openDoorArr,
      unshownDoorArr: state.unshownDoorArr,
      initDoorPick: state.initDoorPick,
      hintDoor: state.hintDoor,
      finalDoorPick: finalChoice,
      content: (
        <Results
          outcome={outcome}
          final={finalChoice}
          gold={state.winDoorLocation}
        />
      ),
      phase: 3,
    };
  }
};

// ------------------------------------------------------------------------------------- //

function App() {
  let initialState = {
    winDoorLocation: "",
    openDoorArr: ["a", "b", "c"],
    unshownDoorArr: ["a", "b", "c"],
    initDoorPick: "",
    hintDoor: "",
    finalDoorPick: "",
    content: <StartGame />,
    phase: 0,
  };
  // We use the useReducer hook to manage the state information in this game.
  const [gameState, dispatchAction] = useReducer(gameReducer, initialState);

  // The User has clicked on the Reset button to restart the game.
  // As a result, the state will be reverted back to its initial state.
  const resetHandler = () => {
    dispatchAction({ type: "reset", value: "" });
  };

  // We use the `evaluate` function to carry out certain actions, depending on the state information.
  // It consists of 3 IF statement blocks, and each one works with either `gameState.phase` or `event`.
  const evaluate = (event) => {
    console.log(event);
    if (+gameState.phase === 0) {
      if (event.target.innerText !== "Start The Game") {
        alert("Please click on the start button");
        return;
      }
      // Let `gameReducer` know that it must initialize a winning door.
      dispatchAction({ type: "initWinDoor", value: "" });
    }

    if (+gameState.phase === 1) {
      let chosenDoor = event.target.innerHTML.toLowerCase();
      // Let `gameReducer` know that it must collect and update the 'initDoorPick' value.
      // Secondly, `gameReducer` must reveal a hint (goat) to the user.
      dispatchAction({ type: "selectionMade", value: chosenDoor[0] });
    }

    if (+gameState.phase === 2) {
      let innerText = event.target.innerText;
      let outerText = event.target.parentNode.innerText[0];
      let finalDoorPick = innerText ? innerText[0] : outerText;
      console.log("finalDoorPick", finalDoorPick);
      if (finalDoorPick === gameState.hintDoor) {
        alert("Please choose one of the two question marks.");
        return;
      }
      // `gameReducer` must update `finalDoorPick`, and render the outcome of the game to the user.
      dispatchAction({ type: "finalChoice", value: finalDoorPick });
    }
  };

  return (
    <>
      {/*The <div> wrapper is the location where content gets dynamically rendered, depending on the state of the game.*/}
      <div className={classes.wrapper} onClick={evaluate}>
        {gameState.content}
      </div>

      {/*The closing <p> tag renders the Reset button.*/}
      <p style={{ textAlign: "center" }}>
        <button className={classes.button} onClick={resetHandler}>
          Reset
        </button>
      </p>
    </>
  );
}

export default App;
