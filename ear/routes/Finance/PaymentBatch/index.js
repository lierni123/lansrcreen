import React, { Component } from 'react';
import styles from './index.module.less';
class PaymentBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {
          color: '#fff',
          num: '8569.80',
        },
        {
          color: '#16B5E8',
          num: '8000',
        },
        {
          color: '#FF9A50',
          num: '569.80',
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <h2 className={styles.payTime}>
          缴费批次：<span className={styles.time}>2019-03</span>
        </h2>
        <ul className={styles.head}>
          <li>应收(万元)</li>
          <li>实收(万元)</li>
          <li>欠费(万元)</li>
        </ul>
        <ul className={styles.data}>
          {this.state.datas.map((value, key) => {
            return (
              <li key={key} style={{ color: value.color }} className={styles.number}>
                {value.num}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PaymentBatch;
