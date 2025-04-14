# Blog Post
This repo is part of a blog post that can be found [here:](https://medium.com/@wjleon/the-new-google-firebase-studio-gave-me-vibes-of-2010-the-vibe-coding-battle-b568d51d4ed1)

# Sorting Algorithm Visualizer with Claude Code

An interactive web application for visualizing how various sorting algorithms work. Built with Next.js and TypeScript.

## Features

- Visualize 21 different sorting algorithms
- Adjust array size (10-200 elements)
- Choose from different initial distributions
- Real-time metrics (comparisons and time)
- Pause and resume functionality
- Audio feedback (toggle on/off)

## Sorting Algorithms

- Basic Sorts: Bubble Sort, Selection Sort, Insertion Sort
- Efficient Sorts: Merge Sort, Quick Sort, Heap Sort
- Distribution Sorts: Counting Sort, Radix Sort, Bucket Sort
- Shell Sort Variants: Shell Sort, Comb Sort
- Hybrid Sorts: Tim Sort
- Specialized Sorts: Cycle Sort, Strand Sort, Bitonic Sort, Pancake Sort
- Novelty Sorts: Bogo Sort, Gnome Sort, Stooge Sort, Odd-Even Sort

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install the dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Select a sorting algorithm from the dropdown menu
2. Choose the number of elements (10-200)
3. Select the initial distribution of elements
4. Toggle sound on or off
5. Click "Start" to begin the visualization
6. Use "Pause" and "Reset" buttons to control the animation

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Sound generation
