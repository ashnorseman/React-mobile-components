/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import '../common/styles/app.less';

import Badge from './Badge/Badge';
import Button from './Button/Button';
import Calendar from './Calendar/Calendar';
import CheckButton from './CheckButton/CheckButton';
import Dropdown from './Dropdown/Dropdown';
import Form from './Form/Form';
import FormControl from './Form/FormControl';
import Icon from './Icon/Icon';
import ImageBox from './ImageBox/ImageBox';
import ImageSlider from './ImageSlider/ImageSlider';
import Loading from './Loading/Loading';
import Mask from './Mask/Mask';
import Message from './Message/Message';
import PlusMinus from './PlusMinus/PlusMinus';
import PullLoader from './PullLoader/PullLoader';
import TabBar from './Tab/TabBar';
import TabNav from './Tab/TabNav';
import TabScope from './Tab/TabScope';
import Table from './Table/Table';
import TopAction from './TopAction/TopAction';


export default {
  Badge,
  Button,
  Calendar,
  CheckButton,
  Dropdown,
  Form,
  FormControl,
  Icon,
  ImageBox,
  ImageSlider,
  Loading,
  Mask,
  Message,
  PlusMinus,
  PullLoader,
  Tab: {
    Bar: TabBar,
    Nav: TabNav,
    Scope: TabScope
  },
  Table,
  TopAction
};
