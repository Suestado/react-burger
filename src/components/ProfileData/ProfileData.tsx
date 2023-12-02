import React, { FC, useEffect, useRef, useState } from 'react';
import styles from "./ProfileData.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../../utils/MainApi";
import { refreshUser } from "../../services/actions/userActions";
import { useDispatch, useSelector } from "../../services/hooks/reduxHooks";
import { IUserState } from "../../services/reducers/userReducers";
import { useForm } from "../../utils/hooks/useForm";

const ProfileData: FC = (): React.ReactElement => {
  const currentUser = useSelector((store) => store.currentUser) as IUserState;
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const {values, handleChange, setValues} = useForm({
    nameInput: currentUser.name,
    emailInput: currentUser.email,
    passwordInput: ''
  });

  useEffect(() => {
    if (values.nameInput !== currentUser.name || values.emailInput !== currentUser.email || values.passwordInput) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [values.nameInput, values.emailInput, values.passwordInput]);

  useEffect(() => {
    if (nameInputRef.current) {
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
    updateUser(values.nameInput, values.emailInput, values.passwordInput, localStorage.getItem('accessToken'))
      .then((res) => {
        dispatch(refreshUser(res.user.name, res.user.email));
        setIsButtonActive(false);
      })
      .catch((err) => {
        console.log(`При обновлении данных пользователя произошла ошибка - ${err}`);
      });
  };

  const resetForm = (): void => {
    setValues({
      nameInput: currentUser.name,
      emailInput: currentUser.email,
      passwordInput: ''
    })
  };

  return (
    <form className={styles.form}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.nameInput || ''}
        name={'nameInput'}
        icon={'EditIcon'}
        disabled={isDisabled}
        onIconClick={onActivateInput}
        onBlur={onDisableInput}
        ref={nameInputRef}
      />
      <EmailInput
        onChange={handleChange}
        value={values.emailInput || ''}
        name={'emailInput'}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChange}
        value={values.passwordInput || ''}
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
