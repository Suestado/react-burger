import React, { memo, useState, FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions/userActions';

const Login: FC = (): React.ReactElement => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const dispatch = useDispatch();

  const onSubmit = (): void => {
    //@ts-ignore
    dispatch(loginUser(emailValue, passwordValue));
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
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
    </FormContainer>
  );
}

export default memo(Login);
