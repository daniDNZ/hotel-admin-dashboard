import { Route, Routes } from 'react-router-dom';
import './App.css';
import Booking from './components/bookings/Booking';
import Bookings from './components/bookings/Bookings';
import NewBooking from './components/bookings/NewBooking';
import Header from './components/Header';
import Home from './components/Home';
import Message from './components/messages/Message';
import Messages from './components/messages/Messages';
import NewRoom from './components/rooms/NewRoom';
import Room from './components/rooms/Room';
import Rooms from './components/rooms/Rooms';
import Sidebar from './components/Sidebar';
import NewUser from './components/users/NewUser';
import User from './components/users/User';
import Users from './components/users/Users';

function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </div>
  );
}

export default App;
