// import serializer from 'jest-glamor-react';
import { toMatchSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCalledWithSnapshot(snapshotName?: string): void;
    }
  }
}

// expect.addSnapshotSerializer(serializer);

expect.extend({
  toBeCalledWithSnapshot(received, snapshotName) {
    if (received.mock.calls.length === 0) {
      return {
        message: () => 'Mock function was not called',
        pass: false,
      };
    }

    return toMatchSnapshot.call(this, received.mock.calls, snapshotName);
  },
});
