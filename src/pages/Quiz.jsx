import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [names, setNames] = useState([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalQuestions = 10;

  // ✅ Fetch from Aladhan API
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
        const json = await res.json();
        setNames(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch names:", error);
        setLoading(false);
      }
    };
    fetchNames();
  }, []);

  // 🎲 Generate random options for current question
  useEffect(() => {
    if (names.length === 0 || current >= names.length) return;
    const correct = names[current];
    const wrong = names
      .filter((n, idx) => idx !== current)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const shuffled = [...wrong, correct].sort(() => 0.5 - Math.random());
    setOptions(shuffled);
  }, [names, current]);

  const handleAnswer = (option) => {
    const correct = names[current];
    setSelectedOption(option);
    if (option.name === correct.name) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, { ...correct, correct: true }]);
    } else {
      setCorrectAnswers([
        ...correctAnswers,
        { ...correct, correct: false, chosen: option },
      ]);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (current + 1 >= totalQuestions) {
        setQuizFinished(true);
      } else {
        setCurrent((prev) => prev + 1);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-green-700">
        Loading Quiz...
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-800 dark:text-green-300">
          Quiz Results
        </h2>
        <p className="text-center text-lg mb-6">
          Your Score: {score} / {totalQuestions}
        </p>
        <div className="space-y-4 max-w-xl mx-auto">
          {correctAnswers.map((ans, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow ${
                ans.correct ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
              }`}
            >
              <p className="text-lg font-semibold">
                {index + 1}. {ans.name} ({ans.transliteration}) — {ans.en.meaning}
              </p>
              {!ans.correct && (
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  ❌ Your Answer: {ans.chosen.en.meaning}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Quiz Mode</h2>
      <h3 className="text-lg mb-4 text-center">
        What is the meaning of:{" "}
        <span className="text-green-800 dark:text-green-300 font-bold text-2xl">
          {names[current]?.name}
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(opt)}
            className={`p-4 border rounded-xl shadow text-left transition
              ${
                selectedOption?.name === opt.name
                  ? opt.name === names[current].name
                    ? "bg-green-300 dark:bg-green-700"
                    : "bg-red-300 dark:bg-red-700"
                  : "bg-white dark:bg-gray-800"
              }`}
            disabled={!!selectedOption}
          >
            {opt.en.meaning}
          </button>
        ))}
      </div>
      <p className="mt-6 text-center text-lg">
        Question {current + 1} / {totalQuestions}
      </p>
    </div>
  );
};

export default Quiz;
