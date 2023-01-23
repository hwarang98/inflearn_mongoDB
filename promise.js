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

// addSum(10, 20)
//   .then((sum1) => addSum(sum1, 3))
//   .then((sum2) => console.log({ sum2 }))
//   .catch((error) => console.log({ error }));

const totalSum = async () => {
  try {
    const sum1 = await addSum(10, 10);
    const sum2 = await addSum(sum1, 10);
    console.log(sum2);
  } catch (error) {
    if (error) console.log(error);
  }
};

totalSum();
