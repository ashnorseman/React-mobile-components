/**
 * Created by AshZhang on 15/10/26.
 */


import mixClass from '../mix-class';


describe('mixClass(settings)', () => {

  it('mix boolean properties', () => {
    expect(mixClass({
      'active': true,
      'hidden': false
    })).toEqual('active');

    expect(mixClass({
      'active': true,
      'hidden': true
    })).toEqual('active hidden');

    expect(mixClass({
      'active': false,
      'hidden': false
    })).toEqual('');
  });

  it('mix class types', () => {
    expect(mixClass({
      'tab-$': 'bar',
      'hidden': true
    })).toEqual('tab-bar hidden');

    expect(mixClass({
      'tab-$': 'bar',
      'style-$': 1
    })).toEqual('tab-bar style-1');

    expect(mixClass({
      'tab-$': 'bar',
      'hidden': false
    })).toEqual('tab-bar');
  });
});