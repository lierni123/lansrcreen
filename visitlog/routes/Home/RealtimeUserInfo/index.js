import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';

@observer
class RealtimeUserInfo extends Component {
  warp = React.createRef();
  ul = React.createRef();
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;
  render() {
    const data = this.props.data.slice();
    return (
      <div className={styles.normal}>
        <div className={styles.title}>实时访问用户信息</div>
        <div className={styles.items} ref={this.warp}>
          <ul ref={this.ul}>{data.map(this.itemRender)}</ul>
        </div>
      </div>
    );
  }
  itemRender = (item, index) => {
    const dics = this.props.dics;
    const columns = this.props.columns.slice();
    return (
      <li className={styles.item} key={index}>
        {columns.map((_item, index) => {
          if (_item.name === 'region') {
            return (
              <span key={index}>{dics['Region'] && dics['Region']['p' + item[_item.name]]}</span>
            );
          }
          if (_item.name === 'actions') {
            return <span key={index}>访问了{item[_item.name]}个页面</span>;
          }
          if (_item.name === 'userName') {
            return (
              <span key={index}>
                <a>{item[_item.name]}</a>
              </span>
            );
          }
          return <span key={index}>{item[_item.name]}</span>;
        })}
      </li>
    );
  };
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.scrollBar();
  }
  componentWillUnmount() {
    clearTimeout(this.t);
    clearTimeout(this.timer);
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      clearTimeout(this.t);
      this.n = 0;
      this.scrollBar();
    }, 300);
  };
  scrollBar = () => {
    if (this.t) clearTimeout(this.t);
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
}

export default RealtimeUserInfo;
