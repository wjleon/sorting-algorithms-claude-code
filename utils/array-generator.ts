import { ArrayDistribution } from './algorithm-types';

export function generateArray(size: number, distribution: ArrayDistribution): number[] {
  // Create array with values from 1 to size
  const array = Array.from({ length: size }, (_, i) => i + 1);
  
  // Adding console log to debug array generation
  console.log("Generated initial array:", array.length, "elements");
  
  switch (distribution) {
    case 'random':
      shuffleArray(array);
      break;
    case 'ascending':
      // Already in ascending order
      break;
    case 'descending':
      array.reverse();
      break;
    case 'twoHalvesAscending':
      const midpoint1 = Math.floor(size / 2);
      const firstHalf = array.slice(0, midpoint1);
      const secondHalf = array.slice(midpoint1);
      // Both halves are already in ascending order
      array.splice(0, size, ...firstHalf, ...secondHalf);
      break;
    case 'twoHalvesDescending':
      const midpoint2 = Math.floor(size / 2);
      const firstHalfDesc = array.slice(0, midpoint2).reverse();
      const secondHalfDesc = array.slice(midpoint2).reverse();
      array.splice(0, size, ...firstHalfDesc, ...secondHalfDesc);
      break;
  }
  
  // More debugging info
  console.log("Distribution:", distribution);
  console.log("Final array length:", array.length);
  console.log("First few elements:", array.slice(0, 5));
  
  return array;
}

function shuffleArray(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}