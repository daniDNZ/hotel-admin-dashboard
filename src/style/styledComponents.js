import styled from 'styled-components';
import colors from './colors';
import logo from '../assets/img/logo.png';

const Logo = styled.div`
  width: 220px;
  height: 57px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  margin-top: ${(props) => props.margin.top};
  margin-right: ${(props) => props.margin.right};
  margin-bottom: ${(props) => props.margin.bottom};
  margin-left: ${(props) => props.margin.left};
`;

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.green ? colors.hardGreen : colors.red)};
  background-color: ${(props) => (props.green ? colors.lightGreen : colors.lightRed)};
  border-radius: 8px;
  cursor: pointer;

  padding: 12px 40px;
  margin: 0 auto;

  &:hover {
    color: white;
    background-color: ${(props) => (props.green ? colors.hardGreen : colors.red)};
  }
`;

const Amenitie = styled.div`
`;
export { Logo, Button, Amenitie };
