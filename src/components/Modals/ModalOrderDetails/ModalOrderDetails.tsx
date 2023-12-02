import ReactDom from 'react-dom';
import React, { FC } from 'react';
import styles from './ModalOrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

interface IModalOrderDetails {
  closeModal: () => void,
  children: React.ReactElement
}

const ModalOrderDetails: FC<IModalOrderDetails> = ({closeModal, children}): React.ReactElement => {
  const modalPortal = document.querySelector('#modalPortal') as HTMLElement;

  return ReactDom.createPortal(
    <ModalOverlay
      handleCloseModal={closeModal}>
      <div className={styles.modal}>
        <div
          className={styles.closeIcon}
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

export default ModalOrderDetails;
