// Algorithm 1.1

const sampleInputs = [
  'ffdttttyy',
  'iiikigggg',
  'A nice sentance',
  'iwdijwd imid wid imhhhhhhhhh io  oo opppppfgu',
  'huidwwduhdyyyyyyyyyrrwiryyyowowouufuebueydfknoe',
  'AAAAaaaaBBBBbbbb'
];

const reduceConsecutiveLetters = (input, maxConsecutive = 3) => input.replace(
  new RegExp(`([a-z])\\1{${maxConsecutive},}`, 'g'),
  (match) => match.slice(0, maxConsecutive)
);

sampleInputs.forEach((input) => {
  console.log(reduceConsecutiveLetters(input));
});
