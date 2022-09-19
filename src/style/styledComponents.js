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

const Subtitle = styled.h2`
  font-size: 28px;
  font-weight: 600;

  margin-bottom: 40px;
`;

const AmenitiesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const Amenitie = styled.div`
  width: fit-content;
  background-color: ${colors.lightGreen};
  color: ${colors.hardGreen};
  font-size: 16px;
  border-radius: 12px;

  padding: 20px 25px;

`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const SingleView = styled.div`
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;

  padding: 40px;

  & .single-view {

    &__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    &__header {
      border-bottom: 2px solid ${colors.bgGray};

      margin-bottom: 30px;

      display: flex;
      justify-content: space-between;
    }
    
    &__title {
      font-size: 30px;
      font-weight: 600;

      margin-bottom: 10px;

      display: block;
    }

    &__id {
      color: ${colors.green};

      margin-bottom: 30px;
      display: block;
    }

    &__menu {
      height: 20px;
      width: 20px;

      display: inline-block;
    }

    &__body {

      display: grid;
      grid-template-columns: 1fr 1fr;

      &-title {
        font-size: 14px;
        color: ${colors.gray};

        margin-bottom: 10px;
  
        display: block;
      }
  
      &-subtitle {
        font-size: 24px;

        margin-bottom: 30px;
  
        display: block;
      }

      &-text {
        margin-bottom: 30px;

        display: block;
      }
    }
  }


`;
export {
  Logo, Button, Amenitie, AmenitiesContainer, Subtitle, Row, SingleView,
};
