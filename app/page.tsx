"use client";

import React, { useState } from 'react';
import ControlPanel from '@/components/ControlPanel';
import SortingVisualizer from '@/components/SortingVisualizer';
import { SortingAlgorithm, ArrayDistribution } from '@/utils/algorithm-types';

export default function Home() {
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubbleSort');
  const [arraySize, setArraySize] = useState<number>(100);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const handleAlgorithmChange = (newAlgorithm: SortingAlgorithm) => {
    if (!isSorting) {
      setAlgorithm(newAlgorithm);
    }
  };
  
  const handleArraySizeChange = (newSize: number) => {
    if (!isSorting) {
      setArraySize(newSize);
    }
  };
  
  const handleDistributionChange = (newDistribution: ArrayDistribution) => {
    if (!isSorting) {
      setDistribution(newDistribution);
    }
  };
  
  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
  };
  
  const handleStartSort = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsSorting(true);
    }
  };
  
  const handlePauseSort = () => {
    setIsPaused(true);
  };
  
  const handleResetSort = () => {
    setIsSorting(false);
    setIsPaused(false);
  };
  
  const handleSortingComplete = () => {
    setIsSorting(false);
    setIsPaused(false);
  };
  
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB', 
      padding: '16px 32px'
    }}>
      <div style={{ 
        marginBottom: '32px', 
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '30px', 
          fontWeight: 'bold', 
          color: '#111827'
        }}>
          Sorting Algorithms Motion Showcase by{' '}
          <a 
            href="https://medium.com/@wjleon" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#2563EB',
              textDecoration: 'none',
              borderBottom: '1px dotted #2563EB'
            }}
          >
            Wilmer Leon
          </a>{' '}
          with Claude Code
        </h1>
        <p style={{ 
          color: '#6B7280', 
          marginTop: '8px'
        }}>
          Visualize and compare different sorting algorithms in action
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '32px', 
        maxWidth: '1280px', 
        margin: '0 auto',
        height: '70vh'
      }}>
        <div style={{ height: '100%' }}>
          <ControlPanel
            onAlgorithmChange={handleAlgorithmChange}
            onArraySizeChange={handleArraySizeChange}
            onDistributionChange={handleDistributionChange}
            onSoundToggle={handleSoundToggle}
            onStartSort={handleStartSort}
            onPauseSort={handlePauseSort}
            onResetSort={handleResetSort}
            isSorting={isSorting}
            isPaused={isPaused}
            soundEnabled={soundEnabled}
          />
        </div>
        
        <div style={{ height: '100%' }}>
          <SortingVisualizer
            algorithm={algorithm}
            arraySize={arraySize}
            distribution={distribution}
            isSorting={isSorting}
            isPaused={isPaused}
            soundEnabled={soundEnabled}
            onSortingComplete={handleSortingComplete}
          />
        </div>
      </div>
    </main>
  );
}