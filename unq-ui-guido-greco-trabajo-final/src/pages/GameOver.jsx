import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/gameOver.css";

const GameOver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const points = location.state?.points || 0;
  const difficulty = location.state?.difficulty || "Ensayo";
  const { player1, player2 } = location.state || {};

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

  const getHighScoreEnsayo = () => {
    const highScoreEnsayo = parseInt(localStorage.getItem("highScoreEnsayo")) || 0;
    return highScoreEnsayo;
  };

  const getHighScoreConcierto = () => {
    const highScoreConcierto = parseInt(localStorage.getItem("highScoreConcierto")) || 0;
    return highScoreConcierto;
  };

  const getHighScoreGiraMundial = () => {
    const highScoreGiraMundial = parseInt(localStorage.getItem("highScoreGiraMundial")) || 0;
    return highScoreGiraMundial;
  };

  const getHighScoreDuelo = () => {
    const highScoreDuelo = parseInt(localStorage.getItem("highScoreDuelo")) || 0;
    return highScoreDuelo;
  };

  const saveHighScore = () => {
    const winnerScore = Math.max(player1, player2);
    const highScoreDuelo = getHighScoreDuelo();
    if (winnerScore > highScoreDuelo) {
      localStorage.setItem("highScoreDuelo", winnerScore);
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  const finalMessage = getFinalMessage();
  saveHighScore();

  const getWinnerMessage = () => {
    if (player1 === player2) {
      return "¡Es un empate! Ambos jugadores demostraron ser unos cracks del rock.";
    } else if (player1 > player2) {
      return "¡Jugador 1 es el ganador! ¡Un verdadero ídolo del rock argentino!";
    } else {
      return "¡Jugador 2 es el ganador! ¡Te consagraste como una leyenda del rock!";
    }
  };

  return (
    <div className="game-over-container">
      <h1>Game Over</h1>
      {difficulty === "Duelo de Bandas" 
        ? (
          <>
            <p>Jugador 1: {player1} puntos</p>
            <p>Jugador 2: {player2} puntos</p>
            <p>{getWinnerMessage()}</p>
            <p>Mejor puntuación histórica: {getHighScoreDuelo()}</p>
          </>
        )
        :difficulty === "Ensayo"
          ? (
            <>
              <p>¡Tu puntuación final fue: {points} puntos!</p>
              <p>{finalMessage}</p>
              <p>Mejor puntuación histórica: {getHighScoreEnsayo()}</p>
            </>
          )
          : difficulty === "Concierto"
            ? ( <>
              <p>¡Tu puntuación final fue: {points} puntos!</p>
              <p>{finalMessage}</p>
              <p>Mejor puntuación histórica: {getHighScoreConcierto()}</p>
            </>
          )
          : difficulty === "Gira Mundial"
            ? (
            <>
              <p>¡Tu puntuación final fue: {points} puntos!</p>
              <p>{finalMessage}</p>
              <p>Mejor puntuación histórica: {getHighScoreGiraMundial()}</p>
            </>
          ) : ""
        
      }
      
      <button onClick={handleRestart}>Volver a empezar</button>
    </div>
  );
  
};

export default GameOver;
