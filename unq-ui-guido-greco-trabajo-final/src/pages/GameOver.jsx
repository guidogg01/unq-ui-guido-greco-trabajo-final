import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/gameOver.css"; 

const GameOver = () => {
  const navigate = useNavigate();
  
  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="game-over-container">
      <h1>¡Juego Terminado!</h1>
      <p>Gracias por jugar.</p>
      <p>¡Intenta nuevamente!</p>
      <button onClick={handleRestart}>Volver al inicio</button>
    </div>
  );
};

export default GameOver;
