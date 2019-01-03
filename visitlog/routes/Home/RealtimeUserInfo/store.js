import { observable, action } from 'mobx'

class Store {
  @observable list = [
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
    { time: '10:50:12', name: '34', city: '北京', info: '5' },
  ]
}
const store = new Store()
export default store
