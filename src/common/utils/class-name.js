/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';


export default function className(props) {
  let classes = [];

  Object.keys(props).forEach((key) => {
    if (props[key]) {
      classes.push(key);
    }
  });

  return classes.join(' ');
}