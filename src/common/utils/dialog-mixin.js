/**
 * Created by AshZhang on 15/12/7.
 */


import ReactDOM from 'react-dom';


export default {


  /**
   * Open the dialog
   */
  open() {
    const el = ReactDOM.findDOMNode(this);

    el.classList.remove('dialog-closed');
    el.classList.add('dialog-opened');
    el.style.left = Math.max((document.documentElement.clientWidth - el.clientWidth) / 2) + 'px';
    el.style.top = Math.max((document.documentElement.clientHeight - el.clientHeight) / 2) + window.scrollY + 'px';
  },


  /**
   * Close the dialog
   */
  close() {
    const el = ReactDOM.findDOMNode(this);

    el.classList.remove('dialog-opened');
    el.classList.add('dialog-closed');
  }
};
