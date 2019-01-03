import React from 'react';
import styles from './index.module.less';
const Warp = props => {
  const { width = '100%', height, background, children } = props;
  return (
    <div className={styles.normal} style={{ height, width, backgroundColor: background }}>
      {children}
    </div>
  );
};
export default Warp;
