import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Board from "../components/board";
import cardsBandas from "../cardsData";
import "../styles/board.css";
import "../styles/card.css";

const MemoTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [points, setPoints] = useState(0);
  const [remainingTries, setRemainingTries] = useState(5); // Para Gira Mundial
  const [highScoreEnsayo, setHighScoreEnsayo] = useState(
    parseInt(localStorage.getItem("highScoreEnsayo")) || 0
  );
  const [highScoreConcierto, setHighScoreConcierto] = useState(
    parseInt(localStorage.getItem("highScoreConcierto")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  const difficulty = location.state?.difficulty || "Ensayo";

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const numPairs = difficulty === "Concierto" ? 18 : difficulty === "Gira Mundial" ? 18 : 8; 
    const selectedCards = cardsBandas.slice(0, numPairs);
    const shuffledCards = [...selectedCards, ...selectedCards]
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
    if (difficulty === "Gira Mundial") {
      setRemainingTries(10); // Reiniciar intentos para Gira Mundial
    }
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
            if (difficulty === "Gira Mundial") {
              setRemainingTries((prev) => prev - 1); // Reducir intentos restantes
            }
            setFlippedCards([]);
          }, 1260);
        }
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      if (difficulty === "Ensayo" && points > highScoreEnsayo) {
        setHighScoreEnsayo(points);
        localStorage.setItem("highScoreEnsayo", points);
      } else if (difficulty === "Concierto" && points > highScoreConcierto) {
        setHighScoreConcierto(points);
        localStorage.setItem("highScoreConcierto", points);
      }
      alert(`¡GANASTE! Tu puntuación final fue: ${points}`);
      setGameOver(true);
      navigate("/game-over");
    } else if (difficulty === "Gira Mundial" && remainingTries === 0) {
      alert("¡Se agotaron los intentos! Game Over.");
      setGameOver(true);
      navigate("/game-over");
    }
  }, [matchedCards, cards, points, highScoreEnsayo, highScoreConcierto, remainingTries, navigate, difficulty]);

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
        {difficulty === "Gira Mundial" && <p>Intentos restantes: {remainingTries}</p>}
        <p>
          Mejor puntuación:{" "}
          {difficulty === "Ensayo"
            ? highScoreEnsayo
            : difficulty === "Concierto"
            ? highScoreConcierto
            : ""}
        </p>
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
