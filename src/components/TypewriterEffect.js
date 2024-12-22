import React, { useState, useEffect } from "react";

// Typewriter Effect Hook
export const useTypewriter = (text, delay = 100) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [text, delay]);

  return displayedText;
};
