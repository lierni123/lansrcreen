import React, { Component } from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import styles from './index.module.less';
import 'echarts/map/js/china';
const filters = [
  (item, index) => index < 10,
  (item, index) => index >= 10 && index < 20,
  (item, index) => index >= 20,
];
@observer
class Map extends Component {
  dom = React.createRef();
  timer = -1;
  t = -1;
  filterIndex = 0;
  render() {
    const { data } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>
          全国访客分布<span>(周)</span>
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
    clearTimeout(this.t);
    this.myChart.dispose();
  }
  convertData = () => {
    const dics = this.props.dics;
    const data = this.props.data.slice();
    return data
      .filter(item => item.coordinateId)
      .map(item => {
        return {
          name: dics['Region'] && dics['Region']['p' + item.regionId],
          v: item.nb_visits,
          value:
            dics['RegionCoordinates'] &&
            JSON.parse(dics['RegionCoordinates']['p' + item.coordinateId]),
        };
      });
  };
  setOption = () => {
    if (this.t) clearTimeout(this.t);
    const _convertData = this.convertData();
    if (_convertData.length > 0) {
      const option = {
        visualMap: {
          show: false,
          min: Math.min.apply(
            Math,
            _convertData.filter(filters[this.filterIndex]).map(item => {
              return item.v;
            })
          ),
          max: Math.max.apply(
            Math,
            _convertData.filter(filters[this.filterIndex]).map(item => {
              return item.v;
            })
          ),
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          hoverLink: false,
          seriesIndex: [0],
          dimension: 0,
          inRange: {
            color: ['#0666a7', '#004880', '#003059'],
          },
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false,
            },
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              areaColor: '#0666A7',
              borderColor: '#111',
            },
            emphasis: {
              areaColor: '#0666A7',
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            showLegendSymbol: false,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: _convertData.filter(filters[this.filterIndex]).map(item => {
              return {
                name: item.name,
                value: item.v,
              };
            }),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: _convertData.filter(filters[this.filterIndex]),
            symbolSize: 8,
            rippleEffect: {
              scale: 4,
              brushType: 'stroke',
            },
            label: {
              show: true,
              position: [20, -5],
              color: '#fff',
              fontSize: 16,
              formatter: obj => {
                const { name, v } = obj.data;
                return `{a|${name}} {b|${v}}`;
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: 'PingFangSC-Regular',
                },
                b: {
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 500,
                  fontFamily: 'DIN-Medium',
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#fff',
                shadowBlur: 10,
                shadowColor: '#fff',
                opacity: 0.7,
              },
            },
          },
        ],
      };
      this.myChart.setOption(option, true);
    }
    this.t = setTimeout(() => {
      this.filterIndex++;
      if (this.filterIndex > 2) {
        this.filterIndex = 0;
      }
      this.setOption();
    }, 10 * 1000);
  };

  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
export default Map;
