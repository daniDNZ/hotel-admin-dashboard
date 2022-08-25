import styled from 'styled-components';
import colors from '../../style/colors';

const StyledForm = styled.form`

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  & h3 {
    font-size: 20px;
  }

  & input:not([type=submit]), select, textarea{
    &:not([type=checkbox]):not([type=radio]) { 
      width: 100%;
    }
    border: 1px solid ${colors.borderGray};
    border-radius: 8px;
    background-color: white;

    margin-top: 10px;
    margin-bottom: 20px;
    padding: 5px 10px;
  }

  & input[type=checkbox], input[type=radio] {
    display: inline;
    margin-right: 10px;
  }

`;

export default StyledForm;
