import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../style/colors';
import Header from './Header';
import Sidebar from './Sidebar';

const AppWrapper = styled.div`
  max-width: 100vw;
  height: 100%;
  // Problemas de flex con swiper
  /* display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start; */

  & .content-container {
    width: 100%;
    min-height: 100vh;
    background-color: ${colors.bgGray};

    // Padding para la sidebar / problemas de flex con swiper
    padding-left: 345px;

    &.remove-padding-left {
      padding-left: 0;
    }
  }
  
  & .padder {
    padding: 50px;
  }
`;
function Layout() {
  return (
    <AppWrapper>
      <Sidebar />
      <div id="contentContainer" className="content-container">
        <Header />
        <div className="padder">
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}

export default Layout;
