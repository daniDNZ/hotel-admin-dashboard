import styled from 'styled-components';
import colors from './colors';
import logo from '../assets/img/logo.png';

type LogoProps = {
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  }
}

const Logo = styled.div`
  width: 220px;
  height: 57px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  margin-top: ${({ margin }: LogoProps) => margin.top};
  margin-right: ${({ margin }: LogoProps) => margin.right};
  margin-bottom: ${({ margin }: LogoProps) => margin.bottom};
  margin-left: ${({ margin }: LogoProps) => margin.left};
`;

type ButtonProps = {
  green: boolean;
}

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${({ green }: ButtonProps) => (green ? colors.hardGreen : colors.red)};
  background-color: ${({ green }: ButtonProps) => (green ? colors.lightGreen : colors.lightRed)};
  border-radius: 8px;
  cursor: pointer;

  padding: 12px 40px;
  margin: 0 auto;

  &:hover {
    color: white;
    background-color: ${({ green }: ButtonProps) => (green ? colors.hardGreen : colors.red)};
  }
`;

const Subtitle = styled.h2`
  font-size: 28px;
  font-weight: 600;

  margin-bottom: 40px;
`;

const Amenitie = styled.div`
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
export {
  Logo, Button, Amenitie, Subtitle, Row,
};
