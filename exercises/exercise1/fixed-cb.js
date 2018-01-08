// tslint:disable:no-console

function remoteMathService(cb) {
  callOneService((errOne, one) => {
    if (errOne) {
      return cb(errOne);
    }

    callTwoService((errTwo, two) => {
      cb(errTwo, one + two);
    });
  });
}

function callOneService(cb) {
  setTimeout(() => {
    cb(undefined, 1);
  }, 1000);
}

function callTwoService(cb) {
  setTimeout(() => cb(undefined, 2), 1500);
}

remoteMathService(function(err, answer) {
  if (err) {
    console.log('error ', err);
    return;
  }
  if (answer !== 3) {
    console.log('wrong answer', answer);
  } else {
    console.log('correct');
  }
});
