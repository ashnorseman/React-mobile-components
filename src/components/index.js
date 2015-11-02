/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import '../common/styles/app.less';

import Badge from './Badge/Badge.jsx';
import Button from './Button/Button.jsx';
import CheckButton from './CheckButton/CheckButton.jsx';
import Form from './Form/Form.jsx';
import FormControl from './Form/FormControl.jsx';
import Icon from './Icon/Icon.jsx';
import ImageBox from './ImageBox/ImageBox.jsx';
import ImageSlider from './ImageSlider/ImageSlider.jsx';
import PullLoader from './PullLoader/PullLoader.jsx';
import TabBar from './Tab/TabBar.jsx';
import TabNav from './Tab/TabNav.jsx';
import Table from './Table/Table.jsx';
import TopAction from './TopAction/TopAction.jsx';


module.exports = {
  Badge,
  Button,
  CheckButton,
  Form,
  FormControl,
  Icon,
  ImageBox,
  ImageSlider,
  PullLoader,
  Tab: {
    Bar: TabBar,
    Nav: TabNav
  },
  Table,
  TopAction
};