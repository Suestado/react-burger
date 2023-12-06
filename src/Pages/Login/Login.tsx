import React, { memo, FC } from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions/userActions';
import { useDispatch } from "../../services/hooks/reduxHooks";
import { useForm } from "../../utils/hooks/useForm";

const Login: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm();

  const onSubmit = (): void => {
    dispatch(loginUser(values.emailInput, values.passwordInput));
  };

  return (
    <FormContainer
      header="Вход"
      buttonText="Войти"
      bottomOptionOne={{
        text: 'Вы - новый пользователь?',
        navLink: '/register',
        linkText: 'Зарегистрироваться',
      }}
      bottomOptionTwo={{
        text: 'Забыли пароль?',
        navLink: '/forgot-password',
        linkText: 'Восстановить пароль',
      }}
      onSubmit={onSubmit}
      errorTitle="При попытке входа в систему произошла ошибка"
    >
      <EmailInput
        onChange={handleChange}
        value={values.emailInput || ''}
        name={'emailInput'}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.passwordInput || ''}
        name={'passwordInput'}
      />
    </FormContainer>
  );
}

export default memo(Login);
