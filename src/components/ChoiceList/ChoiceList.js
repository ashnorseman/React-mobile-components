/**
 * Created by AshZhang on 15/12/14.
 */


import './ChoiceList.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';

import ChoiceItem from './ChoiceItem';


export default class ChoiceList extends Component {

  render() {
    const {
        className,
        data,
        onToggle,
        ...props
      } = this.props,

      classes = mixClass({
        'choice-list': true,
        '$': className
      }),

      items = data.map((item) => {
        return (
          <ChoiceItem key={item.name} {...item} onToggle={onToggle} />
        );
      });

    return (
      <div className={classes} {...props}>
        {items}
      </div>
    );
  }
}

ChoiceList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  onToggle: PropTypes.func
};

reactMixin(ChoiceList.prototype, PureRenderMixin);
