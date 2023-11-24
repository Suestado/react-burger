import React, {memo, useState, useEffect, FC, ChangeEvent} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import FormContainer from '../../components/FormContainer/FormContainer';
import {PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {resetPassword} from '../../utils/MainApi';
import { useSelector } from "../../services/hooks/reduxHooks";
import { IUserState } from "../../services/reducers/userReducers";

const ResetPassword: FC = (): React.ReactElement => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [smsValue, setSmsValue] = useState<string>('');
  const currentUser = useSelector((store) => store.currentUser) as IUserState;
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (): void => {
    resetPassword(passwordValue, smsValue)
      .then((res) => {
        if (res.success) {
          navigate('/login', {replace: true});
        }
      })
      .catch((err) => {
        console.log(`При попытке смены пароля произошла ошибка - ${err}`);
      });
  };

  useEffect((): void => {
    if (!location.state?.forgotPassword) {
      navigate('/forgot-password');
    }
  }, [currentUser]);

  return (
    <FormContainer
      header="Восстановление пароля"
      buttonText="Сохранить"
      bottomOptionOne={{
        text: 'Вспомнили пароль?',
        navLink: '/login',
        linkText: 'Войти',
      }}
      onSubmit={onSubmit}
      errorTitle="При попытке восстановления пароля произошла ошибка"
    >
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setSmsValue(evt.target.value)}
        value={smsValue}
        name={'nameInput'}
      />
    </FormContainer>
  );
}

export default memo(ResetPassword);
