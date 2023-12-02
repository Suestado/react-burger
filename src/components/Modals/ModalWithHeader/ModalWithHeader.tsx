import ReactDom from 'react-dom';
import React, { FC } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

interface IModalWithHeader {
  title?: string,
  closeModal: () => void,
  children: React.ReactElement
}

const ModalWithHeader: FC<IModalWithHeader> = ({title, closeModal, children}): React.ReactElement => {
  const modalPortal = document.querySelector('#modalPortal') as HTMLElement;

  return ReactDom.createPortal(
    <ModalOverlay
      handleCloseModal={closeModal}>
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

export default ModalWithHeader;
