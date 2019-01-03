import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
const hideStyle = {
  normal: {
    color: '#062A52', //未完成的圆环的颜色
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
  },
  emphasis: {
    show: false,
  },
};
export default class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>各层次学生欠费率</div>
        <div ref={this.dom} className={styles.chart} />
        <ul className={styles.tag}>
          <li>
            <span />
            <p className={styles.percents}>75%</p>
            <p className={styles.name}>专升本</p>
          </li>
          <li>
            <span className={styles.yellow} />
            <p className={styles.percents}>41%</p>
            <p className={styles.name}>高起专</p>
          </li>
          <li>
            <span className={styles.pink} />
            <p className={styles.percents}>25%</p>
            <p className={styles.name}>高起本</p>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    const option = {
      series: [
        {
          name: 'Line 1',
          type: 'pie',
          silent: true,
          clockWise: true, //顺时针
          radius: [50, 60],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: true,
          data: [
            {
              value: 75,
              name: 'A',
              itemStyle: {
                color: '#16B5E8',
              },
            },
            {
              value: 25,
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
        },
        {
          name: 'Line 2',
          type: 'pie',
          clockWise: true, //顺时针
          radius: [65, 75],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: false,
          data: [
            {
              value: 65,
              name: 'B',
              itemStyle: {
                color: '#FF9A50',
              },
            },
            {
              value: 35,
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
        },
        {
          name: 'Line 3',
          type: 'pie',
          clockWise: true, //顺时针
          radius: [80, 90],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: false,
          data: [
            {
              value: 55,
              name: 'C',
              itemStyle: {
                color: '#FF7092',
              },
            },
            {
              value: 45,
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
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
