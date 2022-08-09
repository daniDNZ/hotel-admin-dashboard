import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: inline;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <div>
        <i>Menu-i (flechas) </i>
        <b>Dashboard (change)</b>
      </div>
      <div>
        <i>Contact-i</i>
        {' '}
        <i>Bell-i</i>
        {' '}
        <i>LogOut-i</i>
      </div>
    </HeaderContainer>
  );
}
