import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";  // Asegúrate de que el archivo CSS esté importado.

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/play");
  };

  return (
    <div className="home-container">
      <div className="banner">
        <h2>¡Pon a prueba tu memoria con Rock Nacional!</h2>
      </div>
      <h1>¡Bienvenido a MemoTest!</h1>
      <p>
        Pon a prueba tu memoria en este divertido juego.
      </p>
      <p>¡Encontrá las parejas de las bandas de rock nacional y acumula puntos!</p>
      <button onClick={handleStartGame}>Comenzar Juego</button>
    </div>
  );
};

export default HomeScreen;
