import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
export default class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>学生欠费情况</div>
        <div ref={this.dom} className={styles.chart} />
        <div className={styles.arrearage}>
          <span className={styles.arrearagePerson}>欠费人数:&nbsp;</span>
          <span className={styles.arrearageNum}>300人</span>
        </div>
        <div className={styles.arrearage}>
          <span className={styles.arrearagePerson}>欠费金额:&nbsp;</span>
          <span className={styles.arrearageNum}>569.80万元</span>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    const option = {
      title: {
        text: '在读学生总数',
        subtext: '1899人',
        x: 'center',
        y: 'center',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
        },
        subtextStyle: {
          color: '#fff',
          fontFamily: 'DIN-Medium',
          fontSize: 20,
        },
      },

      grid: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      series: [
        {
          type: 'pie',
          silent: true,
          radius: ['55%', '80%'],
          startAngle: 220,

          label: {
            formatter: ['{a|{b}}', '{b|{d}%}'].join('\n'),
            rich: {
              a: {
                color: '#fff',
                fontSize: 12,
                fontFamily: 'PingFangSC-Regular',
              },
              b: {
                color: '#fff',
                fontSize: 20,
                fontFamily: 'DIN-Medium',
              },
            },
          },

          data: [
            {
              value: 400,
              name: '缴费学生占比',
              itemStyle: {
                color: '#062A52',
              },
            },
            {
              value: 625,
              name: '欠费学生占比',
              itemStyle: {
                color: '#16B5E8',
              },
            },
          ],
          labelLine: {
            normal: {
              length: 6,
              length2: 6,
            },
            lineStyle: {
              color: '#fff',
            },
          },
        },
      ],
    };
    this.myChart.setOption(option);
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
    this.myChart.dispose();
  }
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
