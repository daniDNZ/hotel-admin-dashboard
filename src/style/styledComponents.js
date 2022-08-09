import styled from 'styled-components';
import colors from './colors';

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 14px;
  font-weight: 600;
  align-text: center;
  color: ${(props) => (props.green ? colors.hardGreen : 'black')};
  background-color: ${(props) => (props.green ? colors.lightGreen : 'transparent')};
  border: ${(props) => (props.green ? 'none' : '3px solid black')};
  border-radius: 8px;
  cursor: pointer;

  padding: 12px 40px;
  margin: 0 auto;
`;

export default Button;
