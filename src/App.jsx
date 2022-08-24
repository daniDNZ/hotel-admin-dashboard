import { Route, Routes } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Login from './components/Login';
import Messages from './features/messages/Messages';
import NewRoom from './features/rooms/NewRoom';
import Room from './features/rooms/Room';
import Rooms from './features/rooms/Rooms';
import NewUser from './features/users/NewUser';
import User from './features/users/User';
import Users from './features/users/Users';
import Booking from './features/bookings/Booking';
import NewBooking from './features/bookings/NewBooking';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { AuthContext } from './context/AuthContextProvider';
import Bookings from './features/bookings/Bookings';

function App() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    localStorage.setItem('AUTH_DATA', JSON.stringify(auth));
  }, [auth]);

  return (
    <Routes>
      <Route
        path="/*"
        element={(
          <RequireAuth>
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
              </Route>
            </Routes>
          </RequireAuth>
        )}
      />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
