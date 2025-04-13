"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SortingAlgorithm, ArrayDistribution, SortingState } from '@/utils/algorithm-types';
import { generateArray } from '@/utils/array-generator';
import { sortingAlgorithms } from '@/utils/sorting-algorithms';
import { AudioPlayer } from '@/utils/audio';

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
  arraySize: number;
  distribution: ArrayDistribution;
  isSorting: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
  onSortingComplete: () => void;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  algorithm,
  arraySize,
  distribution,
  isSorting,
  isPaused,
  soundEnabled,
  onSortingComplete,
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [sortingState, setSortingState] = useState<SortingState | null>(null);
  const [comparisons, setComparisons] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [completionMessage, setCompletionMessage] = useState<string>('');
  
  const sortingStep = useRef<Generator<SortingState, void, unknown> | null>(null);
  const audioPlayer = useRef<AudioPlayer>(new AudioPlayer());
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number | null>(null);
  
  // Initialize array when component mounts or when arraySize/distribution changes
  useEffect(() => {
    resetArray();
  }, [arraySize, distribution]);
  
  // Update audio player state
  useEffect(() => {
    audioPlayer.current.setEnabled(soundEnabled);
  }, [soundEnabled]);
  
  // Handle sorting state
  useEffect(() => {
    if (isSorting && !isPaused) {
      startSorting();
    } else if (isPaused) {
      pauseSorting();
    } else {
      resetSorting();
    }
    
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isSorting, isPaused, algorithm]);
  
  const resetArray = () => {
    const newArray = generateArray(arraySize, distribution);
    console.log("Generated array with", newArray.length, "elements");
    setArray(newArray);
    setSortingState(null);
    setComparisons(0);
    setTimeElapsed(0);
    setCompletionMessage('');
    startTimeRef.current = null;
    lastStepTimeRef.current = null;
    sortingStep.current = null;
  };
  
  const startSorting = () => {
    // Initialize step generator if it doesn't exist yet
    if (!sortingStep.current) {
      const algorithmFunction = sortingAlgorithms[algorithm];
      if (!algorithmFunction) {
        console.error(`Algorithm ${algorithm} not found`);
        return;
      }
      sortingStep.current = algorithmFunction(array);
      startTimeRef.current = performance.now();
    }
    
    // Run animation
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - (startTimeRef.current || 0);
      setTimeElapsed(elapsed / 1000);
      
      // Control animation speed based on array size
      const stepDelay = Math.max(10, 1000 / arraySize);
      
      if (!lastStepTimeRef.current || timestamp - lastStepTimeRef.current >= stepDelay) {
        lastStepTimeRef.current = timestamp;
        
        if (sortingStep.current) {
          const result = sortingStep.current.next();
          
          if (!result.done && result.value) {
            setSortingState(result.value);
            setArray(result.value.array);
            setComparisons(result.value.comparisons);
            
            // Play sound for the compared elements
            if (soundEnabled && result.value.currentIndices.length > 0) {
              const index = result.value.currentIndices[0];
              audioPlayer.current.playToneForValue(result.value.array[index], arraySize);
            }
            
            // If array is sorted, complete the sorting process
            if (result.value.sorted) {
              finishSorting(elapsed / 1000);
              return;
            }
          } else {
            finishSorting(elapsed / 1000);
            return;
          }
        }
      }
      
      if (!isPaused) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    if (!isPaused && !animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };
  
  const pauseSorting = () => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };
  
  const resetSorting = () => {
    pauseSorting();
    setSortingState(null);
    if (array.length === 0) {
      resetArray();
    }
    setCompletionMessage('');
  };
  
  const finishSorting = (totalTime: number) => {
    pauseSorting();
    setCompletionMessage(
      `Finished sorting ${arraySize} elements with ${getAlgorithmName(algorithm)}. Number of comparisons: ${comparisons}, Time: ${totalTime.toFixed(3)} seconds.`
    );
    onSortingComplete();
  };
  
  const getAlgorithmName = (alg: SortingAlgorithm): string => {
    const option = algorithmOptions.find(opt => opt.value === alg);
    return option ? option.label : alg;
  };
  
  const algorithmOptions = [
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
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: 'white', 
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: 'bold', 
        marginBottom: '8px', 
        textAlign: 'center' 
      }}>
        Sorting {arraySize} Elements with {getAlgorithmName(algorithm)}
      </h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '32px', 
        marginBottom: '8px' 
      }}>
        <div>
          <span style={{ fontWeight: '500' }}>Number of Comparisons:</span>{' '}
          <span style={{ color: '#2563EB' }}>{comparisons}</span>
        </div>
        <div>
          <span style={{ fontWeight: '500' }}>Time Elapsed:</span>{' '}
          <span style={{ color: '#2563EB' }}>{timeElapsed.toFixed(3)}</span> seconds
        </div>
      </div>
      
      <div style={{ 
        flex: '1', 
        position: 'relative', 
        marginTop: '16px',
        border: '1px solid #e5e7eb',
        minHeight: '400px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: '0', 
          display: 'flex', 
          alignItems: 'flex-end'
        }}>
          {array.map((value, index) => {
            const height = `${(value / arraySize) * 90}%`;
            const width = `${100 / array.length}%`;
            const isActive = sortingState?.currentIndices.includes(index);
            
            return (
              <div
                key={index}
                style={{
                  height,
                  width,
                  backgroundColor: isActive ? '#EF4444' : '#3B82F6',
                  marginLeft: '1px',
                  marginRight: '1px',
                  transition: 'height 0.1s ease-in-out'
                }}
              />
            );
          })}
        </div>
      </div>
      
      {completionMessage && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#DCFCE7', 
          color: '#166534',
          borderRadius: '6px'
        }}>
          {completionMessage}
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;