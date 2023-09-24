import React from "react";
import Door from "./Door";
import classes from './ThreeDoors.module.css';

// This component starts the game.  If the user clicks on the <button> element, then he/she
// will be taken to the next step.

// The 'state' of where the user clicked is Lifted up to App.js because of onClick={evaluate}.
const StartGame = (props) => {
  return (
    <>
      <p>
        <button style={{fontSize:"3rem", cursor: "pointer"}}>Start The Game</button>
      </p>
      <div className={classes.threeDoors}>
        {/*The three doors, side by side*/}
        <Door color="red" value="a" clickable={false} pic="" />
        <Door color="green" value="b" clickable={false} pic="" />
        <Door color="cyan" value="c" clickable={false} pic="" />
      </div>
    </>
  );
};

export default StartGame;
