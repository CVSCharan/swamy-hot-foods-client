import { useEffect, useState } from "react";

export const Typewriter = ({ text, noticeBoard }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
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
  }, [text, index, noticeBoard]);

  return (
    <p style={{ whiteSpace: "pre-wrap" }} className="notice-board-message">
      {displayedText}
    </p>
  );
};
