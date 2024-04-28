import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStepBackward, 
  faStepForward, 
  faFastBackward, 
  faFastForward, 
  faRepeat 
} from '@fortawesome/free-solid-svg-icons';

const MediaPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const audioElement = audioRef.current;
    isPlaying ? audioElement.pause() : audioElement.play();
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleSeek = (e) => {
    const audioElement = audioRef.current;
    const seekTo = e.nativeEvent.offsetX / e.target.offsetWidth * audioElement.duration;
    audioElement.currentTime = seekTo;
  };

  return (
    <div className="media-player bg-gray-900 text-white p-4">
      <div className="player-controls grid grid-cols-6 gap-4">
        <button className="col-span-1" onClick={togglePlay}>
          {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <div className="col-span-4 progress-bar bg-gray-700" onClick={handleSeek}>
          <div className="point" style={{ left: `${currentTime / (duration || 1) * 100}%` }}></div>
        </div>
        <div className="col-span-1 time text-sm text-center grid grid-cols-2 items-center">
          <p>{new Date(currentTime * 1000).toISOString().substring(14, 19)}</p>
          <p>{new Date(duration * 1000).toISOString().substring(14, 19)}</p>
        </div>
        <button className="col-span-1" onClick={() => audioRef.current.currentTime -= 10}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button className="col-span-1" onClick={() => audioRef.current.currentTime += 10}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
        <button className="col-span-1" onClick={() => audioRef.current.currentTime = 0}>
          <FontAwesomeIcon icon={faFastBackward} />
        </button>
        <button className="col-span-1" onClick={() => audioRef.current.currentTime = duration}>
          <FontAwesomeIcon icon={faFastForward} />
        </button>
        <button className="col-span-1" onClick={toggleRepeat}>
          <FontAwesomeIcon icon={repeat ? faRepeat : 'far fa-repeat'} />
        </button>
      </div>
      <audio ref={audioRef} src={src} loop={repeat} />
    </div>
  );
};

export default MediaPlayer;

