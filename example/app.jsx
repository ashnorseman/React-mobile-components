/**
 * App entrance
 */


'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Badge, Button, Calendar, CheckButton, ChoiceList, Dropdown, Form, FormControl, Icon, ImageBox, ImageSlider, Loading, Mask, Message, PlusMinus, PullLoader, Tab, Table, TopAction } from '../src/components/index.js';

injectTapEventPlugin();

const calendarData = {
  date: new Date(2015, 11, 31),
  highlights: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 10).valueOf()],
  marks: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 20).valueOf()]
};

const choiceData = [
  {
    name: 'white',
    text: '白色'
  },
  {
    name: 'black',
    text: '黑色',
    checked: true
  },
  {
    name: 'khaki',
    text: '卡其色',
    disabled: true
  }
];

const dropDownData = {
  toggle: {
    name: 'exchangeable',
    text: '我能兑换'
  },
  filters: [
    {
      name: 'sort',
      text: '排序',
      list: [
        {
          name: 'count',
          text: '兑换量优先'
        },
        {
          name: 'pointsAtoZ',
          text: '积分低到高'
        }
      ]
    },
    {
      name: 'category',
      text: '分类',
      list: [
        {
          name: 'all',
          text: '全部'
        },
        {
          name: 'physical',
          text: '实物礼品'
        }
      ]
    }
  ]
};

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
    badge: 100,
    icon: 'gift',
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
    icon: 'bag',
    text: '实物礼品',
    link: 'physical',
    type: 1
  },
  {
    icon: 'ticket',
    text: '虚拟礼品',
    link: 'virtual',
    type: 2
  },
  {
    icon: 'packet',
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

const tabScopeData = [
  {
    text: '全部',
    link: 'history/1'
  },
  {
    text: '已发货',
    link: 'history/2'
  },
  {
    text: '未发货',
    link: 'history/3'
  },
  {
    text: '已取消',
    link: 'history/4'
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
      bottom: false,
      controls: {
        text: '示例文字',
        number: '',
        tel: '',
        email: '',
        date: '',
        time: '',
        select: '',
        textarea: ''
      },
      form2: {
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
            type: 'number',
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
      }
    };
  }

  render() {
    const { bottom, controls, form2 } = this.state;

    return (
      <div>
        <h2 className="gap-side gap-t">图标</h2>
        <div className="gap-side">
          <Icon name="loading"></Icon>
          <Icon name="loading" rotate className="gap-l"></Icon>
        </div>

        <h2 className="gap-side gap-5">加载</h2>
        <Loading />

        <h2 className="gap-side gap-t">按钮</h2>
        <div className="gap-side">
          <Button disabled onTouchTap={this.handleEvents}>积分不足</Button>
          <Button type="button" onTouchTap={this.handleEvents} className="gap-t">立即兑换</Button>
          <Button type="button" icon="rotate" className="gap-t" disabled>提交中…</Button>
        </div>

        <h2 className="gap-side gap-t">小按钮</h2>
        <div className="gap-side">
          <Button disabled icon="delete" link className="gap-r">删除</Button>
          <Button icon="edit" link>编辑</Button>
        </div>

        <h2 className="gap-side gap-t">日历</h2>
        <div className="gap-side">
          <Calendar {...calendarData} />
        </div>

        <h2 className="gap-side gap-t">选择按钮</h2>
        <div className="gap-side">
          <CheckButton className="gap-r" onToggle={this.handleEvents}>设为默认</CheckButton>
          <CheckButton checked onToggle={this.handleEvents}>设为默认</CheckButton>
        </div>

        <h2 className="gap-side gap-t">选择列表</h2>
        <div className="gap-side">
          <ChoiceList data={choiceData} onToggle={this.handleEvents} />
        </div>

        <h2 className="gap-side gap-t">下拉列表 (见最上)</h2>
        <Dropdown {...dropDownData} onFilter={this.filter} />

        <h2 className="gap-side gap-t">表单元素</h2>
        <div className="gap-side">
          <FormControl name="text" type="text" placeholder="文本（必填）" value={controls.text} onChange={this.controlChange.bind(this)} required />
          <FormControl name="number" type="number" placeholder="数字（5-10）" max="10" min="5" value={controls.number} onChange={this.controlChange.bind(this)}  />
          <FormControl name="email" type="email" placeholder="电子邮件" value={controls.email} onChange={this.controlChange.bind(this)}  />
          <FormControl name="tel" type="tel" placeholder="联系方式" value={controls.tel} onChange={this.controlChange.bind(this)}  />
          <FormControl name="date" type="date" placeholder="日期（必填）" required value={controls.date} onChange={this.controlChange.bind(this)}  />
          <FormControl name="time" type="time" placeholder="时间（必填）" required value={controls.time} onChange={this.controlChange.bind(this)}  />
          <FormControl name="select" type="select" placeholder="请选择（必选）" options={formSelectOptions} required value={controls.select} onChange={this.controlChange.bind(this)}  />
          <FormControl name="textarea" type="textarea" placeholder="多行文本（5–10 字）" maxLength="10" minLength="5" value={controls.textarea} onChange={this.controlChange.bind(this)}  />
        </div>

        <h2 className="gap-side gap-t">表单（带说明）</h2>
        <Form {...formData}></Form>

        <h2 className="gap-side gap-t">表单</h2>
        <Form {...form2} className="gap-t" onControlChange={this.formControlChange.bind(this)} />

        <h2 className="gap-side gap-t">Tab.Nav</h2>
        <Tab.Nav data={tabNavData}></Tab.Nav>

        <h2 className="gap-side gap-t">Tab.Scope</h2>
        <Tab.Scope data={tabScopeData} style={{ position: 'relative' }}></Tab.Scope>

        <h2 className="gap-side gap-t">Tab.Bar (见最下)</h2>
        <Tab.Bar data={tabBarData}></Tab.Bar>

        <h2 className="gap-side gap-t">Table</h2>
        <Table data={tableData} expanded={true}>
          <span>本月</span>
          <span className="gap-l">赚取积分</span>
          <span className="text-primary">600</span>
          <span className="gap-l">兑换积分</span>
          <span className="text-primary">600</span>
        </Table>

        <h2 className="gap-side gap-t">ImageBox</h2>
        <div className="gap-side">
          <div style={{ display: 'inline-block' }}>
            <ImageBox src="example/images/200_150.jpeg"></ImageBox>
          </div>
          <div style={{ display: 'inline-block' }} className="gap-l">
            <ImageBox src="example/images/150_200.jpeg"></ImageBox>
          </div>
        </div>

        <h2 className="gap-side gap-t">ImageSlider</h2>
        <ImageSlider data={imageSliderData}></ImageSlider>

        <h2 className="gap-side gap-t">消息</h2>
        <div className="gap-side">
          <Button onTouchTap={this.message}>点击弹出</Button>
        </div>

        <h2 className="gap-side gap-t">遮罩层</h2>
        <div className="gap-side">
          <Button onTouchTap={this.mask}>点击弹出</Button>
        </div>

        <h2 className="gap-side gap-t">加加减减</h2>
        <div className="gap-side">
          <PlusMinus value={10} min={0} max={100} onChange={this.handleEvents}/>
        </div>

        <h2 className="gap-side gap-t">TopAction (滚动屏幕后见右下角)</h2>
        <TopAction></TopAction>

        <h2 className="gap-side gap-t">PullLoader ({ bottom ? '已拉至底部' : '上拉运行 onPull'})</h2>
        <PullLoader onPull={this.pulledToBottom} loading></PullLoader>
      </div>
    );
  }

  controlChange(name, value) {
    this.state.controls[name] = value;
    this.setState(this.state);
  }

  formControlChange(name, value) {
    Form.updateValue(this.state.form2.controls, name, value);

    this.setState({
      form2: this.state.form2
    });
  }

  filter(query) {
    console.log(query);
  }

  handleEvents(e) {
    console.log(arguments);
  }

  message() {
    Message(Date.now());
  }

  mask() {
    Mask.open({
      onTouchTap: Mask.close
    });
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