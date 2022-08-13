import styled from 'styled-components';
import colors from '../../style/colors';

const TableWrapper = styled.div`
 overflow-x: auto;

  & td, th{
    padding: 20px 20px;
    white-space: nowrap;
  }

  & td:first-child, th:first-child {
    padding-left:30px;
  }

  & td:last-child, th:last-child {
    padding-right:30px;
  }

  & table {
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  text-align: left;
}

& thead {
  border-bottom: 2px solid ${colors.bgGray};
}

& tbody {
  & tr {
    cursor: pointer;

    &:hover {
      box-shadow: 0px 4px 30px #0000001A;
    }
  }
}

& .specialRequest {
  max-width: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

`;

const TableTabs = styled.div`
    margin-bottom: 36px;

  &, .table-tabs__list, .table-tabs__sort {
    white-space: nowrap;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  & .table-tabs__list{

    & li {
      color: ${colors.gray};
      border-bottom: 2px solid ${colors.borderGray};

      padding: 13px 23px;

      &.active-table-tab {
        color: ${colors.hardGreen};
        border-color: ${colors.hardGreen};
      }
    }
  }

  & input[type=search]{
    background-color: white;
    border-radius: 10px;
    border: 2px solid ${colors.green};

    padding: 10px;
    margin-right: 20px;
  }
`;

function Table({ children }) {
  return (
    <TableWrapper>
      <table>
        {children}
      </table>
    </TableWrapper>
  );
}

export { Table, TableTabs };
