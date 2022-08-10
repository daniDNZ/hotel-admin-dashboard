import styled from 'styled-components';
import colors from './colors';

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

export default Button;
