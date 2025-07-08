import React from "react";

const NameCard = ({ name, transliteration, meaning, audio }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center space-y-2 hover:scale-105 transition">
      <h2 className="text-3xl font-bold text-green-700">{name}</h2>
      <p className="text-gray-700 italic">{transliteration}</p>
      <p className="text-sm text-gray-500">{meaning}</p>
      <audio controls className="w-full">
        <source src={audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default NameCard;
