import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRouteOutlet from './components/ProtectedRouteOutlet';
import PickLeague from './pages/PickLeague';
import PickTeam from './pages/PickTeam';

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
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;