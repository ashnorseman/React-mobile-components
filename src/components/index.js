/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import Badge from './Badge/Badge.jsx';
import Button from './Button/Button.jsx';
import Icon from './Icon/Icon.jsx';
import ImageBox from './ImageBox/ImageBox.jsx';
import ImageSlider from './ImageSlider/ImageSlider.jsx';
import TabBar from './Tab/TabBar.jsx';
import TabNav from './Tab/TabNav.jsx';
import Table from './Table/Table.jsx';
import TopAction from './TopAction/TopAction.jsx';


export default {
  Badge: Badge,
  Button: Button,
  Icon: Icon,
  ImageBox: ImageBox,
  ImageSlider: ImageSlider,
  Tab: {
    Bar: TabBar,
    Nav: TabNav
  },
  Table: Table,
  TopAction: TopAction
};