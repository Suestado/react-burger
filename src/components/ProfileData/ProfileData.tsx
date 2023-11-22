import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProfileData.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../../utils/MainApi";
import { refreshUser } from "../../services/actions/userActions";

const ProfileData: FC = (): React.ReactElement => {
  const currentUser = useSelector((store: any) => store.currentUser);
  const [nameValue, setNameValue] = useState<string>(currentUser.name);
  const [emailValue, setEmailValue] = useState<string>(currentUser.email);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameValue !== currentUser.name || emailValue !== currentUser.email || passwordValue) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  useEffect(() => {
    if(nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isDisabled]);

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
)
}

export default ProfileData;
