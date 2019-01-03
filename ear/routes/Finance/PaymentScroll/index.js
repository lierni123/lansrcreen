import React, { Component } from 'react';
import styles from './index.module.less';
class PaymentScroll extends Component {
  warp = React.createRef();
  ul = React.createRef();
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;
  constructor(props) {
    super(props);
    this.state = {
      paymentList: [
        {
          time: '2019-03',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-04',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-05',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-06',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-07',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-08',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-09',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
        {
          time: '2019-10',
          receivable: '206883.00',
          realReceive: '158883.00',
          arrearsPercent: '36%',
        },
      ],
    };
  }

  scrollBar = () => {
    const warp = this.warp.current;
    const ul = this.ul.current;
    const lis = ul.children;
    let liHeight = 0;
    if (lis.length > 0) {
      liHeight = lis[0].clientHeight;
      if (this.n >= 0) {
        this.n = -(ul.clientHeight - warp.clientHeight);
      } else {
        this.n += liHeight;
      }
      ul.style.transform = `translateY(${this.n}px)`;
    }
    this.t = setTimeout(() => {
      this.scrollBar();
    }, 3000);
  };
  componentDidMount() {
    this.scrollBar(); //开启数据播报
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
  render() {
    return (
      <div>
        <h2 className={styles.title}>各招生批次缴费情况</h2>
        <div className={styles.content}>
          <ul className={styles.itemName}>
            <li>入学批次</li>
            <li>应收(元)</li>
            <li>实收(元)</li>
            <li>欠费率</li>
          </ul>
          <div className={styles.ulCon} ref={this.warp}>
            <ul className={styles.list} ref={this.ul}>
              {this.state.paymentList.map((value, key) => {
                return (
                  <li key={key}>
                    <span>{value.time}</span>
                    <span>{value.receivable}</span>
                    <span>{value.realReceive}</span>
                    <span>{value.arrearsPercent}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentScroll;
