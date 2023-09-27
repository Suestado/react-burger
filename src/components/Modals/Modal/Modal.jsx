import ReactDom from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ isOpen, title, closeModal, children }) {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  const modalPortal = document.querySelector('#modalPortal');

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  function handleCloseModalOverlay(evt) {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      closeModal(evt);
    }
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeModal(evt);
    }
  }

  if (!isOpen) {
    return null;
  } else {
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
}

export default Modal;
