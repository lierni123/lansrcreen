import { observable, action, runInAction } from 'mobx';
import metaCodeAPI from '../../apis/metaCode';
import moment from 'moment';
import request from '@utils/request';
class Store {
  @observable realtimeMonitorData = [];
  @observable realtimeMonitorColumns = [];
  @observable realtimeMonitorUrl = '';

  @observable realtimeUserInfoData = [];
  @observable realtimeUserInfoColumns = [];
  @observable realtimeUserInfoUrl = '';

  @observable devicesInfoData = {
    mobile: '',
    pc: '',
  };
  @observable devicesInfoColumns = [];
  @observable devicesInfoUrl = '';

  @observable varTrendData = [];
  @observable varTrendColumns = [];
  @observable varTrendUrl = '';

  @observable visitDistributionData = [];
  @observable visitDistributionColumns = [];
  @observable visitDistributionUrl = '';

  @observable rankData = {
    rank1: [],
    rank2: [],
    rank3: [],
  };
  @observable rankColumns = [];
  @observable rankUrl = '';

  @action async getMetaData(cb) {
    const realtimeMonitorData = await metaCodeAPI.getListMeta('realtimeMonitor');
    const realtimeUserInfoData = await metaCodeAPI.getListMeta('realtimeUserInfo');
    const devicesInfoData = await metaCodeAPI.getListMeta('devicesInfo');
    const varTrendData = await metaCodeAPI.getListMeta('varTrend');
    const visitDistributionData = await metaCodeAPI.getListMeta('visitDistribution');
    const rankData = await metaCodeAPI.getListMeta('rank');

    runInAction(() => {
      if (realtimeMonitorData) {
        this.realtimeMonitorColumns = realtimeMonitorData.columns;
        this.realtimeMonitorUrl = realtimeMonitorData.buttons[0].sourceCode;
      }

      if (realtimeUserInfoData) {
        this.realtimeUserInfoColumns = realtimeUserInfoData.columns;
        this.realtimeUserInfoUrl = realtimeUserInfoData.buttons[0].sourceCode;
      }
      if (devicesInfoData) {
        this.devicesInfoColumns = devicesInfoData.columns;
        this.devicesInfoUrl = devicesInfoData.buttons[0].sourceCode;
      }

      if (varTrendData) {
        this.varTrendColumns = varTrendData.columns;
        this.varTrendUrl = varTrendData.buttons[0].sourceCode;
      }

      if (visitDistributionData) {
        this.visitDistributionColumns = visitDistributionData.columns;
        this.visitDistributionUrl = visitDistributionData.buttons[0].sourceCode;
      }

      if (rankData) {
        this.rankColumns = rankData.columns;
        this.rankUrl = rankData.buttons[0].sourceCode;
      }
      cb();
    });
  }
  @action async getRealtimeMonitor() {
    const data = await request(
      this.realtimeMonitorUrl,
      {
        method: 'post',
        data: {
          data: {
            intervalMinutes: [30, 1440],
          },
          metaDataCode: 'realtimeMonitor',
        },
      },
      false
    );
    runInAction(() => {
      this.realtimeMonitorData = (data && data.data) || [];
    });
  }
  @action async getRealtimeUserInfo() {
    const data = await request(
      this.realtimeUserInfoUrl,
      {
        method: 'post',
        data: {
          data: {
            date: ['today'],
            period: 0,
          },
          sortName: 'serverTimePretty',
          sortType: 1,
          pageIndex: 1,
          pageSize: 60,
          metaDataCode: 'realtimeUserInfo',
        },
      },
      false
    );
    runInAction(() => {
      this.realtimeUserInfoData = (data && data.data) || [];
    });
  }
  @action async getDevicesInfo() {
    const data = await request(
      this.devicesInfoUrl,
      {
        method: 'post',
        data: {
          data: {
            date: [
              moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD'),
              moment().format('YYYY-MM-DD'),
            ],
            period: 4,
          },
          metaDataCode: 'devicesInfo',
        },
      },
      false
    );
    runInAction(() => {
      this.devicesInfoData = (data && data.data) || [];
    });
  }
  @action async getVarTrend() {
    const data = await request(
      this.varTrendUrl,
      {
        method: 'post',
        data: {
          data: '',
          metaDataCode: 'varTrend',
        },
      },
      false
    );
    runInAction(() => {
      this.varTrendData = (data && data.data) || [];
    });
  }
  @action async getVisitDistribution(pageIndex) {
    const data = await request(
      this.visitDistributionUrl,
      {
        method: 'post',
        data: {
          data: '',
          pageIndex: 1,
          pageSize: 33,
          metaDataCode: 'visitDistribution',
        },
      },
      false
    );
    runInAction(() => {
      this.visitDistributionData = (data && data.data) || [];
    });
  }
  @action async getRank() {
    const data1 = await request(
      this.rankUrl,
      {
        method: 'post',
        data: {
          data: {
            id: '',
            rankType: 1,
          },
          sortType: 1,
          pageIndex: 1,
          pageSize: 6,
          metaDataCode: 'rank',
        },
      },
      false
    );
    const data2 = await request(
      this.rankUrl,
      {
        method: 'post',
        data: {
          data: {
            id: '',
            rankType: 2,
          },
          sortType: 1,
          pageIndex: 1,
          pageSize: 6,
          metaDataCode: 'rank',
        },
      },
      false
    );
    const data3 = await request(
      this.rankUrl,
      {
        method: 'post',
        data: {
          data: {
            id: '',
            rankType: 3,
          },
          sortType: 1,
          pageIndex: 1,
          pageSize: 6,
          metaDataCode: 'rank',
        },
      },
      false
    );
    runInAction(() => {
      this.rankData = {
        rank1: (data1 && data1.data) || [],
        rank2: (data2 && data2.data) || [],
        rank3: (data3 && data3.data) || [],
      };
    });
  }
}
const store = new Store();
export default store;
