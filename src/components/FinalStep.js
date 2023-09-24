import React from "react";
import Door from "./Door";
import classes from './ThreeDoors.module.css';

// In the FinalStep, the user must make their final decision on which door they want to choose.
// Depending on the value of `props.hint`, either a picture of a goat or question mark is shown for each door.
// Because of how the game works, we end up with 1 goat and 2 question marks.
// The user is then prompted to choose between the two question marks.

// The 'state' of which door is selected is Lifted up to App.js because of onClick={evaluate}.
const FinalStep = (props) => {
  return (
    <>
      <p>Please click on your final card below (one of the two question marks):</p> {/*Text Prompt*/}
      <div className={classes.threeDoors}> {/*The styling/layout of the three doors.*/}
        <Door // The first door
          color="red"
          value="a"
          clickable={true}
          pic={props.hint === "a" ? "goat" : "question"}
        />
        <Door // The second door
          color="green"
          value="b"
          clickable={true}
          pic={props.hint === "b" ? "goat" : "question"}
        />
        <Door // The third door
          color="cyan"
          value="c"
          clickable={true}
          pic={props.hint === "c" ? "goat" : "question"}
        />
      </div>
    </>
  );
};

export default FinalStep;
