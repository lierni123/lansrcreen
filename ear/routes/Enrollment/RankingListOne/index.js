import React, { Component } from 'react';
import styles from './index.module.less';
import personBg from '../../../images/person.png';
function Circle({ n }) {
  return <span className={styles.circle + ' ' + styles['circle' + n]}>{n}</span>;
}
class PeopleIcon extends Component {
  render() {
    const n = this.props.n;
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(1);
    }

    //console.log(arr);
    return (
      <div className={styles.personContainer}>
        {arr.map((value, key) => {
          return (
            <span
              key={key}
              className={styles.personBg}
              style={{ backgroundImage: 'url(' + personBg + ')' }}
            />
          );
        })}
      </div>
    );
  }
}
class RankingListOne extends Component {
  render() {
    return (
      <ul className={styles.ranking}>
        <li>
          <div className={styles.left}>
            <Circle n={1} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>奥鹏直属南京中山路学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={10} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={2} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>弘成直属南京·浦口学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={9} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={3} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>苏州学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={8} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={4} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>无锡·江阴学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={7} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={5} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>徐州学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={6} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
export default RankingListOne;
