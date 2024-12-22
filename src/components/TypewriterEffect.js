import React, { useState, useEffect } from "react";

export const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset the displayedText and index when the text prop changes
    setDisplayedText("");
    setIndex(0);

    if (!text) return;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text, index]);

  return <div>{displayedText}</div>;
};
