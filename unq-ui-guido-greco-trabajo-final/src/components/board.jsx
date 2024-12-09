import React from "react";
import Card from "./Card";

const Board = ({ cards, flippedCards, matchedCards, onCardClick }) => {
  const numColumns = Math.sqrt(cards.length); // Calcula dinámicamente las columnas en base al número de cartas

  return (
    <div
      className="board-container"
      style={{
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`, // Ajusta el número de columnas según las cartas
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default Board;
