import ReactDom from 'react-dom';
import React, {useEffect, useCallback, FC, MouseEvent} from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

interface IModal {
  title?: string,
  closeModal: () => void,
  children: React.ReactElement
}

const Modal: FC<IModal> = ({ title, closeModal, children }) => {
  const modalPortal = document.querySelector('#modalPortal') as HTMLElement;

  useEffect(() => {
    function handleEscClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown' as const, handleEscClose);

    return () => document.removeEventListener('keydown' as const, handleEscClose);
  }, []);

  const handleCloseModalOverlay = useCallback((evt: MouseEvent) => {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }, []);

  return ReactDom.createPortal(
    <ModalOverlay
      handleCloseModal={handleCloseModalOverlay}>
      <div className={styles.modal}>
        <h2 className={`text text_type_main-large ${styles.header}`}>
          {title}
          <div
            className={styles.closeBtn}
            onClick={closeModal}
          >
            <CloseIcon type="primary"/>
          </div>
        </h2>
        {children}
      </div>
    </ModalOverlay>,
    modalPortal,
  );
}

export default Modal;
