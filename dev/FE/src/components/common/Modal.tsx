import React, { FC, ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    onClose();
    e.stopPropagation();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="modal-content fixed top-0 left-0 flex justify-center items-center bg-black/40  w-full h-full z-20"
          onClick={handleBackgroundClick}
        >
          <div onClick={handleContentClick}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
