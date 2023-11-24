import React, {memo, useState, FC, ChangeEvent} from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { createUser } from '../../services/actions/userActions';
import { useDispatch } from "../../services/hooks/reduxHooks";

const Register: FC = (): React.ReactElement => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(createUser(nameValue, emailValue, passwordValue));
  };

  return (
    <FormContainer
      header="Регистрация"
      buttonText="Зарегистрироваться"
      bottomOptionOne={{
        text: 'Уже зарегистрированы?',
        navLink: '/login',
        linkText: 'Войти',
      }}
      onSubmit={onSubmit}
      errorTitle="При регистрации пользователя произошла ошибка"
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setNameValue(evt.target.value)}
        value={nameValue}
        name={'nameInput'}
      />
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

export default memo(Register);
