import { Route, Routes } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Login from './components/Login';
import Messages from './components/messages/Messages';
import NewRoom from './components/rooms/NewRoom';
import Room from './components/rooms/Room';
import Rooms from './components/rooms/Rooms';
import NewUser from './components/users/NewUser';
import User from './components/users/User';
import Users from './components/users/Users';
import Booking from './components/bookings/Booking';
import NewBooking from './components/bookings/NewBooking';
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
