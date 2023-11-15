import React, { useState, useEffect, useRef, FC, ChangeEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {logOut, updateUser} from '../../utils/MainApi';
import { logOutUser, refreshUser } from '../../services/actions/userActions';

const Profile: FC = (): React.ReactElement => {
  const currentUser = useSelector((store: any) => store.currentUser);
  const [nameValue, setNameValue] = useState<string>(currentUser.name);
  const [emailValue, setEmailValue] = useState<string>(currentUser.email);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const currentLocation: string = useLocation().pathname;
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameValue !== currentUser.name || emailValue !== currentUser.email || passwordValue) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  //TODO почему TS игнорирует проверку? С учетом ее до кода с ошибкой дойдет дело только в случее, если nameInputRef!== undefined
  useEffect(() => {
    if(nameInputRef) {
      nameInputRef.current.focus();
    }
  }, [isDisabled]);

  const handleLogout = (): void => {
    logOut(localStorage.getItem('refreshToken'))
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

  const onActivateInput = (): void => {
    setIsDisabled(false);
  };

  const onDisableInput = (): void => {
    setIsDisabled(true);
  };

  const handleUpdateUser = (): void => {
    updateUser(nameValue, emailValue, passwordValue, localStorage.getItem('accessToken'))
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

  const resetForm = (): void => {
    setNameValue(currentUser.name);
    setEmailValue(currentUser.email);
    setPasswordValue('');
  };

  return (
    <section className={styles.profile}>
      <form className={styles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => setNameValue(evt.target.value)}
          value={nameValue}
          name={'nameInput'}
          icon={'EditIcon'}
          disabled={isDisabled}
          onIconClick={onActivateInput}
          onBlur={onDisableInput}
          ref={nameInputRef}
        />
        <EmailInput
          onChange={(evt: ChangeEvent<HTMLInputElement>) => setEmailValue(evt.target.value)}
          value={emailValue}
          name={'emailInput'}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={(evt: ChangeEvent<HTMLInputElement>) => setPasswordValue(evt.target.value)}
          value={passwordValue}
          name={'passwordInput'}
          icon={'EditIcon'}
        />
        {isButtonActive && <div className={styles.buttonsContainer}>
          <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>Отменить</Button>
          <Button htmlType="button" type="primary" size="medium" onClick={handleUpdateUser}>Сохранить</Button>
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
