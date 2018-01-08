beforeAll(() => {
  jest.useFakeTimers();
  spyOn(console, 'log');
});

const wait = () => new Promise(r => setImmediate(r));

['./fixed-async', './fixed-cb', './fixed-promise'].forEach(path => {
  it(path, async () => {
    require(path);
    jest.runAllTimers();
    await wait();
    expect(console.log).toBeCalledWith('correct');
    expect(console.log).not.toBeCalledWith('wrong answer', expect.anything());
    expect(console.log).not.toBeCalledWith('error ', expect.anything());
  });
});
