/**
 * App entrance
 */


'use strict';

import './common/styles/app.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Badge, Button, Icon, ImageBox, ImageSlider, Tab, Table, TopAction } from './components/index';


injectTapEventPlugin();

const imageSliderData = [
  'src/images/400_600.jpeg',
  'src/images/400_300.jpeg',
  'src/images/400_400.jpeg'
];

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
    link: '//m.taobao.com'
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
    text: '头像',
    href: 'avatar',
    children: <img style={{ width: 56, height: 56 }} src='src/images/100_100.jpeg' alt='' />
  },
  {
    text: '昵称',
    href: 'nickname',
    children: '我是小明'
  },
  {
    text: '收货地址',
    href: 'address',
    children: <span className='text-lightest'>填写送积分</span>,
    disclosure: true
  }
];

class TestPage extends Component {

  render() {
    return (
      <div>
        <h2 className='gap-side gap-t'>Button</h2>
        <div className='gap-side'>
          <Button disabled onTouchTap={this.handleEvents}>积分不足</Button>
          <Button type='button' onTouchTap={this.handleEvents} className='gap-t'>立即兑换</Button>
          <Button type='button' icon='money' className='gap-t'>签到</Button>
        </div>

        <h2 className='gap-side gap-t'>Tab.Nav</h2>
        <Tab.Nav data={tabNavData}></Tab.Nav>

        <h2 className='gap-side gap-t'>Tab.Bar (见最下)</h2>
        <Tab.Bar data={tabBarData}></Tab.Bar>

        <h2 className='gap-side gap-t'>Table</h2>
        <Table data={tableData}></Table>

        <h2 className='gap-side gap-t'>ImageBox</h2>
        <div className='gap-side'>
          <div style={{ display: 'inline-block' }}>
            <ImageBox src='src/images/300_200.jpeg'></ImageBox>
          </div>
          <div style={{ display: 'inline-block' }} className='gap-l'>
            <ImageBox src='src/images/200_300.jpeg'></ImageBox>
          </div>
        </div>

        <h2 className='gap-side gap-5'>ImageSlider</h2>
        <ImageSlider data={imageSliderData}></ImageSlider>

        <h2 className='gap-side gap-t'>TopAction (滚动屏幕后见右下角)</h2>
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