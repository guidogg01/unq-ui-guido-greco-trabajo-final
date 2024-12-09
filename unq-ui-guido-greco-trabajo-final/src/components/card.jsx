import React from "react";

const Card = ({ id, image, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : "default"} ${
        isMatched ? "matched" : ""
      }`}
      onClick={() => !isFlipped && !isMatched && onClick(id)}
    >
      <div className="card-inner">
        <div className="card-front">
          {isFlipped || isMatched ? (
            <img className="card-image" src={image} alt="Card" />
          ) : null}
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;
