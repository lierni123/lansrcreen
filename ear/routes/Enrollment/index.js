import React, { Component } from 'react';
import Header from '../../Components/Header/header.js';
import Warp from '../../Components/Warp';
import Map from '../../Components/Map';
import NumberRoll from '@Components/NumberRoll';
import styles from './index.module.less';
import DevicesInfo from '../../Components/Echarts/DevicesInfo';
import Enrollmentnumber from '../../Components/Echarts/Enrollmentnumber';
import Conversion from '../../Components/Conversion';
import RankingListOne from './RankingListOne';
import RankingListTwo from './RankingListTwo';
import MajorRanking from '../../Components/Echarts/MajorRanking';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '招生播报',
      data: '23445',
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
                  <Warp width="3.25rem" height="2.04rem" background="#07213a">
                    <Enrollmentnumber />
                  </Warp>
                  <Warp width="3.25rem" height="1.92rem" background="#07213a">
                    <Conversion />
                  </Warp>

                  <Warp width="3.25rem" height="2.4rem" background="#07213a">
                    <DevicesInfo />
                  </Warp>
                </div>
                <div className={styles.center}>
                  <Warp width="6.7rem" height="6.76rem" background="#07213a">
                    <div className={styles.time}>2019-03 招生批次</div>
                    <div style={{ width: '5.28rem' }} className={styles.changeData}>
                      <NumberRoll data={this.state.data} />
                      <span className={styles.unit}>人</span>
                    </div>
                    <div className={styles.mapCon}>
                      <Map />
                    </div>
                  </Warp>
                </div>
                <div className={styles.right}>
                  <Warp width="3.25rem" height="3.56rem" background="#07213a">
                    <div className={styles.normalTop}>
                      <div className={styles.title}>学习中心报名排行TOP10</div>
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <RankingListOne />
                          </div>
                          <div className="swiper-slide">
                            <RankingListTwo />
                          </div>
                        </div>
                        <div className="swiper-pagination" />
                      </div>
                    </div>
                  </Warp>
                  <Warp width="3.25rem" height="3rem" background="#07213a">
                    <MajorRanking />
                  </Warp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.mySwiper = new Swiper('.swiper-container', {
      autoplay: {
        disableOnInteraction: false,
      },
      loop: true,
      nested: true,
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      followFinger: false,
    });
    setInterval(() => {
      this.setState(
        {
          data: '0055555',
        },
        () => {
          setTimeout(() => {
            this.setState({
              data: '23445',
            });
          }, 3500);
        }
      );
    }, 8000);
  }
}

export default Students;
