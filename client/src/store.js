import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

function fizzBuzz(n) {
  const newArray = newArray(n - 1);

  newArray.map((item, index) => {
    if (index <= n) {
      console.log('hello');
    }
  });
  console.log(newArray);
  //  return (n/3 === 0 && n/5 === 0 )? 'FizzBuzz ' : (n/3===0 && n/5 !== 0) ? 'Fizz' : (n/3 !==0 && n/5 === 0) ? 'Buzz': n
}
