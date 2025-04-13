import { SortFunction, SortingState } from './algorithm-types';

// BUBBLE SORT
export const bubbleSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  let sorted = false;
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [j, j + 1], sorted: false };
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield { array: arr, comparisons, currentIndices: [j, j + 1], sorted: false };
      }
    }
    
    if (!swapped) {
      sorted = true;
      break;
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// SELECTION SORT
export const selectionSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [minIndex, j], sorted: false };
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      yield { array: arr, comparisons, currentIndices: [i, minIndex], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// INSERTION SORT
export const insertionSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    yield { array: arr, comparisons, currentIndices: [i, j], sorted: false };
    
    while (j >= 0 && arr[j] > key) {
      comparisons++;
      arr[j + 1] = arr[j];
      j--;
      yield { array: arr, comparisons, currentIndices: [i, j + 1], sorted: false };
    }
    
    if (j + 1 !== i) {
      arr[j + 1] = key;
      yield { array: arr, comparisons, currentIndices: [i, j + 1], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// MERGE SORT
export const mergeSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  function* mergeSortHelper(arr: number[], start: number, end: number): Generator<SortingState, number[], unknown> {
    if (start >= end) {
      return [arr[start]];
    }
    
    const mid = Math.floor((start + end) / 2);
    
    const left = yield* mergeSortHelper(arr, start, mid);
    const right = yield* mergeSortHelper(arr, mid + 1, end);
    
    return yield* merge(left, right, start);
  }
  
  function* merge(left: number[], right: number[], startIdx: number): Generator<SortingState, number[], unknown> {
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [startIdx + i, startIdx + left.length + j], sorted: false };
      
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }
    
    // Update the original array with the merged result
    for (let k = 0; k < result.length; k++) {
      arr[startIdx + k] = result[k];
      yield { array: [...arr], comparisons, currentIndices: [startIdx + k], sorted: false };
    }
    
    return result;
  }
  
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// QUICK SORT
export const quickSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  function* quickSortHelper(low: number, high: number): Generator<SortingState, void, unknown> {
    if (low < high) {
      const pivotIndex = yield* partition(low, high);
      yield* quickSortHelper(low, pivotIndex - 1);
      yield* quickSortHelper(pivotIndex + 1, high);
    }
  }
  
  function* partition(low: number, high: number): Generator<SortingState, number, unknown> {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [j, high], sorted: false };
      
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { array: arr, comparisons, currentIndices: [i, j], sorted: false };
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { array: arr, comparisons, currentIndices: [i + 1, high], sorted: false };
    
    return i + 1;
  }
  
  yield* quickSortHelper(0, arr.length - 1);
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// HEAP SORT
export const heapSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  function* heapify(n: number, i: number): Generator<SortingState, void, unknown> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [largest, left], sorted: false };
      
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [largest, right], sorted: false };
      
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      yield { array: arr, comparisons, currentIndices: [i, largest], sorted: false };
      
      yield* heapify(n, largest);
    }
  }
  
  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }
  
  // Extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    yield { array: arr, comparisons, currentIndices: [0, i], sorted: false };
    
    yield* heapify(i, 0);
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// COUNTING SORT
export const countingSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
    comparisons++;
    yield { array: arr, comparisons, currentIndices: [i], sorted: false };
  }
  
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
    yield { array: arr, comparisons, currentIndices: [], sorted: false };
  }
  
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
    comparisons++;
    
    const tempArr = [...arr];
    for (let j = 0; j < output.length; j++) {
      if (output[j] !== 0) {
        tempArr[j] = output[j];
      }
    }
    
    yield { array: tempArr, comparisons, currentIndices: [i], sorted: false };
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// RADIX SORT
export const radixSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    yield* countingSortByDigit(arr, exp);
  }
  
  function* countingSortByDigit(arr: number[], exp: number): Generator<SortingState, void, unknown> {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [i], sorted: false };
    }
    
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [i], sorted: false };
    }
    
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      yield { array: [...arr], comparisons, currentIndices: [i], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// BUCKET SORT
export const bucketSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  if (n <= 0) {
    yield { array: arr, comparisons, currentIndices: [], sorted: true };
    return;
  }
  
  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(n));
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  
  // Find min and max values
  const minValue = Math.min(...arr);
  const maxValue = Math.max(...arr);
  const range = (maxValue - minValue) / bucketCount;
  
  // Put array elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(Math.floor((arr[i] - minValue) / range), bucketCount - 1);
    buckets[bucketIndex].push(arr[i]);
    comparisons++;
    yield { array: arr, comparisons, currentIndices: [i], sorted: false };
  }
  
  // Sort individual buckets
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length - 1; j++) {
      comparisons++;
    }
    yield { array: arr, comparisons, currentIndices: [], sorted: false };
  }
  
  // Concatenate all buckets back into arr
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      arr[index++] = buckets[i][j];
      yield { array: [...arr], comparisons, currentIndices: [index - 1], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// SHELL SORT
export const shellSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        comparisons++;
        arr[j] = arr[j - gap];
        yield { array: [...arr], comparisons, currentIndices: [j, j - gap], sorted: false };
      }
      
      arr[j] = temp;
      yield { array: [...arr], comparisons, currentIndices: [i, j], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// TIM SORT
export const timSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  const RUN = 32;
  
  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    yield* insertionSortForTimSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  
  // Merge sorted runs
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      
      if (mid < right) {
        yield* mergeForTimSort(arr, left, mid, right);
      }
    }
  }
  
  function* insertionSortForTimSort(arr: number[], left: number, right: number): Generator<SortingState, void, unknown> {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;
      
      while (j >= left && arr[j] > temp) {
        comparisons++;
        arr[j + 1] = arr[j];
        j--;
        yield { array: [...arr], comparisons, currentIndices: [i, j + 1], sorted: false };
      }
      
      arr[j + 1] = temp;
      yield { array: [...arr], comparisons, currentIndices: [i, j + 1], sorted: false };
    }
  }
  
  function* mergeForTimSort(arr: number[], left: number, mid: number, right: number): Generator<SortingState, void, unknown> {
    const len1 = mid - left + 1;
    const len2 = right - mid;
    const leftArr = new Array(len1);
    const rightArr = new Array(len2);
    
    for (let i = 0; i < len1; i++) {
      leftArr[i] = arr[left + i];
    }
    
    for (let i = 0; i < len2; i++) {
      rightArr[i] = arr[mid + 1 + i];
    }
    
    let i = 0, j = 0, k = left;
    
    while (i < len1 && j < len2) {
      comparisons++;
      yield { array: [...arr], comparisons, currentIndices: [left + i, mid + 1 + j], sorted: false };
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      k++;
      yield { array: [...arr], comparisons, currentIndices: [k - 1], sorted: false };
    }
    
    while (i < len1) {
      arr[k] = leftArr[i];
      i++;
      k++;
      yield { array: [...arr], comparisons, currentIndices: [k - 1], sorted: false };
    }
    
    while (j < len2) {
      arr[k] = rightArr[j];
      j++;
      k++;
      yield { array: [...arr], comparisons, currentIndices: [k - 1], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// COMB SORT
export const combSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  let gap = n;
  let swapped = true;
  
  while (gap > 1 || swapped) {
    gap = Math.floor(gap / 1.3);
    
    if (gap < 1) {
      gap = 1;
    }
    
    swapped = false;
    
    for (let i = 0; i + gap < n; i++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [i, i + gap], sorted: false };
      
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
        yield { array: arr, comparisons, currentIndices: [i, i + gap], sorted: false };
      }
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// PIGEONHOLE SORT
export const pigeonholeSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  
  const pigeonholes: number[][] = Array.from({ length: range }, () => []);
  
  for (let i = 0; i < n; i++) {
    pigeonholes[arr[i] - min].push(arr[i]);
    comparisons++;
    yield { array: arr, comparisons, currentIndices: [i], sorted: false };
  }
  
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (pigeonholes[i].length > 0) {
      arr[index++] = pigeonholes[i].pop()!;
      yield { array: [...arr], comparisons, currentIndices: [index - 1], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// CYCLE SORT
export const cycleSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [cycleStart, i], sorted: false };
      if (arr[i] < item) {
        pos++;
      }
    }
    
    if (pos === cycleStart) {
      continue;
    }
    
    while (item === arr[pos]) {
      pos++;
    }
    
    if (pos !== cycleStart) {
      [item, arr[pos]] = [arr[pos], item];
      yield { array: [...arr], comparisons, currentIndices: [cycleStart, pos], sorted: false };
    }
    
    while (pos !== cycleStart) {
      pos = cycleStart;
      
      for (let i = cycleStart + 1; i < n; i++) {
        comparisons++;
        yield { array: arr, comparisons, currentIndices: [pos, i], sorted: false };
        if (arr[i] < item) {
          pos++;
        }
      }
      
      while (item === arr[pos]) {
        pos++;
      }
      
      if (item !== arr[pos]) {
        [item, arr[pos]] = [arr[pos], item];
        yield { array: [...arr], comparisons, currentIndices: [cycleStart, pos], sorted: false };
      }
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// STRAND SORT
export const strandSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  function* strandSortHelper(arr: number[]): Generator<SortingState, number[], unknown> {
    if (arr.length <= 1) {
      return arr;
    }
    
    const result: number[] = [];
    
    while (arr.length > 0) {
      let sublist: number[] = [];
      sublist.push(arr[0]);
      arr.splice(0, 1);
      yield { array: [...result, ...sublist, ...arr], comparisons, currentIndices: [0], sorted: false };
      
      for (let i = 0; i < arr.length; i++) {
        comparisons++;
        yield { array: [...result, ...sublist, ...arr], comparisons, currentIndices: [result.length + sublist.length - 1, result.length + sublist.length + i], sorted: false };
        
        if (arr[i] > sublist[sublist.length - 1]) {
          sublist.push(arr[i]);
          arr.splice(i, 1);
          i--;
          yield { array: [...result, ...sublist, ...arr], comparisons, currentIndices: [result.length + sublist.length - 1], sorted: false };
        }
      }
      
      result.push(...yield* merge(result, sublist));
      yield { array: [...result, ...arr], comparisons, currentIndices: [], sorted: false };
    }
    
    return result;
  }
  
  function* merge(left: number[], right: number[]): Generator<SortingState, number[], unknown> {
    const result: number[] = [];
    const fullArray = [...left, ...right];
    
    while (left.length > 0 && right.length > 0) {
      comparisons++;
      
      if (left[0] <= right[0]) {
        result.push(left.shift()!);
      } else {
        result.push(right.shift()!);
      }
      
      yield { array: [...result, ...left, ...right], comparisons, currentIndices: [result.length - 1], sorted: false };
    }
    
    while (left.length > 0) {
      result.push(left.shift()!);
      yield { array: [...result, ...left, ...right], comparisons, currentIndices: [result.length - 1], sorted: false };
    }
    
    while (right.length > 0) {
      result.push(right.shift()!);
      yield { array: [...result, ...left, ...right], comparisons, currentIndices: [result.length - 1], sorted: false };
    }
    
    return result;
  }
  
  const result = yield* strandSortHelper([...arr]);
  
  for (let i = 0; i < result.length; i++) {
    arr[i] = result[i];
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// BITONIC SORT
export const bitonicSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  // Pad the array with a power of 2 length
  const n = arr.length;
  const powerOfTwo = Math.pow(2, Math.ceil(Math.log2(n)));
  
  for (let i = n; i < powerOfTwo; i++) {
    arr.push(Number.MAX_SAFE_INTEGER);
  }
  
  function* bitonicSortHelper(start: number, count: number, dir: boolean): Generator<SortingState, void, unknown> {
    if (count > 1) {
      const k = count / 2;
      
      yield* bitonicSortHelper(start, k, true);
      yield* bitonicSortHelper(start + k, k, false);
      yield* bitonicMerge(start, count, dir);
    }
  }
  
  function* bitonicMerge(start: number, count: number, dir: boolean): Generator<SortingState, void, unknown> {
    if (count > 1) {
      const k = count / 2;
      
      for (let i = start; i < start + k; i++) {
        yield* compare(i, i + k, dir);
      }
      
      yield* bitonicMerge(start, k, dir);
      yield* bitonicMerge(start + k, k, dir);
    }
  }
  
  function* compare(i: number, j: number, dir: boolean): Generator<SortingState, void, unknown> {
    comparisons++;
    yield { array: arr.slice(0, n), comparisons, currentIndices: [i, j], sorted: false };
    
    if ((arr[i] > arr[j]) === dir) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { array: arr.slice(0, n), comparisons, currentIndices: [i, j], sorted: false };
    }
  }
  
  yield* bitonicSortHelper(0, powerOfTwo, true);
  
  // Remove the padding elements
  arr.splice(n);
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// PANCAKE SORT
export const pancakeSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  function* flip(arr: number[], i: number): Generator<SortingState, void, unknown> {
    let start = 0;
    while (start < i) {
      const temp = arr[start];
      arr[start] = arr[i];
      arr[i] = temp;
      start++;
      i--;
      yield { array: [...arr], comparisons, currentIndices: [start - 1, i + 1], sorted: false };
    }
  }
  
  function* findMax(arr: number[], n: number): Generator<SortingState, number, unknown> {
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [maxIdx, i], sorted: false };
      
      if (arr[i] > arr[maxIdx]) {
        maxIdx = i;
      }
    }
    return maxIdx;
  }
  
  for (let currSize = n; currSize > 1; currSize--) {
    const maxIdx = yield* findMax(arr, currSize);
    
    if (maxIdx !== currSize - 1) {
      yield* flip(arr, maxIdx);
      yield* flip(arr, currSize - 1);
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// BOGO SORT (limit to small arrays for sanity)
export const bogoSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      comparisons++;
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    return true;
  }
  
  function* shuffle(arr: number[]): Generator<SortingState, void, unknown> {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { array: [...arr], comparisons, currentIndices: [i, j], sorted: false };
    }
  }
  
  let maxIterations = 100; // Safety limit to prevent infinite loops
  
  while (!isSorted(arr) && maxIterations > 0) {
    yield* shuffle(arr);
    maxIterations--;
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: maxIterations > 0 };
};

// GNOME SORT
export const gnomeSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  let index = 0;
  
  while (index < n) {
    if (index === 0) {
      index++;
    }
    
    comparisons++;
    yield { array: arr, comparisons, currentIndices: [index, index - 1], sorted: false };
    
    if (arr[index] >= arr[index - 1]) {
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
      yield { array: arr, comparisons, currentIndices: [index, index + 1], sorted: false };
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// STOOGE SORT
export const stoogeSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  
  function* stoogeSortHelper(arr: number[], l: number, h: number): Generator<SortingState, void, unknown> {
    if (l >= h) {
      return;
    }
    
    comparisons++;
    yield { array: arr, comparisons, currentIndices: [l, h], sorted: false };
    
    if (arr[l] > arr[h]) {
      [arr[l], arr[h]] = [arr[h], arr[l]];
      yield { array: arr, comparisons, currentIndices: [l, h], sorted: false };
    }
    
    if (h - l + 1 > 2) {
      const t = Math.floor((h - l + 1) / 3);
      
      yield* stoogeSortHelper(arr, l, h - t);
      yield* stoogeSortHelper(arr, l + t, h);
      yield* stoogeSortHelper(arr, l, h - t);
    }
  }
  
  yield* stoogeSortHelper(arr, 0, arr.length - 1);
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// ODD-EVEN SORT
export const oddEvenSort: SortFunction = function* (array) {
  const arr = [...array];
  let comparisons = 0;
  const n = arr.length;
  
  let sorted = false;
  
  while (!sorted) {
    sorted = true;
    
    // Odd phase
    for (let i = 1; i < n - 1; i += 2) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [i, i + 1], sorted: false };
      
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { array: arr, comparisons, currentIndices: [i, i + 1], sorted: false };
      }
    }
    
    // Even phase
    for (let i = 0; i < n - 1; i += 2) {
      comparisons++;
      yield { array: arr, comparisons, currentIndices: [i, i + 1], sorted: false };
      
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { array: arr, comparisons, currentIndices: [i, i + 1], sorted: false };
      }
    }
  }
  
  yield { array: arr, comparisons, currentIndices: [], sorted: true };
};

// Map algorithms to their functions
export const sortingAlgorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  countingSort,
  radixSort,
  bucketSort,
  shellSort,
  timSort,
  combSort,
  pigeonholeSort,
  cycleSort,
  strandSort,
  bitonicSort,
  pancakeSort,
  bogoSort,
  gnomeSort,
  stoogeSort,
  oddEvenSort,
};