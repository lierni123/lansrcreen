import React, { Component } from 'react';
import styles from './index.module.less';
import Progress from './Progress';
class ArrearsRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [
        {
          name: '马鞍山学习中心',
          percent: '55%',
          tag: '1',
        },
        {
          name: '嘉兴学习中心',
          percent: '45%',
          tag: '2',
        },
        {
          name: '金华学习中心',
          percent: '65%',
          tag: '3',
        },
        {
          name: '上海学习中心',
          percent: '50%',
          tag: '4',
        },
        {
          name: '马鞍山学习中心',
          percent: '30%',
          tag: '5',
        },
        {
          name: '嘉兴学习中心',
          percent: '85%',
          tag: '6',
        },
        {
          name: '金华学习中心',
          percent: '15%',
          tag: '7',
        },
        {
          name: '上海学习中心',
          percent: '73%',
          tag: '8',
        },
      ],
    };
  }
  render() {
    const n = this.props.n;
    const arr = [];
    for (let i = 1; i < n; i++) {
      arr.push(i);
    }

    return (
      <div>
        <h2 className={styles.tilte}>学习中心欠费率排名TOP8</h2>
        {this.state.progress.map((value, key) => {
          return (
            <div key={key}>
              <div className={styles.processBar}>
                <span className={styles.circle + ' ' + styles['circle' + value.tag]}>
                  {value.tag}
                </span>
                <div>
                  <span>{value.name}</span>
                  <span className={styles.fr}>{value.percent}</span>
                </div>
                <div className={styles.bar}>
                  <Progress percent={value.percent} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArrearsRanking;
