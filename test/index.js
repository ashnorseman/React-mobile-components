/**
 * Test entrance
 */


import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

var context = require.context('../src', true, /-test\.jsx?$/);
context.keys().forEach(context);
