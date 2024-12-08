import React from "react";

const Card = ({ id, image, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : "default"} ${
        isMatched ? "matched" : ""
      }`}
      onClick={() => !isFlipped && !isMatched && onClick(id)}
    >
      {isFlipped || isMatched ? (
        <img src={image} alt="Card" className="card-image" />
      ) : null}
    </div>
  );
};

export default Card;