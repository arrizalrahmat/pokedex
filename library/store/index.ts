import {configureStore} from '@reduxjs/toolkit';
import countReducer from './reducers/count';
import stopwatchReducer from './reducers/stopwatch';
import membersReducer from './reducers/members';
import pokemonsReducer from './reducers/pokemons';

export const store = configureStore({
  reducer: {
    count: countReducer,
    stopwatch: stopwatchReducer,
    members: membersReducer,
    pokemons: pokemonsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
