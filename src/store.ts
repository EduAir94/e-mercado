import { configureStore } from '@reduxjs/toolkit'
import spinnerReducer from './reducers/spinner';
import { spinnerState } from './reducers/types';
import userReducer from './reducers/user';

export interface ApplicationState {
    spinner: spinnerState;
  }

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;