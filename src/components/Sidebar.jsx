import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import colors from '../style/colors';
import icons from '../style/icons';
import Button from '../style/styledComponents';

const Logo = styled.div`
  width: 220px;
  height: 57px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  margin: 0 48px 62px;
`;

const SidebarContainer = styled.div`
  max-width: 345px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 13px 3px 40px #00000005;

  padding-top: 32px;

  display: block;

  &.hide{
    display: none;
  }
`;

const NavItem = styled.li`
  color: ${colors.green};
  font-weight: 600;

  padding: 20px 48px;

  position: relative;

  &.active {
    color: ${colors.red};

    &::after {
      content: '';
      width: 8px;
      height: 67px;
      background-color: ${colors.red};
      border-radius: 0px 6px 6px 0px;
  
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  & i {
    margin-right: 22px;
  }
`;

const UserContainer = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  text-align: center;

  padding: 24px 35px;
  margin: 41px 56px 62px;

  & .sidebar__user-name {
    font-weight: 500;


    display: block;
  }

  & .sidebar__email {
    font-weight: 200;
    font-size: 12px;
    line-height: 18px;
    color: ${colors.light};

    margin-bottom: 16px;

    display: block;
  }
`;

const UserPhoto = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;

  margin: 0 auto 15px;
`;

const SidebarFooter = styled.div`
  padding-left: 56px;

  & .sidebar-footer {
    &__name {
      font-weight: 600;
      display: block;
    }
    &__copy {
      font-weight: 200;
      font-size: 14px;
      line-height: 21px;
      color:${colors.light};
      display: block;
    }
  }
`;

function Sidebar() {
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.split('/')[1];
    if (path === '') path = 'dashboard';

    const activeItem = document.querySelector(`#${path}`);
    activeItem.classList.add('active');

    return (() => activeItem.classList.remove('active'));
  }, [location]);

  return (
    <SidebarContainer id="sidebar">
      <Logo />
      <ul>
        <NavItem id="dashboard">
          <Link to="/">
            {icons.dashboard}
            {' '}
            Dashboard
          </Link>
        </NavItem>
        <NavItem id="bookings">
          <Link to="/bookings">
            {icons.bookings}
            {' '}
            Bookings
          </Link>
        </NavItem>
        <NavItem id="rooms">
          <Link to="/rooms">
            {icons.rooms}
            {' '}
            Rooms
          </Link>
        </NavItem>
        <NavItem id="contact">
          <Link to="/contact">
            {icons.contact}
            {' '}
            Contact
          </Link>
        </NavItem>
        <NavItem id="users">
          <Link to="/users">
            {icons.users}
            {' '}
            Users
          </Link>
        </NavItem>
      </ul>
      <UserContainer>
        <UserPhoto />
        <span className="sidebar__user-name">Maxi Rainforth</span>
        <span className="sidebar__email">mrainforth0@mail.com</span>
        <Button green>Editar</Button>
      </UserContainer>
      <SidebarFooter>
        <span className="sidebar-footer__name">Travl Hotel Admin Dashboard</span>
        <span className="sidebar-footer__copy">© 2022 All Rights Reserved</span>
      </SidebarFooter>
    </SidebarContainer>
  );
}

export default Sidebar;
