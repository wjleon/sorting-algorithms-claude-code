"use client";

import React from 'react';

const BasicBars: React.FC = () => {
  // Hard-coded array with just 10 elements for simplicity
  const barHeights = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  return (
    <div style={{ 
      width: '100%', 
      height: '300px', 
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '5px'
    }}>
      {barHeights.map((height, index) => (
        <div 
          key={index}
          style={{
            backgroundColor: 'blue',
            height: `${height}%`,
            width: '8%',
            margin: '0 1%'
          }}
        />
      ))}
    </div>
  );
};

export default BasicBars;