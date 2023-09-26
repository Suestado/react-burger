import { useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Modal({ title, closeModal, ...props }) {

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose)
  }, []);

  function handleEscClose(evt) {
    if(evt.key === 'Escape') {
      closeModal(evt);
    }
  }

  return (
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
      {props.children}
    </div>
  );
}

export default Modal;
