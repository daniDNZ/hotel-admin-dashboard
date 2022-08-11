import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../style/styledComponents';

const MessageModal = styled.div`
  width: 800px;
  height: 400px;
  background-color: white;
  box-shadow: 0px 16px 30px #00000014;
  border-radius: 20px;

  margin: auto; 
  padding: 30px;

  display: none;
  position: absolute;
  left: 0; 
  right: 0; 
  top: 0;
  bottom: 0;
  z-index: 1000;

  & .modal__comment {
    margin-bottom: 30px;
  }

  &.show {
    display: block;
  }

`;

function Modal({ data, openModal, setOpenModal }) {
  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const modal = document.querySelector('#modal');
    if (openModal) modal.classList.add('show');
    else modal.classList.remove('show');
  }, [openModal]);
  return (
    <MessageModal id="modal">
      <p className="modal__comment">
        {data}
      </p>
      <Button onClick={closeModal}>Close</Button>
    </MessageModal>
  );
}

export default Modal;
