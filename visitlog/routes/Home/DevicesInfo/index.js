import React, { Component } from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import styles from './index.module.less';

const dic = {
  pc: '#FF9A50',
  mobile: '#16B5E8',
};

@observer
class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
    this.timer = -1;
  }
  render() {
    const { data } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>
          访问用户终端使用<span>(周)</span>
        </div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }
  componentWillReact() {
    this.setOption();
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
    this.myChart.dispose();
  }
  setOption = () => {
    const { columns, data } = this.props;
    if (data) {
      this.myChart.clear();
      const option = {
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
            radius: ['70%', '85%'],
            label: {
              formatter: ['{a|{b}}', '{b|{d}%}'].join(' '),
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: 'PingFangSC-Regular',
                },
                b: {
                  fontSize: 18,
                  fontFamily: 'DIN-Medium',
                  height: 25,
                },
              },
            },
            labelLine: {
              length: 5,
            },
            data: columns.slice().map(item => {
              return {
                value: data[item.name] && data[item.name].replace('%', ''),
                name: item.title,
                itemStyle: {
                  color: dic[item.name],
                },
              };
            }),
          },
        ],
      };
      this.myChart.setOption(option);
    }
  };
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
export default DevicesInfo;
