## Exercise 1

### Problem

Debug and fix the [provided code](./orig.js), and provide a unit test to verify it.

### Solution

I have provided 3 different solutions to the given code:

* [Fixed using Callbacks](./fixed-cb.js) - I left this one here to keep the original code structure, but I would prefer to use one of the other solutions provided.  Callbacks work well, but can be difficult to read at time.  Promises are now widely supported and can be used instead.
* [Fixed using Promises](./fixed-promise.js) - This would be my prefered solution.  The code is more readable than callbacks, and the code complexity actually goes up with async/await.
alo* [Fixed using Async/Await](./fixed-async.js) - While Async/Await normally makes code more readable it actually adds complexity due to the IIFE needed to wrap the top-level await. In a real scenario this would not be neded and async/await might be a better solution than promises alone.

The test for these solutions can be found in [./fixed.spec.js](./fixed.spec.js), and can be ran by running `yarn test exercise1` at the root of this repository.
