import React, { useRef, useState, useEffect } from "react";
import "./Teleprompter.css";
import TeleprompterLegend from "./components/TeleprompterLegend";
import WordWithTTS, { renderTextWithTTS } from "./components/WordWithTTS";
import TopBar from './components/TopBar';



/*
// Replace your old parseTeleprompterText with this function

 

  
  export const parseTeleprompterText = (text) => {
    if (!text) return null;
  
    let _id = 0;
    const nextKey = (prefix = "node") => `${prefix}-${_id++}`;
  
    // Find matching closing tag respecting nested tags
    const findMatchingClose = (str, tag, startIdx) => {
      const openRe = new RegExp(`\\[${tag}:[^\\]]+\\]`, "gi");
      const closeRe = new RegExp(`\\[\\/${tag}\\]`, "gi");
      openRe.lastIndex = startIdx;
      closeRe.lastIndex = startIdx;
  
      let depth = 0;
      let nextOpen = openRe.exec(str);
      let nextClose = closeRe.exec(str);
  
      while (nextClose) {
        while (nextOpen && nextOpen.index < nextClose.index) {
          depth++;
          nextOpen = openRe.exec(str);
        }
  
        if (depth === 0) return nextClose.index;
        else depth--;
        nextClose = closeRe.exec(str);
      }
      return -1;
    };
  
    const processLine = (line) => {
      const nodes = [];
      let pos = 0;
      const openTagRe = /\[([a-z]+):([^\]]+)\]/i;
  
      while (pos < line.length) {
        const rest = line.slice(pos);
        const match = openTagRe.exec(rest);
  
        if (!match) {
          if (rest) nodes.push(renderTextWithTTS(rest));
          break;
        }
  
        const matchIndex = pos + match.index;
        if (matchIndex > pos) nodes.push(renderTextWithTTS(line.slice(pos, matchIndex)));
  
        const tag = match[1].toLowerCase();
        const option = match[2];
        const contentStart = matchIndex + match[0].length;
  
        const closeIndex = findMatchingClose(line, tag, contentStart);
        const inner = closeIndex !== -1 ? line.slice(contentStart, closeIndex) : option;
  
        const children = closeIndex !== -1 ? processLine(inner) : renderTextWithTTS(inner);
        const key = nextKey(tag);
  
        switch (tag) {
          case "stress":
            nodes.push(<strong key={key}>{children}</strong>);
            break;
          case "secondary":
            nodes.push(<em key={key}>{children}</em>);
            break;
          case "phonetic":
            nodes.push(
              <span key={key} title={`Pronounced: ${option}`} className="tele-phonetic">
                {children}
              </span>
            );
            break;
          case "volume": {
            const lvl = option.toLowerCase();
            const cls =
              lvl === "loud"
                ? "tele-loud"
                : lvl === "soft"
                ? "tele-soft"
                : lvl === "strong"
                ? "tele-strong"
                : "tele-volume";
            nodes.push(<span key={key} className={cls}>{children}</span>);
            break;
          }
          case "tone": {
            const tone = option.toLowerCase();
            const toneCls =
              tone === "excited"
                ? "tele-tone-excited"
                : tone === "happy"
                ? "tele-tone-happy"
                : tone === "serious"
                ? "tele-tone-serious"
                : tone === "sad"
                ? "tele-tone-sad"
                : tone === "angry"
                ? "tele-tone-angry"
                : tone === "calm"
                ? "tele-tone-calm"
                : "tele-tone";
            nodes.push(<span key={key} className={toneCls}>{children}</span>);
            break;
          }
          case "pause": {
            const dur = option.toLowerCase();
            const symbol = dur === "short" ? "•" : dur === "medium" ? "••" : "•••";
            nodes.push(<span key={key} className={`tele-pause tele-pause-${dur}`}>{symbol}</span>);
            break;
          }
          case "speed": {
            const dir = option.toLowerCase();
            const sym = dir === "up" ? "↑" : dir === "down" ? "↓" : "";
            nodes.push(
              <span key={key} className={`tele-speed tele-speed-${dir}`}>
                {children.length ? children : sym}
              </span>
            );
            break;
          }
          default:
            nodes.push(<span key={key}>{children}</span>);
        }
  
        pos = closeIndex !== -1 ? closeIndex + (`[/${tag}]`).length : contentStart;
      }
  
      return nodes;
    };
  
    return text.split("\n").map((line, i) => (
      <p key={`line-${i}`} className="tele-line">
        {processLine(line)}
      </p>
    ));
  };
  
 // Replace your old parseTeleprompterText with this function
// Assumes React, renderTextWithTTS are in scope (import them if needed)
export const parseTeleprompterText = (text) => {
    if (!text) return null;
  
    let _id = 0;
    const nextKey = (prefix = "node") => `${prefix}-${_id++}`;
  
    // Recursive parser
    const processText = (str) => {
      const nodes = [];
      let pos = 0;
  
      const tagRe = /\[([a-z]+)(?::([^\]]+))?\]([\s\S]*?)\[\/\1\]/i;
  
      while (pos < str.length) {
        const rest = str.slice(pos);
        const match = tagRe.exec(rest);
  
        if (!match) {
          // Handle text with line breaks
          const lines = rest.split("\n");
          lines.forEach((line, i) => {
            if (line) nodes.push(renderTextWithTTS(line));
            if (i < lines.length - 1) nodes.push(<br key={`br-${_id++}`} />);
          });
          break;
        }
  
        const matchIndex = pos + match.index;
  
        // Text before tag
        if (matchIndex > pos) {
          const before = rest.slice(0, match.index);
          const lines = before.split("\n");
          lines.forEach((line, i) => {
            if (line) nodes.push(renderTextWithTTS(line));
            if (i < lines.length - 1) nodes.push(<br key={`br-${_id++}`} />);
          });
        }
  
        const tag = match[1].toLowerCase();
        const option = match[2];
        const innerContent = match[3];
  
        const children = tag === "pause" ? null : processText(innerContent);
        const key = nextKey(tag);
  
        switch (tag) {
          case "stress":
            nodes.push(<strong key={key}>{children}</strong>);
            break;
          case "secondary":
            nodes.push(<em key={key}>{children}</em>);
            break;
          case "phonetic":
            nodes.push(
              <span key={key} title={`Pronounced: ${option}`} className="tele-phonetic">
                {children}
              </span>
            );
            break;
          case "volume": {
            const lvl = option?.toLowerCase();
            const cls =
              lvl === "loud"
                ? "tele-loud"
                : lvl === "soft"
                ? "tele-soft"
                : lvl === "strong"
                ? "tele-strong"
                : "tele-volume";
            nodes.push(<span key={key} className={cls}>{children}</span>);
            break;
          }
          case "tone": {
            const tone = option?.toLowerCase();
            const toneCls =
              tone === "excited"
                ? "tele-tone-excited"
                : tone === "happy"
                ? "tele-tone-happy"
                : tone === "serious"
                ? "tele-tone-serious"
                : tone === "sad"
                ? "tele-tone-sad"
                : tone === "angry"
                ? "tele-tone-angry"
                : tone === "calm"
                ? "tele-tone-calm"
                : "tele-tone";
            nodes.push(<span key={key} className={toneCls}>{children}</span>);
            break;
          }
          case "speed": {
            const dir = option?.toLowerCase();
            const sym = dir === "up" ? "↑" : dir === "down" ? "↓" : "";
            nodes.push(
              <span key={key} className={`tele-speed tele-speed-${dir}`}>
                {children.length ? children : sym}
              </span>
            );
            break;
          }
          case "pause": {
            const dur = option?.toLowerCase();
            const symbol = dur === "short" ? "•" : dur === "medium" ? "••" : "•••";
            nodes.push(<span key={key} className={`tele-pause tele-pause-${dur}`}>{symbol}</span>);
            break;
          }
          default:
            nodes.push(<span key={key}>{children}</span>);
        }
  
        pos = matchIndex + match[0].length;
      }
  
      return nodes;
    };
  
    // Optional: wrap paragraphs by splitting on double-newlines
    const paragraphs = text.split(/\n\s*\n/);
  
    return paragraphs.map((para, pIdx) => (
      <p key={`para-${pIdx}`} className="tele-line">
        {processText(para)}
      </p>
    ));
  };

  */  
