import React, { memo, FC, MouseEvent } from 'react';
import styles from './modalOverlay.module.css';

interface IModalOverlay {
  handleCloseModal: (evt: MouseEvent) => void,
  children: React.ReactElement | React.ReactNode
}

const ModalOverlay: FC<IModalOverlay> = ({ handleCloseModal, children }) => {

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleCloseModal}
    >
      {children}
    </div>
  );
}

export default memo(ModalOverlay);
