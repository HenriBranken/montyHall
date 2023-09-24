import React from "react";
import Door from "./Door";
import classes from './ThreeDoors.module.css';

// This component initiates the game.  It prompts the user to select one of the three doors.
// The 'state' of which door is selected is Lifted up to App.js because of onClick={evaluate}.
const PromptUser = () => {
  return (
    <>
      <p>Please select ONE of the doors by clicking on it.</p>
      <div className={classes.threeDoors}>
        {/*At this stage, we do not want to show any pictures, hence pic=""*/}
        <Door color="red" value="a" clickable={true} pic="" />
        <Door color="green" value="b" clickable={true} pic="" />
        <Door color="cyan" value="c" clickable={true} pic="" />
      </div>
    </>
  );
};

export default PromptUser;
