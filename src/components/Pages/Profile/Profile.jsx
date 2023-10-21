import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const currentLocation = useLocation().pathname;

  return (
    <section className={styles.profile}>
      <form className={styles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={evt => setNameValue(evt.target.value)}
          value={nameValue}
          name={'nameInput'}
          icon={'EditIcon'}
        />
        <EmailInput
          onChange={evt => setEmailValue(evt.target.value)}
          value={emailValue}
          name={'emailInput'}
          placeholder="Логин"
          isIcon={true}
          icon={'EditIcon'}
        />
        <PasswordInput
          onChange={evt => setPasswordValue(evt.target.value)}
          value={passwordValue}
          name={'passwordInput'}
          icon={'EditIcon'}
        />
      </form>
      <div className={styles.navContainer}>
        <nav className={styles.navBar}>
          <ul className={`${styles.navList} text text_type_main-medium`}>
            <li className={`${styles.navItem} ${currentLocation !== '/profile' && 'text_color_inactive'}`}>Профиль</li>
            <li className={`${styles.navItem} ${currentLocation !== '/history' && 'text_color_inactive'}`}>История заказов</li>
            <li className={`${styles.navItem} ${currentLocation !== '/exit' && 'text_color_inactive'}`}>Выход</li>
          </ul>
        </nav>
        <p className={`${styles.navDescription} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </section>
  );
}

export default memo(Profile);
