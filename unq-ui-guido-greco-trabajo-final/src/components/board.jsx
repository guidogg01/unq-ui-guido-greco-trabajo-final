import React from "react";
import Card from "./card";

const Board = ({ cards, flippedCards, matchedCards, onCardClick }) => {
  const numColumns = Math.sqrt(cards.length);

  return (
    <div
      className="board-container"
      style={{
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
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
