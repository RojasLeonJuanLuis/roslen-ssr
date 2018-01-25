'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../stylesheet/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/components/product.js';


var Product = function Product(props) {
  return _react2.default.createElement(_styles.Card, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement('div', {
    className: 'jsx-3570661062',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_styles.Image, { src: props.image, alt: props.name, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  })), _react2.default.createElement('div', {
    className: 'jsx-3570661062' + ' ' + 'props',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement('h3', {
    className: 'jsx-3570661062',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, props.name), _react2.default.createElement('p', {
    className: 'jsx-3570661062' + ' ' + 'left',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, props.description)), _react2.default.createElement(_style2.default, {
    styleId: '3570661062',
    css: '.props.jsx-3570661062{width:90%;text-align:left;margin:auto;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZHVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQmtCLEFBR3FCLFVBQ00sZ0JBQ0osWUFDZCIsImZpbGUiOiJjb21wb25lbnRzL3Byb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIEltYWdlLFxuICBDYXJkXG59IGZyb20gJy4uL3N0eWxlc2hlZXQvc3R5bGVzJ1xuXG5jb25zdCBQcm9kdWN0ID0gKHByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhcmQ+XG4gICAgICA8ZGl2PlxuICAgICAgICA8SW1hZ2Ugc3JjPXtwcm9wcy5pbWFnZX0gYWx0PXtwcm9wcy5uYW1lfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxoMz57cHJvcHMubmFtZX08L2gzPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWZ0XCI+e3Byb3BzLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAucHJvcHMge1xuICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIH1cbiAgICAgIGB9XG4gICAgICA8L3N0eWxlPlxuICAgIDwvQ2FyZD5cbiAgKVxufVxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdFxuIl19 */\n/*@ sourceURL=components/product.js */'
  }));
};
exports.default = Product;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZHVjdC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkltYWdlIiwiQ2FyZCIsIlByb2R1Y3QiLCJwcm9wcyIsImltYWdlIiwibmFtZSIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQ0UsQUFDQSxBQUNLOzs7Ozs7O0FBRVAsSUFBTSxVQUFVLFNBQVYsQUFBVSxRQUFBLEFBQUMsT0FBVSxBQUN6Qjt5QkFDRSxBQUFDOztnQkFBRDtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLGNBQUE7ZUFBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQywrQkFBTSxLQUFLLE1BQVosQUFBa0IsT0FBTyxLQUFLLE1BQTlCLEFBQW9DO2dCQUFwQztrQkFGSixBQUNFLEFBQ0UsQUFFRjtBQUZFO3VCQUVGLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTtlQUFBOztnQkFBQTtrQkFBQSxBQUFLO0FBQUw7QUFBQSxXQURGLEFBQ0UsQUFBVyxBQUNYLHVCQUFBLGNBQUE7d0NBQUEsQUFBYTs7Z0JBQWI7a0JBQUEsQUFBcUI7QUFBckI7QUFBQSxXQU5KLEFBSUUsQUFFRSxBQUEyQjthQU4vQjtTQURGLEFBQ0UsQUFrQkg7QUFsQkc7QUFGSixBQXFCQTtrQkFBQSxBQUFlIiwiZmlsZSI6InByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9