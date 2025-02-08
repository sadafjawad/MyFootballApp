import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<ProtectedRouteOutlet />}>
              <Route path='home' element={<Home />} />
              <Route path='pickleague' element={<PickLeague />} />
              <Route path='pickteam' element={<PickTeam />} />
              <Route path='overview' element={<Overview />} />
              <Route path='matches' element={<Matches />} />
              <Route path='table' element={<Table />} />
              <Route path='players' element={<Players />} />
              <Route path='news' element={<News />} />
            </Route>
            <Route path='/' element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
// login -> pick league -> pick team -> 

export default App;