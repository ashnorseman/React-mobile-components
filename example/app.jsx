/**
 * App entrance
 */


'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Badge, Button, CheckButton, Form, FormControl, Icon, ImageBox, ImageSlider, PullLoader, Tab, Table, TopAction } from '../src/components/index.js';

injectTapEventPlugin();

const formSelectOptions = [
  {
    value: '',
    text: ''
  },
  {
    value: '1',
    text: '上海'
  },
  {
    value: '2',
    text: '北京'
  }
];

const formData = {
  action: '/form',
  controls: [
    {
      name: 'name',
      type: 'text',
      label: '收货人姓名很多字',
      placeholder: '必填',
      required: true
    },
    {
      name: 'address',
      type: 'text',
      label: '详细地址',
      placeholder: '必填，最多 100 字',
      required: true,
      maxLength: 100
    }
  ],
  submitText: '提交'
};

const formData2 = {
  action: '/form',
  controls: [
    {
      name: 'mobile',
      type: 'tel',
      placeholder: '手机',
      required: true
    },
    {
      name: 'code',
      type: 'tel',
      placeholder: '验证码',
      required: true,
      maxLength: 4,
      minLength: 4
    }
  ],
  submitText: '提交',
  beforeSubmit(formData) {
    // console.log(formData);
  },
  onSubmit(formData, form) {
    console.log(formData, form);
  }
};

const imageSliderData = [
  'example/images/400_600.jpeg',
  'example/images/400_300.jpeg',
  'example/images/400_400.jpeg'
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
    note: '2015-10-10',
    href: 'profile',
    disclosure: true
  },
  {
    text: '头像',
    href: 'avatar',
    children: <img style={{ width: 56, height: 56 }} src='example/images/100_100.jpeg' alt='' />
  },
  {
    text: '昵称',
    note: '2015-10-10',
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

  constructor(props) {
    super(props);
    this.pulledToBottom = this.pulledToBottom.bind(this);

    this.state = {
      bottom: false
    };
  }

  render() {
    const { bottom } = this.state;

    return (
      <div>
        <h2 className='gap-side gap-t'>Icon</h2>
        <div className='gap-side'>
          <Icon name='loading'></Icon>
          <Icon name='rotate' className='gap-l'></Icon>
        </div>

        <h2 className='gap-side gap-t'>按钮</h2>
        <div className='gap-side'>
          <Button disabled onTouchTap={this.handleEvents}>积分不足</Button>
          <Button type='button' onTouchTap={this.handleEvents} className='gap-t'>立即兑换</Button>
          <Button type='button' icon='rotate' className='gap-t' disabled>提交中…</Button>
        </div>

        <h2 className='gap-side gap-t'>小按钮</h2>
        <div className='gap-side'>
          <Button disabled icon='delete' link>删除</Button>
          <Button icon='edit' link>编辑</Button>
        </div>

        <h2 className='gap-side gap-t'>选择按钮</h2>
        <div className='gap-side'>
          <CheckButton onToggle={this.handleEvents}>设为默认</CheckButton>
          <CheckButton checked>设为默认</CheckButton>
        </div>

        <h2 className='gap-side gap-t'>表单元素</h2>
        <div className='gap-side'>
          <FormControl name='text' type='text' placeholder='文本（必填）' defaultValue='示例文字' onChange={this.handleEvents} required />
          <FormControl name='number' type='tel' placeholder='数字（5-10）' max='10' min='5' />
          <FormControl name='email' type='email' placeholder='电子邮件' />
          <FormControl name='tel' type='tel' placeholder='联系方式' />
          <FormControl name='date' type='date' placeholder='日期（必填）' required />
          <FormControl name='time' type='time' placeholder='时间（必填）' required />
          <FormControl name='select' type='select' placeholder='请选择（必选）' options={formSelectOptions} required />
          <FormControl name='textarea' type='textarea' placeholder='多行文本（5–10 字）' maxLength='10' minLength='5' />
        </div>

        <h2 className='gap-side gap-t'>表单</h2>
        <Form {...formData2} className='gap-t'></Form>

        <h2 className='gap-side gap-t'>表单（带说明）</h2>
        <Form {...formData}></Form>

        <h2 className='gap-side gap-t'>Tab.Nav</h2>
        <Tab.Nav data={tabNavData}></Tab.Nav>

        <h2 className='gap-side gap-t'>Tab.Bar (见最下)</h2>
        <Tab.Bar data={tabBarData}></Tab.Bar>

        <h2 className='gap-side gap-t'>Table</h2>
        <Table data={tableData} expanded={true}>
          <span>本月</span>
          <span className='gap-l'>赚取积分</span>
          <span className='text-primary'>600</span>
          <span className='gap-l'>兑换积分</span>
          <span className='text-primary'>600</span>
        </Table>

        <h2 className='gap-side gap-t'>ImageBox</h2>
        <div className='gap-side'>
          <div style={{ display: 'inline-block' }}>
            <ImageBox src='example/images/200_150.jpeg'></ImageBox>
          </div>
          <div style={{ display: 'inline-block' }} className='gap-l'>
            <ImageBox src='example/images/150_200.jpeg'></ImageBox>
          </div>
        </div>

        <h2 className='gap-side gap-t'>ImageSlider</h2>
        <ImageSlider data={imageSliderData}></ImageSlider>

        <h2 className='gap-side gap-t'>TopAction (滚动屏幕后见右下角)</h2>
        <TopAction></TopAction>

        <h2 className='gap-side gap-t'>PullLoader ({ bottom ? '已拉至底部' : '上拉运行 onPull'})</h2>
        <PullLoader onPull={this.pulledToBottom}></PullLoader>
      </div>
    );
  }

  handleEvents(e) {
    console.log(e);
  }

  pulledToBottom() {
    this.setState({
      bottom: true
    });
  }
}

ReactDOM.render((
  <TestPage></TestPage>
), document.getElementById('app'));