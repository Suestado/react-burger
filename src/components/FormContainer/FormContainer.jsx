import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './formContainer.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FORM_CONTAINER_TYPES } from '../../utils/types';
import Modal from '../Modals/Modal/Modal';
import { userResetFailure } from '../../services/actions/userActions';

function FormContainer({ children, header, buttonText, bottomOptionOne, bottomOptionTwo, onSubmit, errorTitle }) {
  const { showFailureMessage, failureMessage } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  const onCloseModal = () => {
    dispatch(userResetFailure());
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={`text text_type_main-medium ${styles.header}`}>{header}</h2>
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
        >
          {children}
          <div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
            >
              {buttonText}
            </Button>
          </div>
        </form>

        <div className={`${styles.bottomContainer} text text_type_main-default text_color_inactive`}>
          {`${bottomOptionOne.text} `}
          <Link
            className={`${styles.bottomLink} text text_type_main-default text_color_inactive`}
            to={bottomOptionOne.navLink}
          >
            {bottomOptionOne.linkText}
          </Link>
        </div>
        {bottomOptionTwo &&
          <div className={`${styles.bottomContainer} text text_type_main-default text_color_inactive`}>
            {`${bottomOptionTwo.text} `}
            <Link
              className={`${styles.bottomLink} text text_type_main-default text_color_inactive`}
              to={bottomOptionTwo.navLink}
            >
              {bottomOptionTwo.linkText}
            </Link>
          </div>
        }
      </div>

      {showFailureMessage && <Modal
        title={errorTitle}
        closeModal={onCloseModal}
      >
        <span className={`text text_type_main-medium ${styles.errorMessage}`}>
          {failureMessage}
        </span>
      </Modal>
      }
    </>
  );
}

FormContainer.propTypes = FORM_CONTAINER_TYPES;

export default memo(FormContainer);
