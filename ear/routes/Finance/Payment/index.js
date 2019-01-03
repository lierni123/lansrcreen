import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
const rate = 0.953; //0.4+0.2*Math.random();
const linear_color = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: 'rgba(22, 181, 232, 1)',
    },
    {
      offset: 1,
      color: 'rgba(22, 181, 232, 1)',
    },
  ],
};
class Payment extends Component {
  pieChart = React.createRef();
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>总体缴费</div>
        <div ref={this.pieChart} className={styles.chart} />
      </div>
    );
  }
  initPieChart = () => {
    const { data } = this.props;
    let myChart = echarts.init(this.pieChart.current);
    let options = this.setOption(data);
    myChart.setOption(options);
  };

  setOption = data => {
    return {
      title: {
        text: '实收 \n 8000.08万元',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 15,
          fontFamily: 'PingFangSC-Regular',
          fontWeight: '400',
        },
        left: 'center',
        bottom: '2%',
      },
      series: [
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['93%', '93%'],
          startAngle: 225,
          labelLine: {
            show: false,
          },

          data: [
            {
              value: rate * 270,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: (rate * 100).toFixed(2) + '%',
                  textStyle: {
                    color: 'rgba(22, 181, 232, 1)',
                    fontSize: 30,
                    fontFamily: 'DIN-Medium',
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: linear_color,
                  borderWidth: 10,
                },
              },
            },
            {
              value: 270 - rate * 270,
              itemStyle: {
                normal: {
                  borderColor: 'rgba(6, 42, 82, 1)',
                  borderWidth: 10,
                },
              },
            },
            {
              value: 90,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                },
              },
            },
          ],
        },
      ],
    };
  };
  componentDidMount() {
    this.myChart = echarts.init(this.pieChart.current);
    this.initPieChart();
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
export default Payment;
