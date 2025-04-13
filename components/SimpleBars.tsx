"use client";

import React, { useState, useEffect } from 'react';

const SimpleBars: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate a simple array of 50 elements
    const newArray = Array.from({ length: 50 }, (_, i) => i + 1);
    setArray(newArray);
    console.log("Generated simple array:", newArray.length, "elements");
  }, []);
  
  return (
    <div className="border border-gray-300 h-64 mt-4 relative overflow-hidden">
      <h3 className="text-center p-2 bg-gray-100">Simple Bar Visualization Test</h3>
      <div className="absolute inset-0 pt-10 flex items-end">
        {array.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 mx-[1px]"
            style={{
              height: `${(value / 50) * 80}%`,
              width: `${100 / 50}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleBars;