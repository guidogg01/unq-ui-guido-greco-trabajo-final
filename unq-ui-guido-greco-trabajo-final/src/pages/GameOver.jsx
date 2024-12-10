import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/gameOver.css";

const GameOver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const points = location.state?.points || 0;
  const difficulty = location.state?.difficulty || "Ensayo";

  const getFinalMessage = () => {
    if (difficulty === "Concierto" || difficulty === "Gira Mundial") {
      if (points <= 60) {
        return "Parece que te quedaste en los ensayos de garaje. ¡A seguir practicando, rockstar!";
      } else if (points <= 100) {
        return "Estás en la lista del festival, pero todavía falta para ser cabeza de cartel.";
      } else if (points <= 140) {
        return "¡Callejeros, Las Pastillas del Abuelo y La Vela Puerca estarían orgullosos de vos!";
      } else {
        return "Tu nombre ya está grabado en la historia del rock argentino. ¡Qué crack!";
      }
    } else if (points <= 35) {
      return "Parece que te quedaste en los ensayos de garaje. ¡A seguir practicando, rockstar!";
    } else if (points <= 50) {
      return "Estás en la lista del festival, pero todavía falta para ser cabeza de cartel.";
    } else if (points <= 65) {
      return "¡Callejeros, Las Pastillas del Abuelo y La Vela Puerca estarían orgullosos de vos!";
    } else {
      return "Tu nombre ya está grabado en la historia del rock argentino. ¡Qué crack!";
    }
    
  };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="game-over-container">
      <h1>Game Over</h1>
      <p>¡Tu puntuación final fue: {points} puntos!</p>
      <p>{getFinalMessage()}</p>
      <button onClick={handleRestart}>Volver a empezar</button>
    </div>
  );
};

export default GameOver;
