import icons from '../style/icons';
import { Kpi, KpiRow } from './common/Kpi';
import bookingsData from '../assets/data/bookings.json';
import roomsData from '../assets/data/rooms.json';
import { MessagesRow } from './common/Message';

function Dashboard() {
  const getOccupationPercentage = () => {
    const vacants = roomsData.filter((room) => {
      let bool = true;
      bookingsData.forEach((booking) => {
        if (booking.id === room.id) bool = false;
      });
      return bool;
    });
    const percentage = `${100 - (Math.round((vacants.length * 100) / roomsData.length))} %`;
    return percentage;
  };

  const getCheckIns = () => {
    const checkIns = bookingsData.filter((booking) => booking.status === 'checkin');
    return checkIns.length;
  };

  const getCheckOuts = () => {
    const checkOuts = bookingsData.filter((booking) => booking.status === 'checkout');
    return checkOuts.length;
  };

  return (
    <>
      <KpiRow>
        <Kpi data={{ icon: icons.bed, number: bookingsData.length, text: 'New Booking' }} />
        <Kpi data={{ icon: icons.bookings, number: getOccupationPercentage(), text: 'Occupation' }} />
        <Kpi data={{ icon: icons.checkIn, number: getCheckIns(), text: 'Check In' }} />
        <Kpi data={{ icon: icons.checkOut, number: getCheckOuts(), text: 'Check Out' }} />
      </KpiRow>
      <MessagesRow />
    </>
  );
}

export default Dashboard;
