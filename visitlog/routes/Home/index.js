import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
import Warp from '../../Components/Warp';
import RealtimeMonitor from './RealtimeMonitor';
import RealtimeUserInfo from './RealtimeUserInfo';
import VarTrend from './VarTrend';
import DevicesInfo from './DevicesInfo';
import Map from './Map';
import Footer from './Footer';
import store from './store';
import frameRootStore from '@frameRootStore';
@observer
class Home extends Component {
  dom = React.createRef();
  t = -1;
  render() {
    const {
      realtimeMonitorData,
      realtimeUserInfoData,
      devicesInfoData,
      varTrendData,
      visitDistributionData,
      rankData,
      realtimeUserInfoColumns,
      devicesInfoColumns,
      varTrendColumns,
    } = store;
    const { dics } = frameRootStore;
    return (
      <div className={styles.normal}>
        <div className={styles.main}>
          <div className={styles.top}>
            <div className={styles.left}>
              <Warp width="3.25rem" height="2rem" background="#07213a">
                <RealtimeMonitor data={realtimeMonitorData} />
              </Warp>
              <Warp width="3.25rem" height="2.66rem" background="#07213a">
                <RealtimeUserInfo
                  data={realtimeUserInfoData}
                  columns={realtimeUserInfoColumns}
                  dics={dics}
                />
              </Warp>
            </div>
            <div className={styles.center}>
              <Warp width="6.7rem" height="4.86rem" background="#07213a">
                <Map data={visitDistributionData} dics={dics} />
              </Warp>
            </div>
            <div className={styles.right}>
              <Warp width="3.25rem" height="2.58rem" background="#07213a">
                <VarTrend data={varTrendData} columns={varTrendColumns} />
              </Warp>
              <Warp width="3.25rem" height="2.08rem" background="#07213a">
                <DevicesInfo data={devicesInfoData} columns={devicesInfoColumns} />
              </Warp>
            </div>
          </div>
          <div className={styles.footer}>
            <Warp height="1.70rem" background="#07213a">
              <Footer data={rankData} />
            </Warp>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    store.getMetaData(() => {
      this.getData();
    });
  }

  getData = () => {
    if (this.t) clearTimeout(this.t);
    store.getRealtimeMonitor();
    store.getRealtimeUserInfo();
    store.getVarTrend();
    store.getRank();
    store.getDevicesInfo();
    store.getVisitDistribution();
    this.t = setTimeout(() => {
      this.getData();
    }, 60 * 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.t);
  }
}

export default Home;
