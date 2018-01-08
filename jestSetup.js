const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.performance = {
  now: jest.fn(() => 1000),
};

Enzyme.configure({ adapter: new Adapter() });
