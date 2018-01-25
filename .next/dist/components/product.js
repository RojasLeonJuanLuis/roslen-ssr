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
    className: 'jsx-2996711717' + ' ' + 'container-image',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_styles.Image, { src: props.image, alt: props.name, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  })), _react2.default.createElement('div', {
    className: 'jsx-2996711717' + ' ' + 'props',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement('h3', {
    className: 'jsx-2996711717',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, props.name), _react2.default.createElement('p', {
    className: 'jsx-2996711717' + ' ' + 'left',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, props.description)), _react2.default.createElement(_style2.default, {
    styleId: '2996711717',
    css: '.container-image.jsx-2996711717{border-bottom:1px solid rgb(246,246,246);}.props.jsx-2996711717{width:90%;text-align:left;margin:auto;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;bottom:0;margin-bottom:0;padding-bottom:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZHVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQmtCLEFBR29ELEFBRy9CLFVBQ00sZ0JBQ0osWUFDQSxHQUxkLFNBTWUsMEVBQ1MsOEVBQ0MsNkdBQ0UsaUdBQ2hCLFNBQ08sZ0JBQ0MsaUJBQ25CIiwiZmlsZSI6ImNvbXBvbmVudHMvcHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9qYXMvRGVza3RvcC9yb3NsZW4tc3NyIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtcbiAgSW1hZ2UsXG4gIENhcmRcbn0gZnJvbSAnLi4vc3R5bGVzaGVldC9zdHlsZXMnXG5cbmNvbnN0IFByb2R1Y3QgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q2FyZD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWltYWdlXCI+XG4gICAgICAgIDxJbWFnZSBzcmM9e3Byb3BzLmltYWdlfSBhbHQ9e3Byb3BzLm5hbWV9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvcHNcIj5cbiAgICAgICAgPGgzPntwcm9wcy5uYW1lfTwvaDM+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImxlZnRcIj57cHJvcHMuZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5jb250YWluZXItaW1hZ2Uge1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2IoMjQ2LDI0NiwyNDYpO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9wcyB7XG4gICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgIGB9XG4gICAgICA8L3N0eWxlPlxuICAgIDwvQ2FyZD5cbiAgKVxufVxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdFxuIl19 */\n/*@ sourceURL=components/product.js */'
  }));
};
exports.default = Product;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZHVjdC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkltYWdlIiwiQ2FyZCIsIlByb2R1Y3QiLCJwcm9wcyIsImltYWdlIiwibmFtZSIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQ0UsQUFDQSxBQUNLOzs7Ozs7O0FBRVAsSUFBTSxVQUFVLFNBQVYsQUFBVSxRQUFBLEFBQUMsT0FBVSxBQUN6Qjt5QkFDRSxBQUFDOztnQkFBRDtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQywrQkFBTSxLQUFLLE1BQVosQUFBa0IsT0FBTyxLQUFLLE1BQTlCLEFBQW9DO2dCQUFwQztrQkFGSixBQUNFLEFBQ0UsQUFFRjtBQUZFO3VCQUVGLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTtlQUFBOztnQkFBQTtrQkFBQSxBQUFLO0FBQUw7QUFBQSxXQURGLEFBQ0UsQUFBVyxBQUNYLHVCQUFBLGNBQUE7d0NBQUEsQUFBYTs7Z0JBQWI7a0JBQUEsQUFBcUI7QUFBckI7QUFBQSxXQU5KLEFBSUUsQUFFRSxBQUEyQjthQU4vQjtTQURGLEFBQ0UsQUE2Qkg7QUE3Qkc7QUFGSixBQWdDQTtrQkFBQSxBQUFlIiwiZmlsZSI6InByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9