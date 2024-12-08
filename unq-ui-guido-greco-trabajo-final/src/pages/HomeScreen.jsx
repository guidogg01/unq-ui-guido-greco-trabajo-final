import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/play");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>¡Bienvenido a MemoTest!</h1>
      <p>
        Pon a prueba tu memoria en este divertido juego. Encuentra las parejas
        de cartas y acumula puntos.
      </p>
      <button
        onClick={handleStartGame}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Comenzar Juego
      </button>
    </div>
  );
};

export default HomeScreen;
