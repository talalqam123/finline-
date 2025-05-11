import React from 'react';
import styles from './Loader.module.css';
import { useTheme } from '../src/context/ThemeContext';

const Loader = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${styles.loaderContainer} ${darkMode ? 'dark' : ''}`}>
      <div className={styles.wrapper}>
        <div className={`${styles.boxWrap} ${darkMode ? styles.darkMode : ''}`}>
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
