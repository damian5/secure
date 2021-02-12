import React, { FC } from 'react';
import { ModalWrapper } from './styles';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactElement;
}

const Modal: FC<ModalProps> = ({ children, onClose, title }) => (
  <ModalWrapper onClick={onClose}>
    <div className="children-container" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} >x</button>
      <h1>{title || 'Modal'}</h1>
      {children}
    </div>
  </ModalWrapper>
);

export default Modal;