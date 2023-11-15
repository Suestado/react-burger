import React, { memo, FC, MouseEvent } from 'react';
import styles from './modalOverlay.module.css';

interface IModalOverlay {
  handleCloseModal: (evt: MouseEvent) => void,
  children: React.ReactElement
}

const ModalOverlay: FC<IModalOverlay> = ({ handleCloseModal, children }): React.ReactElement => {

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
