import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../style/colors';
import Header from './Header';
import Sidebar from './Sidebar';

const AppWrapper = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  & .content-container {
    width: 100%;
  }

  & .content-padder {
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
        <div className="content-padder">
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}

export default Layout;
