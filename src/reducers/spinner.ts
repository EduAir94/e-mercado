import { AnyAction } from '@reduxjs/toolkit';

// Simple on / off spinner reducer for react redux typescript.
const initialState = {
  loading: false,
};

// Use the initialState as a default value
export default function spinnerReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case 'spinner/show':
      return {
        ...state,
        loading: true,
      };
      break;
    case 'spinner/hide':
      return {
        ...state,
        loading: false,
      };
      break;
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
