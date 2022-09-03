import { AnyAction } from "@reduxjs/toolkit";

// Simple on / off spinner reducer for react redux typescript.
const initialState = {
  email: "",
  isLoggedIn: false,
};

// Use the initialState as a default value
export default function userReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "user/login":
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        email: action.payload.email,
        isLoggedIn: true,
      };
      break;
    case "user/logout":
      localStorage.removeItem("email");
      return {
        ...state,
        email: "",
        isLoggedIn: false,
      };
      break;
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
