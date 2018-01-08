// tslint:disable:no-console
async function remoteMathService() {
  const [num1, num2] = await Promise.all([
    callOneService(),
    callTwoService(),
  ]);
  return num1 + num2;
}

function callOneService(cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

function callTwoService() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1500);
  });
}

(async () => {
  try {
    const answer = await remoteMathService();
    if (answer !== 3) {
      console.log('wrong answer', answer);
    } else {
      console.log('correct');
    }
  } catch (err) {
    console.log('error ', err);
  }
})();
