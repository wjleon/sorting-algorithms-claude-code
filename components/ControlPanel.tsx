"use client";

import React, { useState } from 'react';
import { SortingAlgorithm, ArrayDistribution } from '@/utils/algorithm-types';

interface ControlPanelProps {
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
  onArraySizeChange: (size: number) => void;
  onDistributionChange: (distribution: ArrayDistribution) => void;
  onSoundToggle: (enabled: boolean) => void;
  onStartSort: () => void;
  onPauseSort: () => void;
  onResetSort: () => void;
  isSorting: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
}

const algorithmOptions: { value: SortingAlgorithm; label: string }[] = [
  { value: 'bubbleSort', label: 'Bubble Sort' },
  { value: 'selectionSort', label: 'Selection Sort' },
  { value: 'insertionSort', label: 'Insertion Sort' },
  { value: 'mergeSort', label: 'Merge Sort' },
  { value: 'quickSort', label: 'Quick Sort' },
  { value: 'heapSort', label: 'Heap Sort' },
  { value: 'countingSort', label: 'Counting Sort' },
  { value: 'radixSort', label: 'Radix Sort' },
  { value: 'bucketSort', label: 'Bucket Sort' },
  { value: 'shellSort', label: 'Shell Sort' },
  { value: 'timSort', label: 'Tim Sort' },
  { value: 'combSort', label: 'Comb Sort' },
  { value: 'pigeonholeSort', label: 'Pigeonhole Sort' },
  { value: 'cycleSort', label: 'Cycle Sort' },
  { value: 'strandSort', label: 'Strand Sort' },
  { value: 'bitonicSort', label: 'Bitonic Sort' },
  { value: 'pancakeSort', label: 'Pancake Sort' },
  { value: 'bogoSort', label: 'Bogo Sort' },
  { value: 'gnomeSort', label: 'Gnome Sort' },
  { value: 'stoogeSort', label: 'Stooge Sort' },
  { value: 'oddEvenSort', label: 'Odd-Even Sort' },
];

const distributionOptions: { value: ArrayDistribution; label: string }[] = [
  { value: 'random', label: 'Random' },
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
  { value: 'twoHalvesAscending', label: 'Two Halves, Ascending' },
  { value: 'twoHalvesDescending', label: 'Two Halves, Descending' },
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  onAlgorithmChange,
  onArraySizeChange,
  onDistributionChange,
  onSoundToggle,
  onStartSort,
  onPauseSort,
  onResetSort,
  isSorting,
  isPaused,
  soundEnabled,
}) => {
  const [arraySize, setArraySize] = useState<number>(100);
  
  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize >= 10 && newSize <= 200) {
      setArraySize(newSize);
      onArraySizeChange(newSize);
    }
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#F3F4F6', 
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: 'bold', 
        marginBottom: '24px', 
        textAlign: 'center' 
      }}>
        Sorting Configuration
      </h2>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151', 
          marginBottom: '8px' 
        }}>
          Choose Sorting Algorithm
        </label>
        <select 
          style={{ 
            display: 'block', 
            width: '100%', 
            padding: '8px', 
            borderRadius: '6px', 
            border: '1px solid #D1D5DB', 
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' 
          }}
          onChange={(e) => onAlgorithmChange(e.target.value as SortingAlgorithm)}
          disabled={isSorting}
        >
          {algorithmOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151', 
          marginBottom: '8px' 
        }}>
          Number of Elements
        </label>
        <input
          type="number"
          min={10}
          max={200}
          value={arraySize}
          onChange={handleArraySizeChange}
          style={{ 
            display: 'block', 
            width: '100%', 
            padding: '8px', 
            borderRadius: '6px', 
            border: '1px solid #D1D5DB', 
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' 
          }}
          disabled={isSorting}
        />
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151', 
          marginBottom: '8px' 
        }}>
          Distribution of Elements
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {distributionOptions.map((option) => (
            <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                id={option.value}
                name="distribution"
                value={option.value}
                defaultChecked={option.value === 'random'}
                onChange={() => onDistributionChange(option.value)}
                style={{ 
                  height: '16px', 
                  width: '16px', 
                  color: '#2563EB', 
                  border: '1px solid #D1D5DB'
                }}
                disabled={isSorting}
              />
              <label 
                htmlFor={option.value} 
                style={{ 
                  marginLeft: '8px', 
                  display: 'block', 
                  fontSize: '14px', 
                  color: '#374151' 
                }}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="sound-toggle"
            checked={soundEnabled}
            onChange={(e) => onSoundToggle(e.target.checked)}
            style={{ 
              height: '16px', 
              width: '16px', 
              color: '#2563EB', 
              borderRadius: '4px', 
              border: '1px solid #D1D5DB'
            }}
          />
          <label 
            htmlFor="sound-toggle" 
            style={{ 
              marginLeft: '8px', 
              display: 'block', 
              fontSize: '14px', 
              color: '#374151' 
            }}
          >
            Enable Sound
          </label>
        </div>
      </div>
      
      <div style={{ 
        marginTop: 'auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px' 
      }}>
        <button
          onClick={onStartSort}
          disabled={isSorting && !isPaused}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            fontWeight: '500', 
            backgroundColor: isSorting && !isPaused ? '#D1D5DB' : '#16A34A',
            color: isSorting && !isPaused ? '#6B7280' : 'white',
            border: 'none',
            cursor: isSorting && !isPaused ? 'not-allowed' : 'pointer'
          }}
        >
          {isPaused ? 'Resume' : 'Start'}
        </button>
        <button
          onClick={onPauseSort}
          disabled={!isSorting || isPaused}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            fontWeight: '500', 
            backgroundColor: !isSorting || isPaused ? '#D1D5DB' : '#EAB308',
            color: !isSorting || isPaused ? '#6B7280' : 'white',
            border: 'none',
            cursor: !isSorting || isPaused ? 'not-allowed' : 'pointer'
          }}
        >
          Pause
        </button>
        <button
          onClick={onResetSort}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            fontWeight: '500', 
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;