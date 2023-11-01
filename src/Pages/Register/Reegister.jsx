import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { createUser } from '../../services/actions/userActions';

function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
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
        onChange={evt => setNameValue(evt.target.value)}
        value={nameValue}
        name={'nameInput'}
      />
      <EmailInput
        onChange={evt => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={evt => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
    </FormContainer>
  );
}

export default memo(Register);
