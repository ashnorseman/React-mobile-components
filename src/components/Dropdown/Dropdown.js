/**
 * Created by AshZhang on 15/11/9.
 */


import './Dropdown.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import CheckButton from '../CheckButton/CheckButton';
import Icon from '../Icon/Icon';
import Mask from '../Mask/Mask';
import DropDownTitle from './DropdownTitle';
import DropDownItem from './DropdownItem';


export default class Dropdown extends Component {

  constructor(props) {
    super(props);

    const { toggle, filters } = props;

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

    this.state = this._query;
  }

  componentDidMount() {
    document.body.firstElementChild.classList.add('dropdown-mounted');
  }

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('dropdown-mounted');
  }


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
  }


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
  }


  /**
   * Close filter list
   */
  closeList() {
    Mask.close();

    this.setState({
      filterOpened: ''
    });
  }


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


  render() {
    const {
            className,
            filters,
            toggle,
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

            return (
              <DropDownTitle key={index}
                             name={name}
                             text={activeItemText || text}
                             active={!!activeItem}
                             opened={filterOpened === name}
                             onTouchTap={this.toggleList.bind(this, name)} />
            );
          }),

          checkToggle = toggle
            ? <CheckButton className="pull-right"
                           checked={this.state[toggle.name]}
                           onToggle={this.toggleButton.bind(this)}>
                {toggle.text}
              </CheckButton>
            : null,

          currentList = filters.filter(({ name }) => {
            return name === filterOpened;
          })[0],

          list = currentList && currentList.list.length
            ? <ul className="dropdown-list">
                {
                  currentList.list.map((item, index) => {
                    const activeItem = this._query[currentList.name];

                    return (
                      <DropDownItem key={index} {...item}
                                    active={activeItem === item.name}
                                    onTouchTap={this.toggleItem.bind(this, item.name)} />
                    );
                  })
                }
              </ul>
            : null;

    return (
      <div className={classes} {...props}>
        <div className="dropdown-header">
          {titles}
          {checkToggle}
        </div>
        <CSSTransitionGroup transitionName="dropdown"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}>
          {list}
        </CSSTransitionGroup>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  filters  : PropTypes.arrayOf(PropTypes.object),
  toggle   : PropTypes.object,
  onFilter : PropTypes.func
};

Dropdown.defaultProps = {
  filters: [],
  toggle : {}
};

reactMixin(Dropdown.prototype, PureRenderMixin);
