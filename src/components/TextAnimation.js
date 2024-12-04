import React from "react";
import { motion } from "framer-motion";

export const WaveText = ({ text }) => {
  const waveVariants = {
    hidden: { y: 0, color: "#000" },
    visible: (i) => ({
      y: [0, -5, 0], // Smaller up and down movement for a more subtle effect
      color: ["#ff6347", "#ff4500", "#32cd32", "#1e90ff", "#da70d6"], // Color change array
      transition: {
        delay: i * 0.15, // Slight delay for a smoother, more classic wave
        duration: 2, // Duration for the wave and color change
        repeat: Infinity, // Infinite looping
        repeatType: "loop",
      },
    }),
  };

  return (
    <h3 className="josefin-sans-text cooking-text">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index} // Pass index as custom prop for staggered animation
          variants={waveVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", marginRight: "2px" }}
        >
          {char}
        </motion.span>
      ))}
    </h3>
  );
};
