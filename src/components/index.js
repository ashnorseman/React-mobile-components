/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

require('../common/styles/app.less');

const Badge = require('./Badge/Badge.js');
const Button = require('./Button/Button.js');
const CheckButton = require('./CheckButton/CheckButton.js');
const Form = require('./Form/Form.js');
const FormControl = require('./Form/FormControl.js');
const Icon = require('./Icon/Icon.js');
const ImageBox = require('./ImageBox/ImageBox.js');
const ImageSlider = require('./ImageSlider/ImageSlider.js');
const Loading = require('./Loading/Loading.js');
const Message = require('./Message/Message.js');
const PullLoader = require('./PullLoader/PullLoader.js');
const TabBar = require('./Tab/TabBar.js');
const TabNav = require('./Tab/TabNav.js');
const Table = require('./Table/Table.js');
const TopAction = require('./TopAction/TopAction.js');


module.exports = {
  Badge,
  Button,
  CheckButton,
  Form,
  FormControl,
  Icon,
  ImageBox,
  ImageSlider,
  Loading,
  Message,
  PullLoader,
  Tab: {
    Bar: TabBar,
    Nav: TabNav
  },
  Table,
  TopAction
};