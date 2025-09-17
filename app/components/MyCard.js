// In order to use react hooks (`useState`, `useEffect`), we must specify that this component runs on the client
"use client";
// We import react functions
import { useEffect, useState } from "react";
// Import the styles from the css file.
import classes from "./my-card-styles.module.css";

function MyCard(props) {
  // Creating a React State to keep
  // TODO: create a state for the number of clicks

  // TODO: create a side effect to react to the number of clicks reaching a certain value

  // Handler function to increase the number of clicks by one
  function incrementNumClicks() {
    // TODO: increase the number of clicks by one
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{props.title}</h2>
      <p className={classes.text}>{props.text}</p>
      <button onClick={incrementNumClicks}>{props.buttonText}</button>
      <p>
        You clicked the button{" "}
        <span className={classes.counter}>{/* TODO: display the number of clicks */}</span> times!
      </p>
    </div>
  );
}

export default MyCard;
