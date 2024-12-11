import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="banner">
        <h2>¡Pon a prueba tu memoria con Rock Nacional!</h2>
      </div>
      <h1>¡Bienvenido a MemoTest!</h1>
      <p>Pon a prueba tu memoria en este divertido juego.</p>
      <p>¡Encontrá las parejas de las bandas de rock nacional y acumula puntos!</p>
      <div className="difficulty-buttons">
        <button onClick={() => navigate("/play", { state: { difficulty: "Ensayo" } })}>
          Modo Ensayo
        </button>
        <button onClick={() => navigate("/play", { state: { difficulty: "Concierto" } })}>
          Modo Concierto
        </button>
        <button onClick={() => navigate("/play", { state: { difficulty: "Gira Mundial" } })}>
          Modo Gira Mundial
        </button>
        <button onClick={() => navigate("/play", { state: { difficulty: "Duelo de Bandas" } })}>
          Modo Duelo de Bandas
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
