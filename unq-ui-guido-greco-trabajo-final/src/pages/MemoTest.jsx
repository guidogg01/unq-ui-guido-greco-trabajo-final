import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/board";
import cardsBandas from "../cardsData";

// Importamos los archivos de estilos
import "../styles/board.css";  // Estilos del tablero
import "../styles/card.css";   // Estilos de las cartas

const MemoTest = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardsBandas, ...cardsBandas]
      .map((card, index) => ({
        ...card,
        id: `${card.image}-${index}`,
        flipped: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setPoints(0);
    setGameOver(false);
  };

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      const newFlippedCards = [...flippedCards, id];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setAttempts((prev) => prev + 1);
        const [first, second] = newFlippedCards;
        const firstCard = cards.find((card) => card.id === first);
        const secondCard = cards.find((card) => card.id === second);

        if (firstCard.image === secondCard.image) {
          setTimeout(() => {
            setMatchedCards((prev) => [...prev, first, second]);
            setPoints((prev) => prev + 10);
            setFlippedCards([]);
          }, 1000);
        } else {
          setTimeout(() => {
            setPoints((prev) => Math.max(0, prev - 2));
            setFlippedCards([]);
          }, 1260);
        }
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      if (points > highScore) {
        setHighScore(points);
        localStorage.setItem("highScore", points);
      }
      alert(`¡GANASTE! Tu puntuación final fue: ${points}`);
      setGameOver(true);
    }
  }, [matchedCards, cards, points, highScore]);

  const handleRestart = () => {
    initializeGame();
    navigate("/");
  };

  return (
    <div className="memorization-container">
      <h1 className="memorization-header">MemoTest</h1>
      <div className="memorization-info">
        <p>Intentos: {attempts}</p>
        <p>Puntos: {points}</p>
        <p>Mejor puntuación: {highScore}</p>
      </div>
      <Board
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onCardClick={handleCardClick}
      />
      {gameOver && <button onClick={handleRestart}>Reiniciar juego</button>}
    </div>
  );
};

export default MemoTest;
