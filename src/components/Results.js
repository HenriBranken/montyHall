import React from "react";
import Door from "./Door";
import classes from './ThreeDoors.module.css';

// This component wraps up the game:
// The header shows whether the user won or lost.
// All three images are finally revealed.
const Results = (props) => {
  return (
    <>
      <p>
        {props.outcome && `Congratulations!  You won! 🎉🎉🎉`}
        {!props.outcome && "Sorry.  You Lost. 😭"}
      </p>
      <div className={classes.threeDoors}>
        <Door // The first Door.
          color="red"
          value="a"
          clickable={true}
          pic={props.gold === "a" ? "gold" : "goat"}
        />
        <Door // The second Door.
          color="green"
          value="b"
          clickable={true}
          pic={props.gold === "b" ? "gold" : "goat"}
        />
        <Door // The third Door.
          color="cyan"
          value="c"
          clickable={true}
          pic={props.gold === "c" ? "gold" : "goat"}
        />
      </div>
    </>
  );
};

export default Results;
