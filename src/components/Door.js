import React from "react";

import Goat from "../assets/goat.jpg";
import Quest from "../assets/question.png";
import Gold from "../assets/gold.png";

let thewidth = "300px";  // The image width.

// The Door component.
// Depending on the value of `props.pic`,
//   either a goat, question mark, or gold picture will be shown.
//   In case `props.pic`="", just a "door" will be displayed without any image.
const Door = (props) => {
  return (
    <>
      <p
      //The styling foor a single door.
        style={{
          backgroundColor: props.color,
          textAlign: "center",
          height: "450px",
          width: "300px",
          display: "inline-block",
          cursor: props.clickable ? "pointer" : "",
          padding: "5rem",
          fontSize: "3rem",
          fontWeight: "bolder",
          border: "solid 1px black",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        {props.value} <br /> {/* The door name is displayed on the door, which is either 'a', 'b', or 'c'. */}
        <br />
        {props.pic === "goat" && (
          <img // Show a picture of a goat.
            src={Goat}
            alt="Goat"
            width={thewidth}
            style={{ borderRadius: "50%" }}
          />
        )}
        {props.pic === "question" && (
          <img // Show a picture of a question mark.
            src={Quest}
            alt="Question"
            width={thewidth}
            style={{ borderRadius: "50%" }}
          />
        )}
        {props.pic === "gold" && (
          <img // Show a picture of a Gold Coin.
            src={Gold}
            alt="Gold"
            width={thewidth}
            style={{ borderRadius: "50%" }}
          />
        )}
      </p>
    </>
  );
};

export default Door;
