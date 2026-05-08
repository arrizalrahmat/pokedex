'use client';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Outlet} from 'react-router-dom';
import {AppDispatch, RootState} from '../library/store';
import {getMembers} from '../library/store/reducers/members';

const url = 'https://randomuser.me/api/?results=5';

export default function MembersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {value} = useSelector(
    (state: RootState) => state.count,
  );

  const {members, isLoading, error} = useSelector(
    (state: RootState) => state.members,
  );

  const {currentTime, maxTime} = useSelector(
    (state: RootState) => state.stopwatch,
  );
  // const [members, setMembers] = useState([]);
  // DILARANG KERAS FETCH LANGSUNG DI COMPONENT
  // const getMembers = async () => {
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   setMembers(data.results);
  // };
  useEffect(() => {
    dispatch(getMembers());
  }, []);

  return (
    <div>
      <h1>Members Page {value}</h1>
      <h3>Remaining Time: {maxTime - currentTime}</h3>
      <div
        style={{
          marginBottom: '10px',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {members.map((member, index) => (
              <div key={index}>
                <Link
                  to={`${member.name.first}-${member.name.last}`}>{`${member.name.first} ${member.name.last}`}</Link>{' '}
                |{' '}
              </div>
            ))}
          </>
        )}
      </div>
      <Outlet />
      {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
    </div>
  );
}
