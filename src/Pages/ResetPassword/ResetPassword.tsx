import React, { memo, useEffect, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../../components/FormContainer/FormContainer';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../utils/MainApi';
import { useSelector } from "../../services/hooks/reduxHooks";
import { IUserState } from "../../services/reducers/userReducers";
import { useForm } from "../../utils/hooks/useForm";

const ResetPassword: FC = (): React.ReactElement => {
  const currentUser = useSelector((store) => store.currentUser) as IUserState;
  const navigate = useNavigate();
  const location = useLocation();
  const {values, handleChange} = useForm();

  const onSubmit = (): void => {
    resetPassword(values.passwordInput, values.nameInput)
      .then(() => {
        navigate('/login', {replace: true});
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
        onChange={handleChange}
        value={values.passwordInput || ''}
        name={'passwordInput'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={handleChange}
        value={values.nameInput || ''}
        name={'nameInput'}
      />
    </FormContainer>
  );
}

export default memo(ResetPassword);
