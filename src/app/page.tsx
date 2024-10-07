'use client'

import { useState } from 'react';

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Powerball Number Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Number of Sets:
          <input
            type="number"
            value={setCount}
            onChange={(e) => setSetCount(Number(e.target.value))}
            min="1"
            style={{ marginLeft: '10px', width: '50px' }}
          />
        </label>
        <button onClick={handleGenerate} style={{ marginLeft: '20px' }}>
          Generate
        </button>
      </div>
      <div>
        {generatedSets.map((set, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>Main Numbers:</strong> {set.mainNumbers.join(', ')}
            </div>
            <div style={{ flex: 0.3, textAlign: 'right' }}>
              <strong>Powerball:</strong> {set.powerball}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}