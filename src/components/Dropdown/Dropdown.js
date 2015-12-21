/**
 * Created by AshZhang on 15/11/9.
 */


import './Dropdown.less';

import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import mixClass from '../../common/utils/mix-class';
import CheckButton from '../CheckButton/CheckButton';
import Icon from '../Icon/Icon';
import Mask from '../Mask/Mask';
import DropDownTitle from './DropdownTitle';
import DropDownItem from './DropdownItem';
import DropDownMenu from './DropdownMenu';


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
        onTouchTap: this.closeList.bind(this)
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
   * Toggle menu
   * @param item
   */
  toggleMenu(item) {
    this.setState({
      menuOpened: item.name
    });

    if (!item.list) {
      this._query[this.state.filterOpened] = [item.name];
      this.closeList();

      if (this.props.onFilter) {
        this.props.onFilter(this._query);
      }
    }
  }


  /**
   * Toggle filter items
   * @param {string} name
   * @param {string} parentName
   */
  toggleItem(name, parentName) {
    const queries = this._query[this.state.filterOpened];

    this.closeList();

    if (!parentName && (queries !== name)) {
      this._query[this.state.filterOpened] = name;

      if (this.props.onFilter) {
        this.props.onFilter(this._query);
      }
    } else if (parentName && (!queries || (queries[1] !== name))) {
      this._query[this.state.filterOpened] = [this.state.menuOpened, name];

      if (this.props.onFilter) {
        this.props.onFilter(this._query);
      }
    }
  }


  /**
   * Get active item of a list
   * @param {string} name
   * @param {Array} list
   * @returns {Array|null}
   */
  getActiveItem(name, list) {
    let queries = this._query[name],
        activeList;

    if (queries && list) {
      activeList = list.filter((item) => {
        if (typeof queries === 'string') {
          return item.name === queries;
        } else {
          return item.name === queries[0];
        }
      });

      if (activeList.length) {
        return activeList[0];
      }
    }

    return null;
  }


  /**
   * Get active item text
   * @param {string} name
   * @param {string} text
   * @param {Object} activeItem
   * @returns {string}
   */
  parseTitleText(name, text, activeItem) {
    const queries = this._query[name];

    let activeItemText = '';

    if (activeItem && (activeItem.name !== 'all')) {
      const activeSubItem = activeItem.list && activeItem.list.filter((item) => {
          return item.name === queries[1];
        });

      activeItemText = (activeSubItem && activeSubItem[0] && (activeSubItem[0].name !== 'all'))
        ? activeSubItem[0].text
        : activeItem.text;
    }

    return activeItemText || text;
  }


  /**
   * Render a dropdown list
   * @param {Array} list
   * @returns {XML}
   */
  renderDropdown(list) {

    if (list.depth === 2) {
      const activeList = list.list.filter((item) => {
        return item.name === this.state.menuOpened;
      });

      return (
        <div>
          <ul className="dropdown-menus">
            {this.renderMenus(list.list)}
          </ul>

          <ul className="dropdown-items">
            {
              (activeList[0] && activeList[0].list)
                ? this.renderItems(activeList[0], list.name, 2)
                : null
            }
          </ul>
        </div>
      );
    }

    return (
      <ul>
        {this.renderItems(list)}
      </ul>
    );
  }


  /**
   * Render a list of dropdown menus
   * @param {Array} list
   * @returns {Array|*}
   */
  renderMenus(list) {
    return list.map((item, index) => {
      const activeItem = this.state.menuOpened;

      return (
        <DropDownMenu key={index} {...item}
                      active={activeItem === item.name}
                      onTouchTap={this.toggleMenu.bind(this, item)} />
      );
    });
  }


  /**
   * Render list items (last level)
   * @param {Array} list
   * @param {string} [parentName]
   * @param {number} [depth]
   * @returns {Array}
   */
  renderItems(list, parentName, depth = 1) {
    return list.list.map((item, index) => {
      const activeItem = (depth === 1)
        ? this._query[list.name]
        : (this._query[parentName] && this._query[parentName][1]);

      return (
        <DropDownItem key={index} {...item}
                      active={activeItem === item.name}
                      onTouchTap={this.toggleItem.bind(this, item.name, parentName)} />
      );
    });
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
        const activeItem = this.getActiveItem(name, list),
          activeItemText = this.parseTitleText(name, text, activeItem);

        return (
          <DropDownTitle key={index}
                         name={name}
                         text={activeItemText}
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
        ? <div className="dropdown-list">
            {this.renderDropdown(currentList)}
          </div>
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
