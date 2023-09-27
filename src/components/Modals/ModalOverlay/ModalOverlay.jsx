import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

function ModalOverlay({ handleCloseModal, children }) {
  ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleCloseModal}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
