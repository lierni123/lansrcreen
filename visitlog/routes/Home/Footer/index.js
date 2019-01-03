import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
import List from './List';

const Footer = observer(({ data }) => {
  const { rank1, rank2, rank3 } = data;
  return (
    <div className={styles.normal}>
      <div className={styles.admin}>
        <div className={styles.title}>活跃管理员排行</div>
        <List data={rank3} />
      </div>
      <div className={styles.line} />
      <div className={styles.teacher}>
        <div className={styles.title}>活跃教师排行</div>
        <List data={rank2} />
      </div>
      <div className={styles.line} />
      <div className={styles.student}>
        <div className={styles.title}>
          活跃学生排行
          <div className={styles.subTitle}>按每周访问次数排序</div>
        </div>
        <List data={rank1} />
      </div>
    </div>
  );
});
export default Footer;
