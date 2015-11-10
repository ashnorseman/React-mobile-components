/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./Dropdown.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const CSSTransitionGroup = require('react-addons-css-transition-group');

const mixClass = require('../../common/utils/mix-class');
const CheckButton = require('../CheckButton/CheckButton');
const Icon = require('../Icon/Icon');
const Mask = require('../Mask/Mask');
const DropDownTitle = require('./DropdownTitle');
const DropDownItem = require('./DropdownItem');


const Dropdown = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    toggle: React.PropTypes.object,
    filters: React.PropTypes.arrayOf(React.PropTypes.object),
    onFilter: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      toggle: {},
      filters: []
    };
  },

  getInitialState() {
    const { toggle, filters } = this.props;

    this._query = {
      [toggle.name]: !!toggle.checked
    };

    filters.forEach((filter) => {
      const activeItem = filter.list.filter((item) => {
        return item.active;
      })[0];

      if (activeItem) {
        this._query[filter.name] = activeItem.name;
      }
    });

    return this._query;
  },

  componentDidMount() {
    document.body.firstElementChild.classList.add('dropdown-mounted');
  },

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('dropdown-mounted');
  },

  render() {
    const {
            className,
            toggle,
            filters,
            ...props
          } = this.props,

          {
            filterOpened
          } = this.state,

          classes = mixClass({
            'dropdown': true,
            '$': className
          }),

          titles = filters.map(({ name, text, list }, index) => {
            const activeItem = this._query[name] && list.filter((item) => {
                    return item.name === this._query[name];
                  })[0],
                  activeItemText = activeItem && activeItem.text;

            return <DropDownTitle name={name} text={activeItemText || text}
                                  active={!!activeItem} opened={filterOpened === name}
                                  key={index} onTouchTap={this.toggleList.bind(this, name)} />;
          }),

          checkToggle = toggle
                          ? <CheckButton checked={this.state[toggle.name]} className='pull-right'
                                         onToggle={this.toggleButton}>
                              {toggle.text}
                            </CheckButton>
                          : null,

          currentList = filters.filter(({ name }) => {
            return name === filterOpened;
          })[0],

          list = currentList && currentList.list.length
                    ? <ul className='dropdown-list'>
                        {
                          currentList.list.map((item, index) => {
                            const activeItem = this._query[currentList.name];

                            return <DropDownItem key={index} {...item}
                                                 active={activeItem === item.name}
                                                 onTouchTap={this.toggleItem.bind(null, item.name)} />;
                          })
                        }
                      </ul>
                    : null;

    return (
      <div className={classes} {...props}>
        <div className='dropdown-header'>
          {titles}
          {checkToggle}
        </div>
        <CSSTransitionGroup transitionName='dropdown' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          {list}
        </CSSTransitionGroup>

      </div>
    );
  },


  /**
   * Toggle check button
   */
  toggleButton(checked) {
    this.setState({
      filterOpened: '',
      [this.props.toggle.name]: checked
    });

    this._query[this.props.toggle.name] = checked;

    if (this.props.onFilter) {
      this.props.onFilter(this._query);
    }
  },


  /**
   * Toggle filter lists
   */
  toggleList(name) {

    if (this.state.filterOpened === name) {
      this.closeList();
    } else {
      Mask.open({
        zIndex: 80,
        onTouchTap: this.closeList
      });

      // Opening
      this.setState({
        filterOpened: name
      });
    }
  },


  /**
   * Close filter list
   */
  closeList() {
    Mask.close();

    this.setState({
      filterOpened: ''
    });
  },


  /**
   * Toggle filter items
   */
  toggleItem(name) {
    this.closeList();

    if (this._query[this.state.filterOpened] !== name) {
      this._query[this.state.filterOpened] = name;

      if (this.props.onFilter) {
        this.props.onFilter(this._query);
      }
    }
  }
});


module.exports = Dropdown;