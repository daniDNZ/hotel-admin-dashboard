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
        <Route path="/bookings" element={<Bookings />}>
          <Route path="/:id" element={<Booking />} />
          <Route path="/new" element={<NewBooking />} />
        </Route>
        <Route path="/rooms" element={<Rooms />}>
          <Route path="/:id" element={<Room />} />
          <Route path="/new" element={<NewRoom />} />
        </Route>
        <Route path="/users" element={<Users />}>
          <Route path="/:id" element={<User />} />
          <Route path="/new" element={<NewUser />} />
        </Route>
        <Route path="/contact" element={<Messages />}>
          <Route path="/:id" element={<Message />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
