import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContextProvider';
import colors from '../style/colors';
import icons from '../style/icons';

const HeaderContainer = styled.header`
  box-shadow: 0px 3px 10px #00000005;
  background-color: white;

  padding: 40px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  & .header{
    &__left {
      display: flex;
      & button {
        margin-right: 22px;
      }
    }
    &__right {
      display: flex;

      & button {
        color: ${colors.hardGreen};

        margin-right: 22px;
      }
    }
    &__current-page {
      font-size: 22px;
      font-weight: 600;
      line-height: 42px;
    }
  }
`;

export default function Header() {
  const { dispatchAuth } = useContext(AuthContext);
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];
  const path = pathname === '' ? 'Dashboard' : pathname.charAt(0).toUpperCase() + pathname.slice(1);

  const toggleMenu = () => {
    const sidebar = document.querySelector('#sidebar');
    const contentContainer = document.querySelector('#contentContainer');
    if (sidebar.classList.contains('hide')) {
      sidebar.classList.remove('hide');
      contentContainer.classList.remove('remove-padding-left');
    } else {
      sidebar.classList.add('hide');
      contentContainer.classList.add('remove-padding-left');
    }
  };
  return (
    <HeaderContainer>
      <div className="header__left">
        <button type="button" onClick={toggleMenu}>{icons.menu}</button>
        <span className="header__current-page">{path}</span>
      </div>
      <div className="header__right">
        <button type="button">{icons.message}</button>
        <button type="button">{icons.bell}</button>
        <button type="button" onClick={() => dispatchAuth({ type: 'LOGOUT' })}>{icons.logout}</button>
      </div>
    </HeaderContainer>
  );
}
