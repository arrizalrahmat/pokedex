/* eslint-disable react-hooks/set-state-in-effect */
import {Route, Routes} from 'react-router-dom';
import Navbar from '../components/navigation-bar';
import HomePage from './home/home';
import AboutPage from './about/about';
import AboutMePage from './about-me';
import AboutCompanyPage from './about-company';
import MembersPage from './members';
import MemberPage from './member';
import StopwatchPage from './stopwatch';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />}>
          <Route path='me' element={<AboutMePage />} />
          <Route
            path='company'
            element={<AboutCompanyPage />}
          />
        </Route>
        <Route path='/members' element={<MembersPage />}>
          <Route
            path=':memberName'
            element={<MemberPage />}
          />
        </Route>
        <Route
          path='/stopwatch'
          element={<StopwatchPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
