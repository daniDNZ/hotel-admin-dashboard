/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import colors from '../../style/colors';
import messagesData from '../../assets/data/messages.json';
import rightArrow from '../../assets/svg/rightArrow.svg';
import leftArrow from '../../assets/svg/leftArrow.svg';

import 'swiper/css';
import 'swiper/css/bundle';
import icons from '../../style/icons';
import Button from '../../style/styledComponents';

const MessagesContainer = styled.div`
min-width: 1060px;
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;  

  padding-top: 30px;
  padding-bottom: 40px;

  .messages {
    &__title {
      font-size: 20px;
      line-height: 30px;

      margin-left: 30px;

      display: block;
    }
  }

  & .swiper {
    padding: 30px 70px 30px 30px;

    &-button-next {
      width: 56px;
      height: 56px;
      background-color: ${colors.hardGreen};
      border: 1px solid #FFFFFF;
      border-radius: 12px;

      &::after{
        content: '';
        width: 24px;
        height: 24px;
        background-image: url(${rightArrow});
        background-size: 24px 24px;
      }
    }
    
    &-button-prev {
      width: 56px;
      height: 56px;
      border: 1px solid #FFFFFF;
      border-radius: 12px;
      background-color: ${colors.hardGreen};
      
      &::after{
        content: '';
        width: 24px;
        height: 24px;
        background-image: url(${leftArrow});
        background-size: 24px 24px;
      }
    }

    &-button-disabled {
      display: none;
    }

  }

`;

const MessageItem = styled.div`
  max-width: 431px;
  overflow: hidden;
  height: 275px;
  border: 1px solid #EBEBEB;
  border-radius: 20px;
  cursor: pointer;

  padding: 30px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  &:hover {
    box-shadow: 0px 16px 30px #00000014;
  }

  .message {
    &__bottom{
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    &__name-date-container{}
    &__full-name{
      font-weight: 600;

      display: block;
    }
    &__date{
      color: ${colors.light};
      display: block;
    }
    &__status{
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
    }
  }
`;

const StatusIcon = styled.span`
  color: ${colors.hardGreen};
  text-align: center;
`;

const CancelIcon = styled(StatusIcon)`
  color: ${colors.red};
`;

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

    modal.classList.toggle('show');
  }, [openModal]);
  return (
    <MessageModal id="modal">
      <p className="modal__comment">
        {data.comment}
      </p>
      <Button onClick={closeModal}>Close</Button>
    </MessageModal>
  );
}

function MessagesRow() {
  const [modalData, setModalData] = useState(messagesData[0]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <MessagesContainer>
        <span className="messages__title">Latest Messages by Customers</span>
        <Swiper
      // install Swiper modules
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={3}
          navigation
        >
          {
          messagesData.map((message) => (
            <SwiperSlide key={message.id}>
              <Message data={message} setModalData={setModalData} setOpenModal={setOpenModal} />
            </SwiperSlide>
          ))
        }
        </Swiper>
      </MessagesContainer>
      <Modal data={modalData} openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

function Message({ data, setModalData, setOpenModal }) {
  const openModal = () => {
    setOpenModal(true);
    setModalData(data);
  };
  return (
    <MessageItem onClick={openModal}>
      <p>{data.subject}</p>
      <div className="message__bottom">
        <div className="message__name-date-container">
          <span className="message__full-name">{data.customer}</span>
          <span className="message__date">{data.date}</span>
        </div>
        <div className="message__status">
          {data.status
            ? <StatusIcon>{icons.checkCircle}</StatusIcon>
            : <CancelIcon>{icons.cancel}</CancelIcon>}
        </div>
      </div>
    </MessageItem>
  );
}

export { Message, MessagesRow };
