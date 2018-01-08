// reduce reducers exports commonjs in test env but es2015 in webpack env.
const reduceReducers = require.requireActual('reduce-reducers');
export default reduceReducers;
