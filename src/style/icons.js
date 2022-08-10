import styled from 'styled-components';
import { ReactComponent as DashboardIcon } from '../assets/svg/dashboardIcon.svg';
import { ReactComponent as BookingsIcon } from '../assets/svg/bookingsIcon.svg';
import { ReactComponent as RoomsIcon } from '../assets/svg/roomsIcon.svg';
import { ReactComponent as ContactIcon } from '../assets/svg/contactIcon.svg';
import { ReactComponent as UsersIcon } from '../assets/svg/usersIcon.svg';
import { ReactComponent as MenuIcon } from '../assets/svg/menuIcon.svg';
import { ReactComponent as MessageIcon } from '../assets/svg/messageIcon.svg';
import { ReactComponent as BellIcon } from '../assets/svg/bellIcon.svg';
import { ReactComponent as LogoutIcon } from '../assets/svg/logoutIcon.svg';
import { ReactComponent as Bed } from '../assets/svg/bed.svg';
import { ReactComponent as CheckIn } from '../assets/svg/checkIn.svg';
import { ReactComponent as CheckOut } from '../assets/svg/checkOut.svg';

const Icon = styled.i`
  min-width: 48px;
  height: 48px;

  padding: 12px;

  position: relative;

  & svg {
    width: 24px;
    height: 24px;

    position: absolute;
    left: 0;
  }
`;

const icons = {
  dashboard: <Icon><DashboardIcon /></Icon>,
  bookings: <Icon><BookingsIcon /></Icon>,
  rooms: <Icon><RoomsIcon /></Icon>,
  contact: <Icon><ContactIcon /></Icon>,
  users: <Icon><UsersIcon /></Icon>,
  menu: <Icon><MenuIcon /></Icon>,
  message: <Icon><MessageIcon /></Icon>,
  bell: <Icon><BellIcon /></Icon>,
  logout: <Icon><LogoutIcon /></Icon>,
  bed: <Icon><Bed /></Icon>,
  checkIn: <Icon><CheckIn /></Icon>,
  checkOut: <Icon><CheckOut /></Icon>,
};

export default icons;
