const randomColors = [
    '#bfdafd',
    '#bfc0fd',
    '#bfb5fd',
    '#bfd2fd',
    '#b6b5fd',
    '#bfe3fd',
    '#b5f0fd',
    '#bbb5fd',
  ];
  const randomHex = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };
  export { randomHex };
  