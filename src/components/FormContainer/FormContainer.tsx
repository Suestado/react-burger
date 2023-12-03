import React, { memo, FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './formContainer.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import { userResetFailure } from '../../services/actions/userActions';
import { useDispatch, useSelector } from "../../services/hooks/reduxHooks";

interface IFormContainer {
  children: React.ReactElement | React.ReactElement[],
  header: string,
  buttonText: string,
  bottomOptionOne?: {
    text: string,
    navLink: string,
    linkText: string,
  },
  bottomOptionTwo?: {
    text: string,
    navLink: string,
    linkText: string,
  },
  onSubmit: () => void;
  errorTitle: string,
}

const FormContainer: FC<IFormContainer> = (
  {
    children,
    header,
    buttonText,
    bottomOptionOne,
    bottomOptionTwo,
    onSubmit,
    errorTitle
  }
): React.ReactElement => {
  const {showFailureMessage, failureMessage} = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();

  const handleFormSubmit = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onSubmit();
  };

  const onCloseModal = (): void => {
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

        {bottomOptionOne &&
          <div className={`${styles.bottomContainer} text text_type_main-default text_color_inactive`}>
            {`${bottomOptionOne.text} `}
            <Link
              className={`${styles.bottomLink} text text_type_main-default text_color_inactive`}
              to={bottomOptionOne.navLink}
            >
              {bottomOptionOne.linkText}
            </Link>
          </div>}
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

export default memo(FormContainer);
