import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../style/colors';
import Header from './Header';
import Sidebar from './Sidebar';

const AppWrapper = styled.div`
  max-width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  & .content-container {
    // The following styles fix the swiper bug (initializes too big)
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    min-height: 0;
    min-width: 0;
  }

  & .padder {
    width: 100%;
    height: 100%;
    background-color: ${colors.bgGray};

    padding: 50px;
  }
`;
function Layout({ setAuth }) {
  return (
    <AppWrapper>
      <Sidebar />
      <div className="content-container">
        <Header setAuth={setAuth} />
        <div className="padder">
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}

export default Layout;
