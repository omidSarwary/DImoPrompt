import React from "react";
import "../Teleprompter.css";

const TeleprompterLegend = () => {
  return (
    <div className="teleprompter-legend-horizontal w-full py-2 px-4 text-xs text-white bg-black/60 backdrop-blur-md flex flex-wrap justify-center items-center gap-4 border-t border-gray-700">
      {/* Volume */}
      <span><strong className="tele-loud">Bold Red</strong> = [volume:loud]</span>
      <span><span className="tele-soft">Faded</span> = [volume:soft]</span>
      <span><span className="tele-strong">Orange Strong</span> = [volume:strong]</span>

      {/* Tone (emoji markers) */}
      <span>🤩 Excited 🤩 = [tone:excited]</span>
      <span>😐 Serious 😐 = [tone:serious]</span>
      <span>😊 Happy 😊 = [tone:happy]</span>
      <span>😢 Sad 😢 = [tone:sad]</span>
      <span>😠 Angry 😠 = [tone:angry]</span>
      <span>😌 Calm 😌 = [tone:calm]</span>

      {/* Stress */}
      <span><strong>Bold</strong> = [stress:word]</span>
      <span><em>Italic</em> = [secondary:word]</span>

      {/* Phonetic hover */}
      <span><span className="tele-phonetic" title="tooltip">Phonetic</span> = [phonetic:word]</span>

      {/* Pause */}
      <span><span className="tele-pause-short">•</span> = short pause</span>
      <span><span className="tele-pause-medium">••</span> = medium pause</span>
      <span><span className="tele-pause-long">•••</span> = long pause</span>

      {/* Speed */}
      <span><span className="tele-speed-up">↑</span> = speed up</span>
      <span><span className="tele-speed-down">↓</span> = slow down</span>
    </div>
  );
};

export default TeleprompterLegend;
