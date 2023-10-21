import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './appHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const location = useLocation().pathname;

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

          <a className={styles.link} href="#">
            <ListIcon type={location === '/history' ? 'primary' : 'secondary'}/>
            <span className={
              `text text_type_main-default
              ${location !== '/history' && 'text_color_inactive'}
              ${styles.linkText}`}
            >Лента заказов</span>
          </a>
        </nav>
        <Logo/>
        <nav className={`${styles.navBlock} ${styles.navBlock__auth}`}>
          <Link className={styles.link} to="/profile">
            <ProfileIcon type={location === '/profile' ? 'primary' : 'secondary'}/>
            <span className={
              `text text_type_main-default
              ${location !== '/profile' && 'text_color_inactive'}
              ${styles.linkText}`}
            >Личный кабинет</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default memo(AppHeader);
