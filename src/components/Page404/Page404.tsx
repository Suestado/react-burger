import { useNavigate } from 'react-router-dom';
import styles from './Page404.module.css';

function Page404() {
  const navigate = useNavigate();

  function backToPrevPage(): void {
    navigate(-1);
  }

  return <div className={styles.page404}>
    <h2 className={styles.page404__header}>404</h2>
    <p className={styles.page404__info}>Страница не найдена</p>
    <button
      className={styles.page404__backBtn}
      onClick={backToPrevPage}
    >Назад
    </button>
  </div>;
}

export default Page404;
