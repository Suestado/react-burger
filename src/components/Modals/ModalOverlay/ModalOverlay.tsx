import React, { memo, FC, MouseEvent, useEffect, useCallback } from 'react';
import styles from './modalOverlay.module.css';

interface IModalOverlay {
  handleCloseModal: () => void,
  children: React.ReactElement
}

const ModalOverlay: FC<IModalOverlay> = ({handleCloseModal, children}): React.ReactElement => {

  useEffect(() => {
    function handleEscClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    }

    document.addEventListener('keydown' as const, handleEscClose);

    return () => document.removeEventListener('keydown' as const, handleEscClose);
  }, []);

  const handleCloseModalOverlay = useCallback((evt: MouseEvent): void => {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  }, []);

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleCloseModalOverlay}
    >
      {children}
    </div>
  );
}

export default memo(ModalOverlay);
