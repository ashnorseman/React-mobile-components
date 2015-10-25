/**
 * App entrance
 */


'use strict';

import './common/styles/app.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Badge from './components/Badge/Badge.jsx';
import Icon from './components/Icon/Icon.jsx';
import TabBar from './components/Tab/TabBar.jsx';
import TabNav from './components/Tab/TabNav.jsx';
import Table from './components/Table/Table.jsx';
import TopAction from './components/TopAction/TopAction.jsx';


injectTapEventPlugin();

const tabBarData = [
  {
    icon: 'home',
    text: '积分互动',
    link: 'home'
  },
  {
    badge: '9',
    icon: 'gift-box',
    text: '礼品箱',
    link: 'gift-box'
  },
  {
    icon: 'user',
    text: '个人中心',
    link: 'user'
  },
  {
    icon: 'shop',
    text: '店铺首页',
    link: 'shop'
  }
];

const tabNavData = [
  {
    icon: 'physical',
    text: '实物礼品',
    link: 'physical',
    type: 1
  },
  {
    icon: 'virtual',
    text: '虚拟礼品',
    link: 'virtual',
    type: 2
  },
  {
    icon: 'discount',
    text: '淘宝优惠',
    link: 'discount',
    type: 3
  },
  {
    icon: 'game',
    text: '游戏专区',
    link: 'game',
    type: 4
  }
];

const tableData = [
  {
    text: '个人信息',
    href: 'profile',
    disclosure: true
  },
  {
    text: '收货地址',
    href: 'address',
    disclosure: true
  }
];

class TestPage extends Component {

  render() {
    return (
      <div style={{height: 1000}}>
        <TabNav data={tabNavData}></TabNav>

        <Table data={tableData}></Table>

        <TabBar data={tabBarData}></TabBar>

        <TopAction></TopAction>
      </div>
    );
  }

  handleEvents(e) {
    console.log(e);
  }
}

ReactDOM.render((
  <TestPage></TestPage>
), document.getElementById('app'));