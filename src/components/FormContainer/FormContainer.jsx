import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './formContainer.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function FormContainer({ children, header, buttonText, bottomOptionOne, bottomOptionTwo }) {
  return (
    <div className={styles.formContainer}>
      <h2 className={`text text_type_main-medium ${styles.header}`}>{header}</h2>
      <form className={styles.form} action="">
          {children}
        <div>
          <Button htmlType="button" type="primary" size="large">
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
  );
}

export default memo(FormContainer);
