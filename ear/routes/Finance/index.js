import React, { Component } from 'react';
import Header from '../../Components/Header/header.js';
import Warp from '../../Components/Warp';
import ArrearsRanking from './ArrearsRanking';
import styles from './index.module.less';
import Payment from './Payment';
import PaymentBatch from './PaymentBatch';
import DevicesInfo from './DevicesInfo';
import PaymentScroll from './PaymentScroll';
import ArrearsPercent from './ArrearsPercent';

class Finance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '财务播报',
      data: [
        { value: 2, name: 'JavaScript' },
        { value: 1, name: 'Java' },
        { value: 1, name: 'HTML/CSS' },
      ],
    };
  }
  render() {
    return (
      <div className="bodyindex">
        <div className="main">
          <Header title={this.state.title} />

          <div className={styles.normal}>
            <div className={styles.main}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <Warp width="3.25rem" height="2.22rem" background="#07213a">
                    <Payment />
                  </Warp>
                  <Warp width="3.25rem" height="4.34rem" background="#07213a">
                    <ArrearsRanking n={9} />
                  </Warp>
                </div>
                <div className={styles.center}>
                  <Warp width="6.7rem" height="2.23rem" background="#07213a">
                    <PaymentBatch />
                  </Warp>
                  <Warp width="6.7rem" height="4.34rem" background="#07213a">
                    <PaymentScroll />
                  </Warp>
                </div>
                <div className={styles.right}>
                  <Warp width="3.25rem" height="3.45rem" background="#07213a">
                    <DevicesInfo />
                  </Warp>
                  <Warp width="3.25rem" height="3.11rem" background="#07213a">
                    <ArrearsPercent />
                  </Warp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Finance;
