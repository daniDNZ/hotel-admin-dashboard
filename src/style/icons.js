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

const Icon = styled.i`
  position: relative;
  margin-right: 44px;
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
};

export default icons;