export const parseTeleprompterText = (text) => {
    if (!text) return null;
  
    let _id = 0;
    const nextKey = (prefix = "node") => `${prefix}-${_id++}`;
  
    const toneEmojis = {
      excited: "🤩",
      happy: "😊",
      serious: "😐",
      sad: "😢",
      angry: "😡",
      calm: "😌",
    };
  
    // Recursive parser for tags, multiline safe
    const processText = (str) => {
      const nodes = [];
      let pos = 0;
  
      const tagRe = /\[([a-z]+)(?::([^\]]+))?\]([\s\S]*?)\[\/\1\]/i;
  
      while (pos < str.length) {
        const rest = str.slice(pos);
        const match = tagRe.exec(rest);
  
        if (!match) {
          // handle remaining text with line breaks
          const lines = rest.split("\n");
          lines.forEach((line, i) => {
            if (line) nodes.push(renderTextWithTTS(line));
            if (i < lines.length - 1) nodes.push(<br key={`br-${_id++}`} />);
          });
          break;
        }
  
        const matchIndex = pos + match.index;
  
        // Text before the tag
        if (matchIndex > pos) {
          const before = rest.slice(0, match.index);
          const lines = before.split("\n");
          lines.forEach((line, i) => {
            if (line) nodes.push(renderTextWithTTS(line));
            if (i < lines.length - 1) nodes.push(<br key={`br-${_id++}`} />);
          });
        }
  
        const tag = match[1].toLowerCase();
        const option = match[2];
        const innerContent = match[3];
        const key = nextKey(tag);
  
        // parse children recursively
        const children = tag === "pause" ? null : processText(innerContent);
  
        switch (tag) {
          case "stress":
            nodes.push(<strong key={key}>{children}</strong>);
            break;
          case "secondary":
            nodes.push(<em key={key}>{children}</em>);
            break;
          case "phonetic":
            nodes.push(
              <span key={key} title={`Pronounced: ${option}`} className="tele-phonetic">
                {children}
              </span>
            );
            break;
          case "volume": {
            const lvl = option?.toLowerCase();
            const cls =
              lvl === "loud"
                ? "tele-loud"
                : lvl === "soft"
                ? "tele-soft"
                : lvl === "strong"
                ? "tele-strong"
                : "tele-volume";
            nodes.push(<span key={key} className={cls}>{children}</span>);
            break;
          }
          case "tone": {
            const tone = option?.toLowerCase();
            const emoji = toneEmojis[tone] || "";
            nodes.push(
              <span key={key} className="tele-tone">
                {emoji} {children} {emoji}
              </span>
            );
            break;
          }
          case "speed": {
            const dir = option?.toLowerCase();
            const sym = dir === "up" ? "↑" : dir === "down" ? "↓" : "";
            nodes.push(
              <span key={key} className={`tele-speed tele-speed-${dir}`}>
                {children.length ? children : sym}
              </span>
            );
            break;
          }
          case "pause": {
            const dur = option?.toLowerCase();
            const symbol = dur === "short" ? "•" : dur === "medium" ? "••" : "•••";
            nodes.push(<span key={key} className={`tele-pause tele-pause-${dur}`}>{symbol}</span>);
            break;
          }
          default:
            nodes.push(<span key={key}>{children}</span>);
        }
  
        pos = matchIndex + match[0].length;
      }
  
      return nodes;
    };
  
    // split paragraphs AFTER parsing to preserve multiline tags
    const paragraphs = text.split(/\n\s*\n/);
  
    return paragraphs.map((para, pIdx) => (
      <p key={`para-${pIdx}`} className="tele-line">
        {processText(para)}
      </p>
    ));
  };


  

