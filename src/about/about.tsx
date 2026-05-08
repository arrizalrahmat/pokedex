import {useDispatch, useSelector} from 'react-redux';
import {Link, Outlet} from 'react-router-dom';
import {RootState} from '../../library/store';
import {AppDispatch} from '../../library/store';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../library/store/reducers/count';
import {useState} from 'react';

const AboutPage = () => {
  const {value} = useSelector(
    (state: RootState) => state.count,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [number, setNumber] = useState('');
  return (
    <div>
      <h1>About Page</h1>
      <p>Counter Value: {value}</p>
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        increment
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        decrement
      </button>
      <input
        placeholder='input your number'
        value={number}
        onChange={e => {
          setNumber(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(incrementByAmount(Number(number)));
          setNumber('');
        }}>
        submit
      </button>
      <Link to='me'>About Me</Link> |{' '}
      <Link to='company'>About Company</Link>
      <Outlet />
    </div>
  );
};

export default AboutPage;
