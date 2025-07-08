import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({ name, transliteration, meaning }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front */}
      <div
        onClick={() => setIsFlipped(true)}
        className="cursor-pointer bg-white p-6 rounded-xl shadow-lg text-center hover:bg-green-100 transition"
      >
        <h2 className="text-3xl font-bold text-green-800">{name}</h2>
        <p className="mt-2 text-sm text-gray-500">Click to reveal</p>
      </div>

      {/* Back */}
      <div
        onClick={() => setIsFlipped(false)}
        className="cursor-pointer bg-green-50 p-6 rounded-xl shadow-lg text-center"
      >
        <p className="text-xl font-semibold text-green-900">{transliteration}</p>
        <p className="mt-2 text-gray-700">{meaning}</p>
        <p className="mt-2 text-sm text-gray-500">Click to flip back</p>
      </div>
    </ReactCardFlip>
  );
};

export default FlipCard;
