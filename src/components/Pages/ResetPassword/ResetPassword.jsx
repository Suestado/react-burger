import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../../FormContainer/FormContainer';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import MainApi from '../../../utils/MainApi';

function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [smsValue, setSmsValue] = useState('');
  const currentUser = useSelector((store) => store.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = () => {
    MainApi.resetPassword(passwordValue, smsValue)
      .then((res) => {
        if (res.success) {
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`При попытке смены пароля произошла ошибка - ${err}`);
      });
  };

  useEffect(() => {
    if (currentUser.email || !location.state?.forgotPassword) {
      navigate('login');
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
    >
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={evt => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={evt => setSmsValue(evt.target.value)}
        value={smsValue}
        name={'nameInput'}
      />
    </FormContainer>
  );
}

export default memo(ResetPassword);
