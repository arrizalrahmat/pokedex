import {createSlice} from '@reduxjs/toolkit';
import {TimerStateType} from './type';

const initialState: TimerStateType = {
  currentTime: 0, // CRUD currentTime
  maxTime: 0, // CRUD maxTime
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increaseTime: state => {
      if (state.currentTime < state.maxTime) {
        state.currentTime += 1;
      }
    },
    setMaxTime: (state, action) => {
      state.maxTime = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const {increaseTime, setMaxTime, setCurrentTime} =
  timerSlice.actions;

export default timerSlice.reducer;
