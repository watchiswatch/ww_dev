import { Reader } from '@/types/reader.type';
import { useDrag, useDrop } from 'react-dnd';

export const useDraggable = (type: string, id: string) => {
  const [{ isDragging, getItem }, drag, preview] = useDrag({
    type: type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      getItem: monitor.getItem(),
    }),
  });

  return { isDragging, getItem, drag, preview };
};

export const useDroppable = (
  accept: string,
  onDrop: (droppedItem: { id: string }) => void,
) => {
  const [{ isOver }, drop] = useDrop({
    accept: accept,
    drop: (item: { id: string }) => {
      // do something when an item is dropped
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return { isOver, drop };
};

export const useDroppableForRfidCard = (
  accept: string,
  onDrop: (readerData: Reader, droppedItem: { id: string }) => void,
  data: Reader,
) => {
  const [{ isOver }, drop] = useDrop({
    accept: accept,
    drop: (item: { id: string }) => {
      // do something when an item is dropped
      onDrop(data, item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return { isOver, drop };
};
