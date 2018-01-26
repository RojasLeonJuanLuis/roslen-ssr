'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _styles = require('../stylesheet/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/containers/navbar.js';


var TitleRoslen = function TitleRoslen(props) {
  return _react2.default.createElement('svg', props, _react2.default.createElement('style', null, '.st0', '{', 'font-family:\'Candal\'', '}', '.st1', '{', 'font-size:191.437px', '}'), _react2.default.createElement('text', {
    transform: 'translate(35.553 165.918)',
    className: 'st0 st1'
  }, 'Roslen'));
};

TitleRoslen.defaultProps = {
  id: 'Capa_1',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 783.5 190.5'
};

var Navbar = function (_Component) {
  (0, _inherits3.default)(Navbar, _Component);

  function Navbar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Navbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Navbar.__proto__ || (0, _getPrototypeOf2.default)(Navbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Navbar, [{
    key: 'render',
    value: function render() {
      var logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
      var links = [{ to: "about", name: "Conócenos" }, { to: "contact", name: "Contacto" }, { to: "products", name: "Productos" }];
      return _react2.default.createElement(_styles.Nav, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement(_styles.ContainerNavBar, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement(_styles.NavBarChildren, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement(_styles.NavBarLink, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3527789840' + ' ' + 'logo-and-icon',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react2.default.createElement(_styles.Roslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react2.default.createElement(TitleRoslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }))), _react2.default.createElement('span', {
        className: 'jsx-3527789840',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, 'x')))), _react2.default.createElement('div', {
        className: 'jsx-3527789840' + ' ' + 'navbar-children',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          }
        }, _react2.default.createElement(_styles.NavBarLink, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          }
        }, link.name));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '3527789840',
        css: '.icon.jsx-3527789840{display:none;}.navbar-children.jsx-3527789840{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}@media(max-width:767px){.logo-and-icon.jsx-3527789840{display:grid;grid-template-columns:50% 50%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.navbar-children.jsx-3527789840{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:left;width:100%;}span.jsx-3527789840{text-align:right;}.icon.jsx-3527789840{display:block;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlEb0IsQUFHMEIsQUFHQSxBQUtFLEFBS0EsQUFNSSxBQUdILGFBckJsQixBQVFrQyxDQWNoQyxHQUhBLDBCQVZnQywrQkFOYixBQVVLLHFFQVQxQixTQVVvQixNQUpsQixVQUthLFdBQ2IiLCJmaWxlIjoiY29udGFpbmVycy9uYXZiYXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcblxuaW1wb3J0IFRpdGxlUm9zbGVuIGZyb20gJy4uL3N2Z3MvdGl0bGUtcm9zbGVuLnN2ZydcblxuaW1wb3J0IHtcbiAgQ29udGFpbmVyTmF2QmFyLFxuICBOYXYsXG4gIE5hdkJhckNoaWxkcmVuLFxuICBOYXZCYXJMaW5rLFxuICBSb3NsZW5cbn0gZnJvbSAnLi4vc3R5bGVzaGVldC9zdHlsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbG9nbyA9ICdodHRwczovL2dpdGh1Yi5jb20vUm9qYXNMZW9uSnVhbkx1aXMvaW1hZ2VzLXJvc2xlbi9ibG9iL21hc3Rlci9sb2dvLnBuZz9yYXc9dHJ1ZSc7XG5cdFx0Y29uc3QgbGlua3MgPSBbXG5cdFx0XHR7dG86IFwiYWJvdXRcIiwgbmFtZTogXCJDb27Ds2Nlbm9zXCJ9LFxuXHRcdFx0e3RvOiBcImNvbnRhY3RcIiwgbmFtZTogXCJDb250YWN0b1wifSxcblx0XHRcdHt0bzogXCJwcm9kdWN0c1wiLCBuYW1lOiBcIlByb2R1Y3Rvc1wifSxcblx0XHRdXG4gICAgcmV0dXJuIChcbiAgICAgIDxOYXY+XG4gICAgICAgIDxDb250YWluZXJOYXZCYXI+XG4gICAgICAgICAgPE5hdkJhckNoaWxkcmVuPlxuXG4gICAgICAgICAgICAgIDxOYXZCYXJMaW5rPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1hbmQtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj48Um9zbGVuPjxUaXRsZVJvc2xlbiAvPjwvUm9zbGVuPjwvTGluaz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPng8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvTmF2QmFyTGluaz5cblxuICAgICAgICAgIDwvTmF2QmFyQ2hpbGRyZW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItY2hpbGRyZW5cIj5cbiAgICAgICAgICAgIHtsaW5rcy5tYXAobGluayA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiA8TGlua1xuICAgICAgICAgICAgICAgIGtleT17bGluay5uYW1lfVxuICAgICAgICAgICAgICAgIGhyZWY9e2Ake2xpbmsudG99YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TmF2QmFyTGluaz57bGluay5uYW1lfTwvTmF2QmFyTGluaz5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db250YWluZXJOYXZCYXI+XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAuaWNvbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgIH1cbiAgICAgICAgICAubmF2YmFyLWNoaWxkcmVuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIH1cbiAgICAgICAgICBAbWVkaWEobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgICAgICAgLmxvZ28tYW5kLWljb24ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5uYXZiYXItY2hpbGRyZW4ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5pY29uIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L05hdj5cbiAgICApXG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=containers/navbar.js */'
      }));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIlRpdGxlUm9zbGVuIiwiQ29udGFpbmVyTmF2QmFyIiwiTmF2IiwiTmF2QmFyQ2hpbGRyZW4iLCJOYXZCYXJMaW5rIiwiUm9zbGVuIiwiTmF2YmFyIiwic3RhdGUiLCJsb2dvIiwibGlua3MiLCJ0byIsIm5hbWUiLCJtYXAiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7OztBQUlQLEFBQ0UsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNLOzs7Ozs7O0ksQUFSQSx1QixBQUFBOzs7Ozs7O0EsQUFBQTs7Ozs7O0lBVWMsQTs7Ozs7Ozs7Ozs7Ozs7NE1BQ25CLEEsUUFBUSxBOzs7Ozs2QkFJQyxBQUNQO1VBQU0sT0FBTixBQUFhLEFBQ2Y7VUFBTSxRQUFRLENBQ2IsRUFBQyxJQUFELEFBQUssU0FBUyxNQURELEFBQ2IsQUFBb0IsZUFDcEIsRUFBQyxJQUFELEFBQUssV0FBVyxNQUZILEFBRWIsQUFBc0IsY0FDdEIsRUFBQyxJQUFELEFBQUssWUFBWSxNQUhsQixBQUFjLEFBR2IsQUFBdUIsQUFFdEI7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUVJO0FBRko7QUFBQSx5QkFFSSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUMsZ0NBQUssTUFBTixBQUFXO29CQUFYO3NCQUFBLEFBQWU7QUFBZjt5QkFBZSxBQUFDOztvQkFBRDtzQkFBQSxBQUFRO0FBQVI7QUFBQSx1Q0FBUSxBQUFDOztvQkFBRDtzQkFEekIsQUFDRSxBQUFlLEFBQVEsQUFDdkI7QUFEdUI7QUFBQSw0QkFDdkIsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBTlYsQUFDRSxBQUVJLEFBQ0UsQUFFRSxBQUtSLHlCQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRztBQURIO0FBQUEsZUFDRyxBQUFNLElBQUksZ0JBQVEsQUFDakI7K0JBQU8sQUFBQztlQUNELEtBREEsQUFDSyxBQUNWO3FCQUFTLEtBRkosQUFFUzs7c0JBRlQ7d0JBQUEsQUFJSDtBQUpHO0FBQ0wsU0FESyxrQkFJSCxBQUFDOztzQkFBRDt3QkFBQSxBQUFhO0FBQWI7QUFBQSxnQkFKSixBQUFPLEFBSUgsQUFBa0IsQUFFdkI7QUFwQlAsQUFDRSxBQVdFLEFBQ0c7aUJBYlA7YUFERixBQUNFLEFBcURIO0FBckRHOzs7OztBQWI4QixBOztrQkFBZixBIiwiZmlsZSI6Im5hdmJhci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9qYXMvRGVza3RvcC9yb3NsZW4tc3NyIn0=