import { Kpi, KpiRow } from './common/Kpi';
import bookingsData from '../assets/data/bookings.json';
import roomsData from '../assets/data/rooms.json';
import { MessagesRow } from '../features/messages/Message';
import BarChart from './BarChart';
import icons from '../style/icons';
import { Row } from '../style/styledComponents';
import Calendar from './Calendar';

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

  const data = {
    sales: [
      { day: '08/22/2022', value: 2500 },
      { day: '08/23/2022', value: 3000 },
      { day: '08/24/2022', value: 1100 },
      { day: '08/25/2022', value: 800 },
      { day: '08/26/2022', value: 2850 },
      { day: '08/27/2022', value: 4673 },
      { day: '08/28/2022', value: 3857 },
    ],
    occupation: [
      { day: '08/22/2022', value: 20 },
      { day: '08/23/2022', value: 32 },
      { day: '08/24/2022', value: 38 },
      { day: '08/25/2022', value: 30 },
      { day: '08/26/2022', value: 67 },
      { day: '08/27/2022', value: 89 },
      { day: '08/28/2022', value: 70 },
    ],
  };

  return (
    <>
      <KpiRow>
        <Kpi data={{ icon: icons.bed, number: bookingsData.length, text: 'New Booking' }} />
        <Kpi data={{ icon: icons.bookings, number: getOccupationPercentage(), text: 'Occupation' }} />
        <Kpi data={{ icon: icons.checkIn, number: getCheckIns(), text: 'Check In' }} />
        <Kpi data={{ icon: icons.checkOut, number: getCheckOuts(), text: 'Check Out' }} />
      </KpiRow>
      <Row>
        <Calendar />
        <BarChart data={data} h={600} w={710} />
      </Row>
      <MessagesRow />
    </>
  );
}

export default Dashboard;
