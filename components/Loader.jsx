import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.wrapper}>
        <div className={styles.boxWrap}>
          <div className={`${styles.box} ${styles.one}`}></div>
          <div className={`${styles.box} ${styles.two}`}></div>
          <div className={`${styles.box} ${styles.three}`}></div>
          <div className={`${styles.box} ${styles.four}`}></div>
          <div className={`${styles.box} ${styles.five}`}></div>
          <div className={`${styles.box} ${styles.six}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
