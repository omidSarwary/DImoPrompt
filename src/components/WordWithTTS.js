import React, { useRef, useState, useEffect } from "react";

import { speakText } from "../tts";



export default function WordWithTTS({ word }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-block", marginRight: 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {word}
      {hovered && (
        <button
          onClick={() => speakText(word)}
          style={{
            position: "absolute",
            top: "-1.2em",
            left: "0",
            fontSize: "0.7em",
            padding: "2px 4px",
            borderRadius: "4px",
            backgroundColor: "#5c6bc0",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          🔊
        </button>
      )}
    </span>
  );
}
export const renderTextWithTTS = (text) => {
    if (!text) return null;
    return text.split(" ").map((word, i, arr) => (
      <React.Fragment key={i}>
        <WordWithTTS word={word} />
        {i < arr.length - 1 ? " " : ""}
      </React.Fragment>
    ));
  };
  