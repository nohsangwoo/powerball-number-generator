'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PowerballSet {
  mainNumbers: number[];
  powerball: number;
}

function generatePowerballNumbers(setCount: number): PowerballSet[] {
  const sets: PowerballSet[] = [];
  for (let i = 0; i < setCount; i++) {
    // Generate 5 unique numbers between 1 and 69 for the main draw
    const mainNumbers: number[] = [];
    while (mainNumbers.length < 5) {
      const num = Math.floor(Math.random() * 69) + 1;
      if (!mainNumbers.includes(num)) {
        mainNumbers.push(num);
      }
    }
    mainNumbers.sort((a, b) => a - b);

    // Generate 1 number between 1 and 26 for the Powerball
    const powerball = Math.floor(Math.random() * 26) + 1;

    sets.push({ mainNumbers, powerball });
  }
  return sets;
}

export default function PowerballGenerator() {
  const [setCount, setSetCount] = useState<number>(1);
  const [generatedSets, setGeneratedSets] = useState<PowerballSet[]>([]);

  const handleGenerate = () => {
    const sets = generatePowerballNumbers(setCount);
    setGeneratedSets(sets);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-8 text-purple-400"
      >
        Powerball Number Generator
      </motion.h1>
      <div className="w-full max-w-md mb-8">
        <label className="block mb-2">
          Number of sets to generate:
          <input
            type="number"
            value={setCount}
            onChange={(e) => setSetCount(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
        </label>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Generate
        </motion.button>
      </div>
      <AnimatePresence>
        {generatedSets.map((set, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full max-w-md"
          >
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-2/3 mb-2 md:mb-0">
                <strong className="text-purple-400">Main numbers:</strong>
                <div className="flex space-x-2 mt-2">
                  {set.mainNumbers.map((num, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 500 }}
                      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 text-right">
                <strong className="text-purple-400">Powerball:</strong>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
                  className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold text-lg mt-2 ml-auto"
                >
                  {set.powerball}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}