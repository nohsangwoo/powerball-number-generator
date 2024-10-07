'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DisplayLudgi from './components/DisplayLudgi';

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

const loadingMessages = [
  "Harnessing cosmic energy...",
  "Praying with the lucky pig...",
  "Pleading with the lottery goddess...",
  "Searching for lucky constellations...",
  "Hunting for four-leaf clovers...",
  "Rubbing the golden rabbit's foot...",
  "Spinning the wheel of fortune...",
  "Summoning the lottery fairy...",
  "Aligning the lucky stars...",
  "Consulting the mystic 8-ball...",
  "Decoding winning number patterns...",
  "Channeling Lady Luck...",
  "Brewing a luck potion...",
  "Casting a fortune spell...",
  "Negotiating with leprechauns...",
  "Polishing lucky pennies...",
  "Waking up sleeping unicorns...",
  "Catching shooting stars...",
  "Crossing fingers and toes...",
  "Wishing upon a dandelion...",
  "Shaking the cosmic dice...",
  "Unlocking the vault of fortune...",
  "Decrypting the universe's secrets...",
  "Charging the crystal ball...",
  "Tuning into lucky frequencies...",
  "Balancing karma scales...",
  "Whispering to lady fortune...",
  "Dusting off the lucky horseshoe...",
  "Aligning chakras for good luck...",
  "Consulting ancient oracles...",
  "Stirring the cauldron of chance...",
  "Polishing the magic lamp...",
  "Untangling fate's threads...",
  "Decoding fortune cookies...",
  "Syncing with lucky planets...",
  "Harvesting lucky bamboo...",
  "Awakening dormant luck...",
  "Calibrating the luck-o-meter...",
  "Summoning good vibes...",
  "Channeling winning energy...",
  "Activating lucky charms...",
  "Consulting the book of fate...",
  "Harmonizing with lucky numbers...",
  "Brewing lucky tea leaves...",
  "Polishing the crystal ball...",
  "Tuning the cosmic radio...",
  "Aligning lucky feng shui...",
  "Decoding celestial messages...",
  "Charging lucky talismans...",
  "Summoning serendipity..."
];

export default function PowerballGenerator() {
  const [setCount, setSetCount] = useState<number>(1);
  const [generatedSets, setGeneratedSets] = useState<PowerballSet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const getRandomMessage = () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingMessage(getRandomMessage()); // 즉시 첫 메시지 설정
      interval = setInterval(() => {
        setLoadingMessage(getRandomMessage());
      }, 1100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = () => {
    setIsLoading(true);
    setLoadingMessage(getRandomMessage()); // 즉시 첫 메시지 설정
    const loadingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    setTimeout(() => {
      const sets = generatePowerballNumbers(setCount);
      setGeneratedSets(sets);
      setIsLoading(false);
    }, loadingTime);
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
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
        >
          Generate
        </motion.button>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-purple-400">{loadingMessage}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {!isLoading && generatedSets.map((set, index) => (
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
      <DisplayLudgi />
    </div>
  );
}