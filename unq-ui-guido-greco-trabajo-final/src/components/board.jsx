import React from "react";
import Card from "./Card";

const Board = ({ cards, flippedCards, matchedCards, onCardClick }) => {
  return (
    <div className="card-grid">
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