import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './appHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const location: string = useLocation().pathname;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navBlock}>
          <Link className={styles.link} to="/">
            <BurgerIcon type={location === '/' ? 'primary' : 'secondary'}/>
            <span className={
              `text text_type_main-default
              ${location !== '/' && 'text_color_inactive'}
              ${styles.linkText}`}
            >Конструктор</span>
          </Link>

          <Link className={styles.link} to="/feed">
            <ListIcon type={location === '/history' ? 'primary' : 'secondary'}/>
            <span className={
              `text text_type_main-default
              ${location !== '/history' && 'text_color_inactive'}
              ${styles.linkText}`}
            >Лента заказов</span>
          </Link>
        </nav>
        <Link to={'/'}>
          <Logo/>
        </Link>
        <nav className={`${styles.navBlock} ${styles.navBlock__auth}`}>
          <Link className={styles.link} to="/profile">
            <ProfileIcon type={~location.indexOf('/profile') ? 'primary' : 'secondary'}/>
            <span className={
              `text text_type_main-default
              ${!~location.indexOf('/profile') && 'text_color_inactive'}
              ${styles.linkText}`}
            >Личный кабинет</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default memo(AppHeader);
