import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
  {
    description = '',
    notes = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    notes,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// Expanses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => expense.id === action.id ? {...expense, ...action.updates} : expense);
    default:
      return state;
  }
};

// Filters Reducer

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT',
  text,
});

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const exponseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const exponseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

console.log(exponseOne);

store.dispatch(removeExpense({ id: exponseOne.expense.id }));
store.dispatch(editExpense(exponseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

const demoState = {
  expenses: [{
    id: 'poijasdfhwer',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};
