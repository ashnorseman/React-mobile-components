/**
 * Created by AshZhang on 15/10/25.
 */


/**
 * Generate class names via props
 * @param {Object} settings
 * @returns {string}
 *
 * e.g.
 * {
 *   'active': true,    // => `active`: appears in the result because value is true
 *   'tab-item': false, // => ``: does not generate class names when value is false
 *   'tab-$': 'bar'     // => `tab-bar`: `$` is replaced by value
 * }    // => 'active tab-bar'
 */
export default function className(settings = {}) {
  let classes = [];

  Object.keys(settings).forEach((key) => {
    const val = settings[key];

    if (key.indexOf('$') > -1 && val !== undefined) {
      classes.push(key.replace(/\$/, val));
    } else if (val) {
      classes.push(key);
    }
  });

  return classes.join(' ');
}
