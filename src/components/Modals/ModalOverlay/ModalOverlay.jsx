import { memo } from 'react';
import styles from './modalOverlay.module.css';

function ModalOverlay({ handleCloseModal, children }) {

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
