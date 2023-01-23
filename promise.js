const addSum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        reject('a b must me number');
      }
      resolve(a + b);
    }, 3000);
  });
};
addSum(10, 20)
  .then((sum) => console.log({ sum }))
  .catch((error) => console.log({ error }));
