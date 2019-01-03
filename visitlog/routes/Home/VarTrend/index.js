import React, { Component } from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import styles from './index.module.less';

@observer
class VarTrend extends Component {
  dom = React.createRef();
  timer = -1;
  render() {
    const { columns } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>
          访问量变化趋势
          <div className={styles.legend}>
            {columns
              .slice()
              .sort((a, b) => b.order - a.order)
              .map((item, index) => {
                return (
                  <span key={index} className={styles.fwl}>
                    {item.title}
                  </span>
                );
              })}
          </div>
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
    const data = this.props.data.slice();
    const columns = this.props.columns.slice();
    if (data.length > 0) {
      this.myChart.clear();
      const option = {
        grid: {
          top: 10,
          bottom: 25,
          left: '15%',
          right: 10,
        },
        xAxis: {
          silent: true,
          type: 'category',
          data: data.map(item => {
            const arr = item.date.match(/(.*)-(.*)-(.*)/);
            return arr[2] + '.' + arr[3];
          }),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: (index, value) => {
              if (index % 10 === 0) {
                return true;
              }
              if (index === data.length - 1) {
                return true;
              }
              return false;
            },
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'PingFangSC-Regular',
          },
        },
        yAxis: {
          silent: true,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'PingFangSC-Regular',
            formatter: (value, index) => {
              return value;
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.5)',
            },
          },
        },
        series: columns.map(item => {
          return {
            data: data.map(_item => {
              return _item[item.name];
            }),
            silent: true,
            type: 'line',
            smooth: true,
            smoothMonotone: 'none',
            lineStyle: {
              width: 3,
              color: item.name === 'uniqueVisitors' ? '#16BCEE' : '#FE9345',
            },
            itemStyle: {
              opacity: 0,
            },
          };
        }),
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
export default VarTrend;
