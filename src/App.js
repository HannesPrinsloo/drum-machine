import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const drumButtons = {
  Q: {
    name: 'Heater-1',
    text: 'Q',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  W: {
    name: 'Heater-2',
    text: 'W',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  E: {
    name: 'Heater-3',
    text: 'E',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  A: {
    name: 'Heater-4',
    text: 'A',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  S: {
    name: 'Clap',
    text: 'S',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  D: {
    name: 'Open-HH',
    text: 'D',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  Z: {
    name: "Kick-n'-Hat",
    text: 'Z',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  X: {
    name: 'Kick',
    text: 'X',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  C: {
    name: 'Closed-HH',
    text: 'C',
    URL: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  }
};


const Main = () => {
  const [displaySoundName, setDisplaySoundName] = useState('');
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  
  
  const handleClick = (event) => {
    console.log("Button clicked!");
    console.log("Event target:", event.target);
  
    const audio = event.target.querySelector(".clip");
    audio.play();
    setDisplaySoundName(event.target.id);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key.toUpperCase();
      if (drumButtons.hasOwnProperty(keyPressed)) {
        const audioElement = document.getElementById(keyPressed);
        if (audioElement) {
          audioElement.play();
          setDisplaySoundName(drumButtons[keyPressed].name);
        }
      }
    };

    

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
    
  const finalVolume = muted ? 0 : volume ** 2;

  return (
    <div id="drum-machine">
      <h1>Drum Machine</h1>
      <p>Click or press the keys to start playing</p>
      <Buttons 
        handleClick={handleClick}
        volume={finalVolume}
        muted={muted}/>
      <Controls 
        displaySound={displaySoundName}
        volume={volume}
        setVolume={setVolume}
        muted={muted}
        setMuted={setMuted}
        finalVolume={finalVolume}
      />
    </div>
  )
};

const buttonKeys = Object.keys(drumButtons);
const qwe = buttonKeys.filter((key) => key === 'Q' || key === 'W' || key === 'E');
const asd = buttonKeys.filter((key) => key === 'A' || key === 'S' || key === 'D');
const zxc = buttonKeys.filter((key) => key === 'Z' || key === 'X' || key === 'C');
console.log("qwe", qwe);
console.log("asd", asd);
console.log("zxc", zxc);


const Buttons = ({handleClick, volume, muted}) => {
  useEffect(() => {
    const audioClips = document.querySelectorAll('.clip');
    audioClips.forEach((audio) => {
      audio.volume = volume;
      audio.muted = muted;
    });
  }, [volume, muted]);

  return (
    <div id="buttons" className="row">

      {qwe.map((key) => (
        <button 
          id={drumButtons[key].name} 
          className="drum-pad col-md-4 row1" 
          onClick={handleClick} 
          key={drumButtons[key].name}
        >
        {drumButtons[key].text}
          <audio 
            id={drumButtons[key].text} 
            src={drumButtons[key].URL} 
            className="clip"
          ></audio>
        </button>
      ))}

      {asd.map((key) => (
        <button 
          id={drumButtons[key].name} 
          className="drum-pad col-md-4 row2" 
          onClick={handleClick}
          key={drumButtons[key].name}
        >
          {drumButtons[key].text}
          <audio 
            id={drumButtons[key].text} 
            src={drumButtons[key].URL} 
            className="clip"
          ></audio>
        </button>
      ))}

      {zxc.map((key) => (
        <button 
          id={drumButtons[key].name} 
          className="drum-pad col-md-4 row3" 
          onClick={handleClick}
          key={drumButtons[key].name}
        >
          {drumButtons[key].text}
          <audio 
            id={drumButtons[key].text} 
            src={drumButtons[key].URL} 
            className="clip"
          ></audio>
        </button>
      ))}

    </div>
  )
};

const Controls = ({displaySound, volume, setVolume, muted, setMuted, finalVolume}) => {

  return (
    <div id="controls">
      <div id="power"></div>
      <div id="display" className="text-center"><p>{displaySound}</p></div>
      <div id="volume">
      <section className="d-grid gap-2 col-6 mx-auto">
        <hr></hr>
        <h6 className="text-center">VOLUME</h6>
        <input
          className="form-range"
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
        <button className="btn btn-primary mx-auto" onClick={() => setMuted(m => !m)}>
          {muted ? "unmute" : "mute"}
        </button>
      </section>
      <section className="d-grid gap-2 col-6 mx-auto">
        <p className="text-center volume-display">-VOLUME LEVEL-<br></br>{Math.floor(finalVolume * 100)}</p>
      </section>
      </div>
    </div>

  )
};

export default Main;
