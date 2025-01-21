import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRouteOutlet from './components/ProtectedRouteOutlet';
import PickLeague from './pages/PickLeague';
import PickTeam from './pages/PickTeam';
import Overview from './pages/Overview';
import Matches from './pages/Matches';
import Table from './pages/Table';
import Players from './pages/Players';
import News from './pages/News';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<ProtectedRouteOutlet />}>
              <Route path='' element={<Home />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/pickleague' element={<PickLeague />} />
            <Route path='/pickteam' element={<PickTeam />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/matches' element={<Matches />} />
            <Route path='/table' element={<Table />} />
            <Route path='/players' element={<Players />} />
            <Route path='/news' element={<News />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;