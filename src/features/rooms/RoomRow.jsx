/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsNotAButton } from '../../assets/functions';
import { TableElementMenu } from '../../components/common/Table';
import { Button } from '../../style/styledComponents';
import ItemTypes from './ItemTypes';
import { deleteRoom, fetchRooms } from './roomsSlice';

function RoomRow({
  id, room, moveRow, index,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // DnD
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ROW,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const toggleElementMenu = (e) => {
    const elementMenu = e.target.nextElementSibling;
    // eslint-disable-next-line no-unused-expressions
    elementMenu.style.display === 'block'
      ? elementMenu.style.display = 'none'
      : elementMenu.style.display = 'block';
  };

  const deleteThisRoom = () => {
    dispatch(deleteRoom(room._id));
    dispatch(fetchRooms());
  };
  return (
    <tr ref={ref} style={{ opacity }} onClick={(e) => checkIsNotAButton(e, () => navigate(`${room._id}`))} data-handler-id={handlerId}>
      <td>
        <span>
          {`${room.type} Nº${room.number}`}
        </span>
        <br />
        <span>
          #
          {room._id}
        </span>
      </td>
      <td>
        {room.type}
      </td>
      <td>
        {room.number}
      </td>
      <td>
        {room.amenities.map((amenitie) => `${amenitie}, `)}
      </td>
      <td>
        {room.price}
        €
      </td>
      <td>
        {
                    // eslint-disable-next-line max-len
                    (parseFloat(room.price) - (parseFloat(room.price) * (parseFloat(room.discount) / 100))).toFixed(2)
                  }
        €
      </td>
      <td>
        Available
      </td>
      <td>
        <button type="button" onClick={toggleElementMenu}>...</button>
        <TableElementMenu>
          <Button green type="button" onClick={() => navigate(`${room._id}/update`)}>Update</Button>
          <Button type="button" onClick={deleteThisRoom}>Delete</Button>
        </TableElementMenu>
      </td>
    </tr>
  );
}

export default RoomRow;
