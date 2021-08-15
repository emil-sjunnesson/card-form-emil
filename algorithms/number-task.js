// Algorithm 1.2
// Caveat: these functions will not work with negative or decimal numbers as input.

const sampleInputs = [
  [19, 2, 42, 18],
  [61, 32, 51],
  [1, 3, 5],
  [44, 26, 17, 78, 322],
  [1765, 2347, 9999, 4568, 4, 77]
];

// Readable version
const getMaxOddSum1 = (numbers) => {
  // Filter out the odd and even numbers
  const odd = numbers.filter((number) => number % 2 === 1);
  const even = numbers.filter((number) => number % 2 === 0);

  if (!odd.length || !even.length) {
    return 'Both an odd and even number is needed to get an odd sum.';
  }

  // Get largest odd and even number
  const maxOdd = Math.max(...odd);
  const maxEven = Math.max(...even);

  // Return sum of max odd and even
  return maxOdd + maxEven;
};

sampleInputs.forEach((input) => {
  console.log(getMaxOddSum1(input));
});

// Compact (less readable) version
const getMaxOddSum2 = (numbers) => {
  // Sort the odd and even numbers into two arrays
  const sorted = numbers.reduce((acc, curr) => {
    acc[curr % 2].push(curr);
    return acc;
  }, [[], []]);

  if (sorted.some(({ length }) => !length)) {
    return 'Both an odd and even number is needed to get an odd sum.';
  }

  // Return sum of max odd and even
  return sorted.map((values) => Math.max(...values)).reduce((a, b) => a + b);
};

sampleInputs.forEach((input) => {
  console.log(getMaxOddSum2(input));
});
