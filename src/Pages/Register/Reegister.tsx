import React, { memo, FC } from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { createUser } from '../../services/actions/userActions';
import { useDispatch } from "../../services/hooks/reduxHooks";
import { useForm } from "../../utils/hooks/useForm";

const Register: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm();

  const onSubmit = () => {
    dispatch(createUser(values.nameInput, values.emailInput, values.passwordInput));
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
        onChange={handleChange}
        value={values.nameInput || ''}
        name={'nameInput'}
      />
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

export default memo(Register);
