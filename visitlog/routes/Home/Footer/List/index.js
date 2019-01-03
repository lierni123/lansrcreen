import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
function Circle({ n }) {
  return <span className={styles.circle + ' ' + styles['circle' + n]}>{n}</span>;
}
const List = observer(props => {
  const data = props.data.slice();
  return (
    <div className={styles.normal}>
      <ul>
        {data
          .filter(item => item.ranking <= 3)
          .map((item, index) => {
            return (
              <li key={index}>
                <Circle n={item.ranking} />
                <span className={styles.name}>{item.name}</span>
                <span className={styles.value}>{item.count}</span>
              </li>
            );
          })}
      </ul>
      <ul className={styles.ul2}>
        {data
          .filter(item => item.ranking >= 4)
          .map((item, index) => {
            return (
              <li key={index}>
                <Circle n={item.ranking} />
                <span className={styles.name}>{item.name}</span>
                <span className={styles.value}>{item.count}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
});
export default List;
