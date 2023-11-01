import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import MainApi from '../../utils/MainApi';
import { logOutUser, refreshUser } from '../../services/actions/userActions';

function Profile() {
  const currentUser = useSelector((store) => store.currentUser);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [passwordValue, setPasswordValue] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentLocation = useLocation().pathname;
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const resetButtonRef = useRef();

  useEffect(() => {
    if (nameValue !== currentUser.name || emailValue !== currentUser.email || passwordValue) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  useEffect(() => {
    nameInputRef.current.focus();
  }, [isDisabled]);

  const handleLogout = () => {
    MainApi.logOut(localStorage.getItem('refreshToken'))
      .then((res) => {
        if (res.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(logOutUser());
        }
      })
      .catch((err) => {
        console.log(`При попытке выхода из аккаунта произошла ошибка - ${err}`);
      });
  };

  const onActivateInput = () => {
    setIsDisabled(false);
  };

  const onDisableInput = () => {
    setIsDisabled(true);
  };

  const updateUser = () => {
    MainApi.updateUser(nameValue, emailValue, passwordValue, localStorage.getItem('accessToken'))
      .then((res) => {
        if (res.success) {
          dispatch(refreshUser(res.user.name, res.user.email));
          setIsButtonActive(false);
        }
      })
      .catch((err) => {
        console.log(`При обновлении данных пользователя произошла ошибка - ${err}`);
      });
  };

  const resetForm = () => {
    setNameValue(currentUser.name);
    setEmailValue(currentUser.email);
    setPasswordValue('');
  };

  return (
    <section className={styles.profile}>
      <form className={styles.form} ref={resetButtonRef}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={evt => setNameValue(evt.target.value)}
          value={nameValue}
          name={'nameInput'}
          icon={'EditIcon'}
          disabled={isDisabled}
          onIconClick={onActivateInput}
          onBlur={onDisableInput}
          ref={nameInputRef}
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
        {isButtonActive && <div className={styles.buttonsContainer}>
          <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>Отменить</Button>
          <Button htmlType="button" type="primary" size="medium" onClick={updateUser}>Сохранить</Button>
        </div>}

      </form>
      <div className={styles.navContainer}>
        <nav className={styles.navBar}>
          <ul className={`${styles.navList} text text_type_main-medium`}>
            <li className={`${styles.navItem} ${currentLocation !== '/profile' && 'text_color_inactive'}`}>
              <Link to="/profile" className={styles.navLink}>Профиль</Link>
            </li>
            <li className={`${styles.navItem} ${currentLocation !== '/profile/orders' && 'text_color_inactive'}`}>
              <Link to="/profile/orders" className={styles.navLink}>История заказов</Link>
            </li>
            <li className={`${styles.navItem} ${currentLocation !== '/exit' && 'text_color_inactive'}`}
                onClick={handleLogout}
            >Выход
            </li>
          </ul>
        </nav>
        <p className={`${styles.navDescription} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </section>
  );
}

export default Profile;
