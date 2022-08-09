import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
function Layout() {
  return (
    <AppWrapper>
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </AppWrapper>
  );
}

export default Layout;
