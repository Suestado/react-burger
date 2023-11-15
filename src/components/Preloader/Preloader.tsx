import React, {FC} from 'react';
import ReactDom from 'react-dom';
import styles from './preloader.module.css';

const Preloader: FC = (): React.ReactElement => {
  const modalPortal = document.querySelector('#modalPortal') as HTMLElement;

  return ReactDom.createPortal(
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span className={styles.preloader__round}/>
      </div>
    </div>
    , modalPortal,
  );
}

export default Preloader;
