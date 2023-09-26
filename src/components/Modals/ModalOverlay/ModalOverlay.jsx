import ReactDom from 'react-dom';
import styles from './modalOverlay.module.css';

function ModalOverlay({ isOpen, closeModal, ...props }) {
  const modalPortal = document.querySelector("#modalPortal");

  function handleCloseModal(evt) {
    if(evt.target === evt.currentTarget) {
      closeModal(evt)
    }
  }

  if(!isOpen) {
    return null;
  } else {
    return ReactDom.createPortal(
      <div
        className={styles.modalOverlay}
        onClick={handleCloseModal}
      >
        {props.children}
      </div>,
      modalPortal
    )
  }
}

export default ModalOverlay;
