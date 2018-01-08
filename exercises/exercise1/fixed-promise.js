// tslint:disable:no-console
function remoteMathService() {
  return Promise.all([
    callOneService(),
    callTwoService(),
  ])
  .then(([num1, num2]) => num1 + num2);
}

function callOneService(cb) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 1000);
  });
}

function callTwoService() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(2), 1500);
  });
}

remoteMathService()
  .then((answer) => {
    if (answer !== 3) {
      console.log('wrong answer', answer);
    } else {
      console.log('correct');
    }
  })
  .catch((err) => {
    console.log('error ', err);
  });
