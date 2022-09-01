import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import colors from '../style/colors';

const FullCalendarContainer = styled.div`
width: 755px;
min-width: 500px;
background-color: white;
box-shadow: 0px 4px 4px #00000005;
border-radius: 20px;

padding: 20px;
margin-bottom: 40px;

// Custom calendar styles

.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard,
.fc-scrollgrid{
border: 0px;
}

.fc-theme-standard td {
cursor: pointer;
}

.fc .fc-daygrid-day-top {
justify-content: center;
}
.fc .fc-button-primary,
.fc .fc-button-primary:focus,
.fc .fc-button-primary:active, 
.fc .fc-button-primary:active:focus {
color: ${colors.gray};
background: none;
border: none;
box-shadow: none;
}

.fc .fc-daygrid-day.fc-day-today {
background-color: ${colors.lightGreen};
}
`;
export default function Calendar() {
  const getWeek = (day) => {
    const dayNumber = day.getDay() - 1 < 0 ? 6 : day.getDay() - 1;

    day.setDate(day.getDate() - dayNumber);
    const week = [];

    for (let i = 0; i < 7; i += 1) {
      const currentDay = new Date(day);
      week.push(currentDay);
      day.setDate(day.getDate() + 1);
    }

    return week;
  };

  const handleDateClick = (arg) => {
    const day = new Date(arg.dateStr);
    const week = getWeek(day);

    console.info(week);
  };
  return (
    <FullCalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </FullCalendarContainer>
  );
}