const Teleprompter = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [script, setScript] = useState(
    "Welcome to your teleprompter!\n\nPaste your own text in the box below."
  );

  // Smooth scroll function
  const step = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (containerRef.current) {
      containerRef.current.scrollTop += speed * delta;

      // Stop if reached bottom
      const maxScroll =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
      if (containerRef.current.scrollTop >= maxScroll) {
        setIsScrolling(false);
        return;
      }

      animationRef.current = requestAnimationFrame(step);
    }
  };

  const startScrolling = () => {
    if (!containerRef.current) return;

    // Reset scroll to top if at bottom
    if (
      containerRef.current.scrollTop >=
      containerRef.current.scrollHeight - containerRef.current.clientHeight
    ) {
      containerRef.current.scrollTop = 0;
    }

    if (!isScrolling) {
      setIsScrolling(true);
      lastTimeRef.current = 0;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(step);
    }
  };

  const stopScrolling = () => {
    setIsScrolling(false);
    cancelAnimationFrame(animationRef.current);
    lastTimeRef.current = 0;
  };

  const toggleMirror = () => setIsMirrored((prev) => !prev);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      elem.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
<div className={`teleprompter ${isMirrored ? "mirrored" : ""} ${isFullscreen ? "fullscreen" : ""}`}>

     
      {/* Only show input when NOT in fullscreen */}
      {!isFullscreen && (
         <>
      <TopBar />  {/* <-- your logo bar */}
        <textarea
          className="script-input"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          rows={6}
        />
         </>
      )}

<div ref={containerRef} className="teleprompter-text">
  {parseTeleprompterText(script)}
</div>

      <div className="controls">
        <button onClick={startScrolling}>Start</button>
        <button onClick={stopScrolling}>Stop</button>
        <button onClick={toggleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
        <button onClick={toggleMirror}>
          {isMirrored ? "Normal" : "Mirror Mode"}
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="20"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <span>{speed}px/sec</span>
        </label>
      </div>
      
      <TeleprompterLegend />
    </div>
  );
};

export default Teleprompter;
