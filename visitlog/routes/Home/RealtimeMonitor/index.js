import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';

const RealtimeMonitor = observer(props => {
  const data = props.data.slice();
  const arr = data.sort((a, b) => a.intervalMinutes - b.intervalMinutes > 0);
  const visits = arr.map(item => item.visits);
  const actions = arr.map(item => item.actions);
  return (
    <div className={styles.normal}>
      <div className={styles.title}>实时访问监控</div>
      <div className={styles.header}>
        <span className={styles.name}>&nbsp;</span>
        <span className={styles.value}>30Min</span>
        <span className={styles.value}>24H</span>
      </div>
      <div className={styles.item1}>
        <span className={styles.name}>访客数量</span>
        {visits.length > 0
          ? visits.map((item, index) => {
              return (
                <span key={index} className={styles.value}>
                  {item}
                </span>
              );
            })
          : [
              <span key={0} className={styles.value}>
                -
              </span>,
              <span key={1} className={styles.value}>
                -
              </span>,
            ]}
      </div>
      <div className={styles.item2}>
        <span className={styles.name}>浏览数量</span>
        {actions.length > 0
          ? actions.map((item, index) => {
              return (
                <span key={index} className={styles.value}>
                  {item}
                </span>
              );
            })
          : [
              <span key={0} className={styles.value}>
                -
              </span>,
              <span key={1} className={styles.value}>
                -
              </span>,
            ]}
      </div>
    </div>
  );
});
export default RealtimeMonitor;
//  <div className={styles.header}>
//   {columns.map((item, index) => {
//     return <span key={index} className={styles.name}>{item.title}</span>
//   })}
// </div>
// <div className={styles.items}>
//   {data.map((item, index) => {
//     return (
//       <div key={index} className={styles.item}>
//         {columns.map((_item, index) => {
//           return <span key={index}>{item[_item.name]}</span>
//         })}
//       </div>
//     )
//   })}
// </div>
