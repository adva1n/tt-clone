import { useContext } from "react";
import { SoundContext } from "../context/SoundContext";

const SoundButton = () => {
  const { isMuted, toggleSound } = useContext(SoundContext);

  return (
    <button onClick={toggleSound} className="global-sound-btn">
      {isMuted ? "🔇 Включить звук" : "🔊 Выключить звук"}
    </button>
  );
};

export default SoundButton;
