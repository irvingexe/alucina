import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
//import AddIcon from '@material-ui/icons/Add';

import "./App.css";

function App() {
  const [color, setColor] = useState([
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
  ]);

  const randomColor = () => {
    setColor([Math.random() * 255, Math.random() * 255, Math.random() * 255]);
  };

  return (
    <div onClick={randomColor} className="App">
      <div className="sketch">
        <P5Wrapper sketch={sketch} color={color}></P5Wrapper>
      </div>
      <div className="logo">
        ALUCINA <br />
        ART_TECHNOLOGY <br />
        STUDIO
      </div>
      <p className="welcome">
        Stunning projects in the intersection of art and technology
      </p>
      <div className="work">+</div>
    </div>
  );
}

export default App;
