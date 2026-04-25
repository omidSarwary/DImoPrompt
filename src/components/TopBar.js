import React, { useState } from "react";
import './TopBar.css'; // create this file for styling




const TopBar = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="logo"><span className="logo-text">Dimo<span className="logo-highlight">Prompt</span></span></div>
        <div className="top-bar-buttons">
          <button onClick={() => setShowAbout(true)}>About</button>
          <button onClick={() => setShowHowTo(true)}>How to Use</button>
        </div>
      </div>

      {/* About Popup */}
      {showAbout && (
        <div className="popup-overlay" onClick={() => setShowAbout(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>About</h2>
            <h3>DimoPrompt Teleprompter</h3>

            <p>DimoPrompt is a modern teleprompter app designed for smooth, professional presentations. It is ideal for content creators, speakers, and especially non-English speakers, helping them read scripts naturally with pronunciation, tone, and pacing cues.</p>

            <h4>Key Features:</h4>

            <p>Adjustable Scrolling Speed – read at your own pace.</p>

            <p>Mirror Mode – perfect for reflective teleprompter setups.</p>

            <p>Stress & Emphasis Markings – highlight tricky words.</p>

            <p>Phonetic Guides – [phonetic:jif] pronounced correctly.</p>

            <p>Volume & Tone – show emphasis and emotional cues.</p>

            <p>Speed – speed up or slow down reading.</p>

            Hover words to hear them aloud via <span className="tele-tts">Text-to-Speech</span>.

            <h4>Example Script Formatted:</h4>

            <p className="tele-line"> <span className="tele-tone-excited"><span className="tele-loud">Welcome</span></span> everyone! Today we will learn how to <strong>[stress:take CONTROL]</strong> of your <em>[secondary:mindset]</em> and <span className="tele-strong">achieve success</span>. <span className="tele-pause tele-pause-short">•</span> Remember, practice makes perfect! </p>

            <h4>Why It’s Great for Non-English Speakers:</h4>

            <p>See exactly how to pronounce tricky words with phonetic hints.</p>

            <p>Highlight stress, tone, and volume for natural delivery.</p>

            <p>Adjust reading speed and pauses to match your comfort.</p>

            <p>DimoPrompt turns any script into an interactive, easy-to-read teleprompter that teaches pronunciation, pacing, and expression while keeping your focus on the message.</p>
            <button onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}

      {/* How to Use Popup */}
      {showHowTo && (
        <div className="popup-overlay" onClick={() => setShowHowTo(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div class="popup-text">

              <h2>Teleprompter Marking Guide</h2>
              <div style={{ textAlign: "left" }}>
                <p>
                  The teleprompter supports <strong>custom performance tags</strong> to
                  help narrators control delivery, tone, and pacing. Each tag must have
                  a <strong>starting</strong> and <strong>ending</strong> tag, like HTML:
                </p>
                <pre style={{ background: "#2c2f7a", padding: "8px", borderRadius: "6px", overflowX: "auto" }}>
                  {`[tone:calm]This is calm[/tone]
[stress]Emphasize this[/stress]
[pause:short][/pause]`}
                </pre>

                <h3 style={{ color: "#ffcc00", marginTop: "1em" }}>Tag Reference</h3>
                <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.8em" }}>
                  <li><strong>[volume:loud][/volume]</strong> → <span className="tele-loud">Bold red voice</span></li>
                  <li><strong>[volume:soft][/volume]</strong> → <span className="tele-soft">Faded voice</span></li>
                  <li><strong>[volume:strong][/volume]</strong> → <span className="tele-strong">Strong emphasis</span></li>

                  <li><strong>[tone:excited][/tone]</strong> → <span className="tele-tone-excited">Excited tone 🎉</span></li>
                  <li><strong>[tone:serious][/tone]</strong> → <span className="tele-tone-serious">Serious tone 💼</span></li>
                  <li><strong>[tone:happy][/tone]</strong> → <span className="tele-tone-happy">Happy tone 😊</span></li>
                  <li><strong>[tone:sad][/tone]</strong> → <span className="tele-tone-sad">Sad tone 😔</span></li>

                  <li><strong>[stress][/stress]</strong> → <strong>Bold emphasis</strong></li>
                  <li><strong>[secondary][/secondary]</strong> → <em>Secondary or softer</em></li>

                  <li><strong>[pause:short][/pause]</strong> → <span className="tele-pause-short">• short pause</span></li>
                  <li><strong>[pause:long][/pause]</strong> → <span className="tele-pause-long">•• long pause</span></li>

                  <li><strong>[speed:up][/speed]</strong> → <span className="tele-speed-up">↑ speak faster</span></li>
                  <li><strong>[speed:down][/speed]</strong> → <span className="tele-speed-down">↓ slow down</span></li>
                </ul>

                <h3 style={{ color: "#ffcc00", marginTop: "1em" }}>Formatting Rules</h3>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", lineHeight: "1.6em" }}>
                  <li>All tags must include a <strong>starting</strong> and <strong>ending</strong> tag.</li>
                  <li>Parameterized tags (like tone or volume) use this format: <code>[tone:calm]text[/tone]</code></li>
                  <li>Empty tags (like pauses) use: <code>[pause:short][/pause]</code></li>
                  <li>Tags can span multiple lines — formatting will still apply correctly.</li>
                </ul>
              </div>
              <h2>Example AI Prompt for Teleprompter</h2>
              <div className="teleprompter-description">
                <p>
                  This AI prompt is designed for a <strong>teleprompter script system</strong>. It instructs the AI to:
                </p>
                <ul>
                  <li>Analyze the input text and determine the appropriate delivery style for narration.</li>
                  <li>Add <strong>performance markup tags</strong> to the text, including:
                    <ul>
                      <li><strong>Tone</strong> (e.g., excited, calm, happy)</li>
                      <li><strong>Volume</strong> (e.g., loud, soft, strong)</li>
                      <li><strong>Stress</strong> and <strong>secondary emphasis</strong></li>
                      <li><strong>Pauses</strong> and <strong>speed changes</strong></li>
                    </ul>
                  </li>
                  <li><strong>Capitalize stressed syllables</strong> in hard words according to <strong>American English pronunciation</strong>. Ask the AI to identify which syllable should be stressed and mark only those.</li>
                  <li>Ensure all tags are <strong>properly nested with starting and ending tags</strong>.</li>
                  <li>Format the text to make it <strong>engaging, dynamic, and fun</strong> for a YouTube audience.</li>
                  <li>Output a <strong>fully tagged script</strong> ready to use in the teleprompter, without extra explanations.</li>
                </ul>

                <p>
                  In short, it transforms plain script text into a <strong>professionally formatted, performance-ready script</strong> that visually guides narrators in pacing, tone, emphasis, and pronunciation.
                </p>
              </div>
              <pre className="teleprompter-example">
                📌 GPT Teleprompter Script Instruction (Compact)

                You are an expert voice director AI. Your task is to analyze a script and add performance markup for an engaging YouTube narration using this teleprompter system.

                Tag Rules:
                - All tags must have a starting and ending tag.
                - Parameterized tags: [tone:calm]text[/tone], [volume:loud]text[/volume]
                - Empty tags: [pause:short][/pause]
                - Nested tags allowed, always close them in order.
                - Tags can span multiple lines.

                Tag Reference:
                [volume:loud][/volume] → Bold red, energetic
                [volume:soft][/volume] → Faded, gentle
                [volume:strong][/volume] → Strong emphasis, orange
                [tone:excited][/tone] → Excited 🎉
                [tone:serious][/tone] → Serious 💼
                [tone:happy][/tone] → Happy 😊
                [tone:sad][/tone] → Sad 😔
                [stress][/stress] → Bold emphasis
                [secondary][/secondary] → Italic, softer
                [pause:short][/pause] → • Short pause
                [pause:long][/pause] → •• Long pause
                [speed:up][/speed] → ↑ Faster
                [speed:down][/speed] → ↓ Slower

                Pronunciation:
                - Capitalize the stressed syllable for hard words using American English.
                - Example:
                confidentiality → con-fi-den-[stress]SHIAL[/stress]-i-ty
                responsibility → re-spon-[stress]SI[/stress]-bil-i-ty

                Performance Guidelines:
                - Make the narration fun, dynamic, and engaging for YouTube.
                - Apply tone, stress, pauses, and speed naturally.
                - Avoid over-tagging; prioritize readability and flow.

                Output:
                - Return only the fully tagged script, ready to paste into the teleprompter.
                - Do not add explanations or extra notes.
              </pre>

            </div>

            <button onClick={() => setShowHowTo(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;

