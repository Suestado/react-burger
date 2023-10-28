import ReactDom from 'react-dom';
import { useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { MODAL_TYPES } from '../../../utils/types';

function Modal({ title, closeModal, children }) {
  const modalPortal = document.querySelector('#modalPortal');

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeModal(evt);
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  function handleCloseModalOverlay(evt) {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      closeModal(evt);
    }
  }

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

Modal.propTypes = MODAL_TYPES;

export default Modal;
