import React, { useEffect, useState } from "react";

const Home = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch API Data
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
        const json = await res.json();
        setNames(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching names:", error);
        setLoading(false);
      }
    };
    fetchNames();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-green-800">
        Loading 99 Names of Allah...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white p-6">
      <h2 className="text-3xl font-bold text-center text-green-900 dark:text-green-300 mb-4">
        99 Names of Allah (Asma ul Husna)
      </h2>

      {/* 📋 Display Names Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {names.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center hover:scale-105 transition"
          >
            <h3 className="text-2xl text-green-800 dark:text-green-300 font-bold">{item.name}</h3>
            <p className="italic text-gray-600 dark:text-gray-300">{item.transliteration}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.en.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
