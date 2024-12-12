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
  const [remainingTries, setRemainingTries] = useState(20);
  const [points, setPoints] = useState(0);
  const [highScoreEnsayo, setHighScoreEnsayo] = useState(
    parseInt(localStorage.getItem("highScoreEnsayo")) || 0
  );
  const [highScoreConcierto, setHighScoreConcierto] = useState(
    parseInt(localStorage.getItem("highScoreConcierto")) || 0
  );
  const [highScoreGiraMundial, setHighScoreGiraMundial] = useState(
    parseInt(localStorage.getItem("highScoreGiraMundial")) || 0
  );
  const [highScoreDuelo, setHighScoreDuelo] = useState(
    parseInt(localStorage.getItem("highScoreDuelo")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [playerPoints, setPlayerPoints] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("player1");

  const difficulty = location.state?.difficulty || "Ensayo";

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const numPairs =
      difficulty === "Concierto" || difficulty === "Gira Mundial"
        ? 18
        : difficulty === "Duelo de Bandas"
        ? 32
        : 8;

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
    setRemainingTries(20);
    setGameOver(false);
    setPlayerPoints({ player1: 0, player2: 0 });
    setCurrentPlayer("player1");
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
            if (difficulty === "Duelo de Bandas") {
              setPlayerPoints((prev) => ({
                ...prev,
                [currentPlayer]: prev[currentPlayer] + 10,
              }));
            } else {
              setPoints((prev) => prev + 10);
            }
            setFlippedCards([]);
          }, 1000);
        } else {
          setTimeout(() => {
            if (difficulty === "Duelo de Bandas") {
              setPlayerPoints((prev) => ({
                ...prev,
                [currentPlayer]: Math.max(0, prev[currentPlayer] - 2),
              }));
              switchPlayer();
            } else {
              setPoints((prev) => Math.max(0, prev - 2));
              if (difficulty === "Gira Mundial") {
                setRemainingTries((prev) => prev - 1);
              }
            }
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  const switchPlayer = () => {
    setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      if (difficulty === "Ensayo" && points > highScoreEnsayo) {
        setHighScoreEnsayo(points);
        localStorage.setItem("highScoreEnsayo", points);
      } else if (difficulty === "Concierto" && points > highScoreConcierto) {
        setHighScoreConcierto(points);
        localStorage.setItem("highScoreConcierto", points);
      } else if (difficulty === "Gira Mundial" && points > highScoreGiraMundial) {
        setHighScoreGiraMundial(points);
        localStorage.setItem("highScoreGiraMundial", points);
      } else if (difficulty === "Duelo de Bandas") {
        const winnerScore = Math.max(playerPoints.player1, playerPoints.player2);
        if (winnerScore > highScoreDuelo) {
          setHighScoreDuelo(winnerScore);
          localStorage.setItem("highScoreDuelo", winnerScore);
          
        }
        setGameOver(true);
        localStorage.setItem("jugador1", playerPoints.player1);
        localStorage.setItem("jugador2", playerPoints.player2);
      }
      setGameOver(true);
      navigate("/game-over", { state: { points, difficulty } });
    } else if (difficulty === "Gira Mundial" && remainingTries === 0) {
      setGameOver(true);
      navigate("/game-over", { state: { points, difficulty } });
    }
  }, [
    matchedCards,
    cards,
    points,
    playerPoints,
    highScoreEnsayo,
    highScoreConcierto,
    highScoreGiraMundial,
    highScoreDuelo,
    remainingTries,
    navigate,
    difficulty,
  ]);

  const handleRestart = () => {
    initializeGame();
    navigate("/");
  };

  return (
    <div className="memorization-container">
      <h1 className="memorization-header">MemoTest</h1>
      <div className="memorization-info">
        <p>Intentos: {attempts}</p>
        {difficulty === "Ensayo" || difficulty === "Concierto" || difficulty === "Gira Mundial" 
          ? <p>Puntos: {points}</p> 
          : ""
        }
        {difficulty === "Duelo de Bandas" && (
          <>
            <p>Puntos Jugador 1: {playerPoints.player1}</p>
            <p>Puntos Jugador 2: {playerPoints.player2}</p>
            <p>
              Turno actual:{" "}
              <span
                style={{
                  color: currentPlayer === "player1" ? "blue" : "red",
                }}
              >
                {currentPlayer === "player1" ? "Jugador 1" : "Jugador 2"}
              </span>
            </p>
          </>
        )}
        {difficulty === "Gira Mundial" && (
          <p>Intentos restantes: {remainingTries}</p>
        )}
        <p>
          Mejor puntuación:{" "}
          {difficulty === "Ensayo"
            ? highScoreEnsayo
            : difficulty === "Concierto"
            ? highScoreConcierto
            : difficulty === "Gira Mundial"
            ? highScoreGiraMundial
            : difficulty === "Duelo de Bandas"
            ? highScoreDuelo
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
