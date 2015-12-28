/**
 * Created by AshZhang on 15/12/14.
 */


import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import ChoiceItem from './ChoiceItem';


export default function ChoiceList({
  className,
  data,
  onToggle,
  ...props
}) {
  const classes = mixClass({
      'choice-list': true,
      '$': className
    }),

    items = data.map((item) => {
      return (
        <ChoiceItem key={item.name}
                    {...item}
                    onToggle={onToggle} />
      );
    });

  return (
    <div className={classes} {...props}>
      {items}
    </div>
  );
}

ChoiceList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  onToggle: PropTypes.func
};
