import styles from './modalOverlay.module.css';
import { MODAL_OVERLAY_TYPES } from '../../../utils/types';

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

ModalOverlay.propTypes = MODAL_OVERLAY_TYPES;

export default ModalOverlay;
