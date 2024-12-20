import React from 'react';
import '../style/Home.css';
import background from "../img/bg.mp4";

function Home() {
  return (
    <div className="home">
      <header className="home-header">
      <video autoPlay muted loop id="background-video">
        <source src={background} type="video/mp4" />
      </video>
      </header>
    </div>
  );
}


export default Home;