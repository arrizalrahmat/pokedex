import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../library/store';
import {useEffect, useState} from 'react';
import {
  increaseTime,
  setCurrentTime,
  setMaxTime,
} from '../library/store/reducers/stopwatch';

const StopwatchPage = () => {
  const {currentTime, maxTime} = useSelector(
    (state: RootState) => state.stopwatch,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [tempTime, setTempTime] = useState('');

  useEffect(() => {
    if (!maxTime || currentTime >= maxTime) return;
    const interval = setInterval(() => {
      dispatch(increaseTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [maxTime, currentTime]);

  useEffect(() => {
    if (currentTime >= maxTime) {
      dispatch(setCurrentTime(0));
      dispatch(setMaxTime(0));
      alert('Time is up!');
    }
  }, [currentTime, maxTime]);

  return (
    <div>
      <h1>Stopwatch Page</h1>
      <h3>
        {currentTime} / {maxTime}
      </h3>
      <h3>remaining time: {maxTime - currentTime}</h3>
      <input
        type='number'
        value={tempTime}
        onChange={e => {
          setTempTime(e.target.value);
        }}
        placeholder='enter your stopwatch time'
      />
      <button
        onClick={e => {
          e.preventDefault();
          dispatch(setCurrentTime(0));
          dispatch(setMaxTime(Number(tempTime)));
          setTempTime('');
        }}>
        Start stopwatch
      </button>
    </div>
  );
};

export default StopwatchPage;
