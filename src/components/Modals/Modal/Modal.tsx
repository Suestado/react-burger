import ReactDom from 'react-dom';
import React, { FC } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

interface IModal {
  title?: string,
  closeModal: () => void,
  children: React.ReactElement
}

const Modal: FC<IModal> = ({title, closeModal, children}): React.ReactElement => {
  const modalPortal = document.querySelector('#modalPortal') as HTMLElement;

  return ReactDom.createPortal(
    <ModalOverlay
      handleCloseModal={closeModal}>
      <div className={styles.modal}>
        {title &&
          <h2 className={`text text_type_main-large ${styles.header}`}>
            {title}
          </h2>}
        <div
          className={styles.closeBtnInner}
          onClick={closeModal}
        >
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalPortal,
  );
}

export default Modal;
