export type SortingAlgorithm = 
  | 'bubbleSort'
  | 'selectionSort'
  | 'insertionSort'
  | 'mergeSort'
  | 'quickSort'
  | 'heapSort'
  | 'countingSort'
  | 'radixSort'
  | 'bucketSort'
  | 'shellSort'
  | 'timSort'
  | 'combSort'
  | 'pigeonholeSort'
  | 'cycleSort'
  | 'strandSort'
  | 'bitonicSort'
  | 'pancakeSort'
  | 'bogoSort'
  | 'gnomeSort'
  | 'stoogeSort'
  | 'oddEvenSort';

export type ArrayDistribution =
  | 'random'
  | 'ascending'
  | 'descending'
  | 'twoHalvesAscending'
  | 'twoHalvesDescending';

export interface SortingState {
  array: number[];
  comparisons: number;
  currentIndices: number[];
  sorted: boolean;
}

export type SortingStep = Generator<SortingState, void, unknown>;

export type SortFunction = (array: number[]) => SortingStep;