/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

require('../common/styles/app.less');

const Badge = require('./Badge/Badge');
const Button = require('./Button/Button');
const CheckButton = require('./CheckButton/CheckButton');
const Dropdown = require('./Dropdown/Dropdown');
const Form = require('./Form/Form');
const FormControl = require('./Form/FormControl');
const Icon = require('./Icon/Icon');
const ImageBox = require('./ImageBox/ImageBox');
const ImageSlider = require('./ImageSlider/ImageSlider');
const Loading = require('./Loading/Loading');
const Message = require('./Message/Message');
const PullLoader = require('./PullLoader/PullLoader');
const TabBar = require('./Tab/TabBar');
const TabNav = require('./Tab/TabNav');
const TabScope = require('./Tab/TabScope');
const Table = require('./Table/Table');
const TopAction = require('./TopAction/TopAction');


module.exports = {
  Badge,
  Button,
  CheckButton,
  Dropdown,
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
    Nav: TabNav,
    Scope: TabScope
  },
  Table,
  TopAction
};