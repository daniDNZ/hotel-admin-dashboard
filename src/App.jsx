import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Message from './components/messages/Message';
import Messages from './components/messages/Messages';
import NewRoom from './components/rooms/NewRoom';
import Room from './components/rooms/Room';
import Rooms from './components/rooms/Rooms';
import NewUser from './components/users/NewUser';
import User from './components/users/User';
import Users from './components/users/Users';
import Booking from './components/bookings/Booking';
import Bookings from './components/bookings/Bookings';
import NewBooking from './components/bookings/NewBooking';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

function RequireAuth({ auth, children }) {
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('auth') !== null);
  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', '1');
    }
    localStorage.removeItem('auth');
  }, [auth]);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/*"
          element={(
            <RequireAuth auth={auth}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/:id" element={<Booking />} />
                  <Route path="bookings/new" element={<NewBooking />} />
                  <Route path="rooms" element={<Rooms />} />
                  <Route path="rooms/:id" element={<Room />} />
                  <Route path="rooms/new" element={<NewRoom />} />
                  <Route path="users" element={<Users />} />
                  <Route path="users/:id" element={<User />} />
                  <Route path="users/new" element={<NewUser />} />
                  <Route path="contact" element={<Messages />} />
                  <Route path="contact/:id" element={<Message />} />
                </Route>
              </Routes>
            </RequireAuth>
        )}
        />
        <Route path="login" element={<Login setAuth={setAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
