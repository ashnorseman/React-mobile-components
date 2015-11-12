# React Mobile Components

基于 React 的移动端组件包，欢迎试用 ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡

bug 肯定是有的……求轻喷……

Demo 地址（手机打开）：[Demo](http://react-mobile-components.herokuapp.com)

## 使用

    npm install react-mobile-components -S

```javascript

// touchTap 插件
import injectTapEventPlugin from 'react-tap-event-plugin';

// 按需求加载组件
import { Button, Icon, Form, Tab, TopAction } from 'react-mobile-components';

injectTapEventPlugin();
```

## 图标

PS：目前只有样式，具体的图标 UI 还在画，略坑……இдஇ

```javascript
<Icon name='home' />
<Icon name='loading' rotate />    // 旋转
```

## 加载状态

```javascript
<Loading />   // 传说中的小菊花
```

## 按钮

```javascript
<Button onClick={this.click}>确认</Button>
<Button disabled>禁用</Button>
<Button type='submit'>提交表单</Button>
<Button icon='money'>前面带个图标</Button>
<Button icon='money' link>链接样式</Button>
```

## 勾选按钮（类似 checkbox）

```javascript
<CheckButton>设为默认</CheckButton>
<CheckButton checked>已勾选</CheckButton>
<CheckButton onToggle={this.toggle}>onToggle(checked<bool>)</CheckButton>
```

## 下拉筛选

支持多组下拉筛选列表，可附加一个勾选选项

```javascript
const dropDownData = {
  toggle: {
    name: 'exchangeable',
    text: '我能兑换'
  },
  filters: [{
    name: 'sort',
    text: '排序',
    list: [{
      name: 'count',
      text: '兑换量优先'
    }, {
      name: 'pointsAtoZ',
      text: '积分从低到高'
    }]
  }, {
    name: 'category',
    text: '分类',
    list: [{
      name: 'all',
      text: '全部'
    }, {
      name: 'physical',
      text: '实物礼品'
    }]
  }]
};

<Dropdown {...dropDownData} onFilter={this.filter} />
// onFilter 参数格式：{ exchangeable: true, sort: 'count', category: 'all' }
```

## 表单控件

* 可以加一个 label，也可以不要
* 自带验证
* type 支持除了 checkbox 和 radio 之外所有的 input type，外加 select 和 textarea
* 为保持数据一致性，请用 value 传值，不要用 defaultValue；修改表单的值请通过 onChange 回调，手动在上层 view 控制

```javascript
<FormControl name='test' 
             value={this.state.test} 
             onChange={this.controlChange.bind(this)} />
<FormControl type='select' options={[{ value: '1', text: '选项 1' }]} />
// onChange(name<string>, value<string>)
```

## 表单

* 自带验证
* beforeSubmit 返回 false 不能提交
* 提交表单的逻辑写在 onSubmit 里

```javascript
const formData = {
  action: '/form',
  controls: [
    {
      name: 'text',
      type: 'text',
      required: true
    }
  ],
  submitText: '提交',
  beforeSubmit(formData) {},
  onSubmit(formData) {}
};
<Form {...formData} />
<Form {...formData} {submitAtPageBottom} />   // 提交按钮固定在页面底部
```

## 加加减减

* 为保持数据一致性，请用 value 传值，不要用 defaultValue；修改值请通过 onChange 回调，手动在上层 view 控制

```javascript
<PlusMinus value={10} min={0} max={100} onChange={this.change} />

// onChange(value)
```

## Tab

以下几种 Tab 配置差不多，基本只有样式的区别

### Tab.Nav

Tab 导航

```javascript
const tabNavData = [
  {
    icon: 'home',
    text: '积分互动',
    link: 'home',     // 效果：href='#/home'
    type: 1           // 颜色样式
  },
  {
    icon: 'gift-box',
    text: '礼品箱',
    link: '//taobao.com',   // 效果：href='//taobao.com'
    type: 2
  }
];
<Tab.Nav data={tabNavData} />
```

### Tab.Bar

页面底部的 Tab 栏

```javascript
const tabBarData = [
  {
    badge: '9',         // 右上角的数字标签
    icon: 'gift-box',
    text: '礼品箱',
    link: 'gift-box'
  }
];
<Tab.Bar data={tabBarData} />
```

### Tab.Scope

页面顶部的 Tab 筛选

```javascript
const tabScopeData = [
  {
    text: '全部',
    link: 'history/1'
  },
  {
    text: '已发货',
    link: 'history/2'
  }
];
<Tab.Scope data={tabScopeData} />
```

## 表格视图

```javascript
const tableData = [
  {
    text: '个人信息',    // 左侧文字
    note: '2015-10-10', // 左侧备注信息
    href: 'profile',
    disclosure: true    // 右侧的向右箭头
  },
  {
    text: '收货地址',
    href: 'address',
    disclosure: true,
    children: <img src='' alt='' />   // 右侧自定义内容
  }
];
<Table data={tableData} />
<Table data={tableData} expanded={true} onToggle={this.toggle}>  // 点击表头伸缩内容
  <span>此处自定义内容为表头</span>
</Table>

// onToggle(expanded<bool>)
```

## 图片框

将图片展示在指定大小的框内

```javascript
<ImageBox src='' style={{ width: 122, height: 122 }} />
// 可通过 className 或 style 控制
```

## 图片滑动切换

左右滑动切换图片

```javascript
<ImageSlider data={['1.jpg', '2.jpg']} />
```

## 消息

```javascript
Message('message', 2000);   // 屏幕弹出消息 2 秒
```

## 遮罩层

```javascript
Mask.open({
  zIndex: 100,              // 可自定义 zIndex
  onTouchTap: Mask.close    // 点击后回调 
});
```

## 返回顶部

返回顶部的小按钮，会在页面滚动后出现

```javascript
<TopAction /> 
```

## 上拉加载更多

```javascript
<PullLoader onPull={() => {}} loading>
  {this.props.children}
</PullLoader>

// 加载数据的方法请写在 onPull 回调里，设置 loading 属性可显示一个加载的小菊花
```