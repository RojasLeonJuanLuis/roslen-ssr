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
          lineNumber: 30
        }
      }, _react2.default.createElement(_styles.ContainerNavBar, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement(_styles.NavBarChildren, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-456294663' + ' ' + 'logo-and-icon',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, _react2.default.createElement(_styles.Roslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, _react2.default.createElement(TitleRoslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }))), _react2.default.createElement('span', {
        className: 'jsx-456294663' + ' ' + 'icon-cross',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, 'x'))), _react2.default.createElement('div', {
        className: 'jsx-456294663' + ' ' + 'navbar-children',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          }
        }, _react2.default.createElement(_styles.NavBarLink, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        }, link.name));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '456294663',
        css: '.logo-and-icon.jsx-456294663{width:140px;}.navbar-children.jsx-456294663{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.icon-cross.jsx-456294663{display:none;}@media(max-width:767px){.logo-and-icon.jsx-456294663{display:grid;grid-template-columns:50% 50%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:90%;}.navbar-children.jsx-456294663{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:left;width:90%;display:none;}span.jsx-456294663{text-align:right;}.icon-cross.jsx-456294663{display:block;}.icon-cross.jsx-456294663:hover{cursor:pointer;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEb0IsQUFHeUIsQUFHQyxBQUlBLEFBSUUsQUFNQSxBQU9JLEFBR0gsQUFHQyxZQTdCbkIsQ0FPQSxBQUlrQyxDQWdCaEMsQ0FHQSxFQU5BLDBCQVpnQywrQkFUYixBQWNLLHFFQWIxQixTQWNvQixNQUxOLFVBQ1osQUFLWSxVQUNHLGFBQ2YiLCJmaWxlIjoiY29udGFpbmVycy9uYXZiYXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcblxuaW1wb3J0IFRpdGxlUm9zbGVuIGZyb20gJy4uL3N2Z3MvdGl0bGUtcm9zbGVuLnN2ZydcblxuaW1wb3J0IHtcbiAgQ29udGFpbmVyTmF2QmFyLFxuICBOYXYsXG4gIE5hdkJhckNoaWxkcmVuLFxuICBOYXZCYXJMaW5rLFxuICBSb3NsZW5cbn0gZnJvbSAnLi4vc3R5bGVzaGVldC9zdHlsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbG9nbyA9ICdodHRwczovL2dpdGh1Yi5jb20vUm9qYXNMZW9uSnVhbkx1aXMvaW1hZ2VzLXJvc2xlbi9ibG9iL21hc3Rlci9sb2dvLnBuZz9yYXc9dHJ1ZSc7XG5cdFx0Y29uc3QgbGlua3MgPSBbXG5cdFx0XHR7dG86IFwiYWJvdXRcIiwgbmFtZTogXCJDb27Ds2Nlbm9zXCJ9LFxuXHRcdFx0e3RvOiBcImNvbnRhY3RcIiwgbmFtZTogXCJDb250YWN0b1wifSxcblx0XHRcdHt0bzogXCJwcm9kdWN0c1wiLCBuYW1lOiBcIlByb2R1Y3Rvc1wifSxcblx0XHRdXG5cblxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxOYXY+XG4gICAgICAgIDxDb250YWluZXJOYXZCYXI+XG4gICAgICAgICAgPE5hdkJhckNoaWxkcmVuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvLWFuZC1pY29uXCI+XG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+PFJvc2xlbj48VGl0bGVSb3NsZW4gLz48L1Jvc2xlbj48L0xpbms+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tY3Jvc3NcIj54PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9OYXZCYXJDaGlsZHJlbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1jaGlsZHJlblwiPlxuICAgICAgICAgICAge2xpbmtzLm1hcChsaW5rID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxMaW5rXG4gICAgICAgICAgICAgICAga2V5PXtsaW5rLm5hbWV9XG4gICAgICAgICAgICAgICAgaHJlZj17YCR7bGluay50b31gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxOYXZCYXJMaW5rPntsaW5rLm5hbWV9PC9OYXZCYXJMaW5rPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lck5hdkJhcj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5sb2dvLWFuZC1pY29uIHtcbiAgICAgICAgICAgIHdpZHRoOiAxNDBweDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLm5hdmJhci1jaGlsZHJlbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICB9XG4gICAgICAgICAgLmljb24tY3Jvc3Mge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgQG1lZGlhKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgICAgICAgIC5sb2dvLWFuZC1pY29uIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlO1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubmF2YmFyLWNoaWxkcmVuIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5pY29uLWNyb3NzIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaWNvbi1jcm9zczpob3ZlciB7XG4gICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvTmF2PlxuICAgIClcbiAgfVxufVxuIl19 */\n/*@ sourceURL=containers/navbar.js */'
      }));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIlRpdGxlUm9zbGVuIiwiQ29udGFpbmVyTmF2QmFyIiwiTmF2IiwiTmF2QmFyQ2hpbGRyZW4iLCJOYXZCYXJMaW5rIiwiUm9zbGVuIiwiTmF2YmFyIiwic3RhdGUiLCJsb2dvIiwibGlua3MiLCJ0byIsIm5hbWUiLCJtYXAiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7OztBQUlQLEFBQ0UsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNLOzs7Ozs7O0ksQUFSQSx1QixBQUFBOzs7Ozs7O0FBQUEsQTs7Ozs7O0lBVWMsQTs7Ozs7Ozs7Ozs7Ozs7NE1BQ25CLEEsUSxBQUFROzs7Ozs2QkFJQyxBQUNQO1VBQU0sT0FBTixBQUFhLEFBQ2Y7VUFBTSxRQUFRLENBQ2IsRUFBQyxJQUFELEFBQUssU0FBUyxNQURELEFBQ2IsQUFBb0IsZUFDcEIsRUFBQyxJQUFELEFBQUssV0FBVyxNQUZILEFBRWIsQUFBc0IsY0FDdEIsRUFBQyxJQUFELEFBQUssWUFBWSxNQUhsQixBQUFjLEFBR2IsQUFBdUIsQUFLdEI7OzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDLGdDQUFLLE1BQU4sQUFBVztvQkFBWDtzQkFBQSxBQUFlO0FBQWY7eUJBQWUsQUFBQzs7b0JBQUQ7c0JBQUEsQUFBUTtBQUFSO0FBQUEsdUNBQVEsQUFBQzs7b0JBQUQ7c0JBRHpCLEFBQ0UsQUFBZSxBQUFRLEFBQ3ZCO0FBRHVCO0FBQUEsNEJBQ3ZCLGNBQUE7MkNBQUEsQUFBZ0I7O29CQUFoQjtzQkFBQTtBQUFBO0FBQUEsU0FKTixBQUNFLEFBQ0UsQUFFRSxBQUdKLHdCQUFBLGNBQUE7MkNBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRztBQURIO0FBQUEsZUFDRyxBQUFNLElBQUksZ0JBQVEsQUFDakI7K0JBQU8sQUFBQztlQUNELEtBREEsQUFDSyxBQUNWO3FCQUFTLEtBRkosQUFFUzs7c0JBRlQ7d0JBQUEsQUFJSDtBQUpHO0FBQ0wsU0FESyxrQkFJSCxBQUFDOztzQkFBRDt3QkFBQSxBQUFhO0FBQWI7QUFBQSxnQkFKSixBQUFPLEFBSUgsQUFBa0IsQUFFdkI7QUFoQlAsQUFDRSxBQU9FLEFBQ0c7aUJBVFA7YUFERixBQUNFLEFBeURIO0FBekRHOzs7OztBQWhCOEIsQTs7a0JBQWYsQSIsImZpbGUiOiJuYXZiYXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9