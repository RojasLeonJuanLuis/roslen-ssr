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

var Bars = function Bars(props) {
  return _react2.default.createElement('svg', props, _react2.default.createElement('title', null, 'Group'), _react2.default.createElement('g', {
    fill: '#000',
    fillRule: 'evenodd'
  }, _react2.default.createElement('path', {
    d: 'M0 7h25v3H0zM0 0h25v3H0zM0 14h25v3H0z'
  })));
};

Bars.defaultProps = {
  width: '25',
  height: '17',
  viewBox: '0 0 25 17',
  xmlns: 'http://www.w3.org/2000/svg'
};

var Cross = function Cross(props) {
  return _react2.default.createElement('svg', props, _react2.default.createElement('title', null, 'Group 2'), _react2.default.createElement('g', {
    fill: '#000',
    fillRule: 'evenodd'
  }, _react2.default.createElement('path', {
    d: 'M2.722.6l17.677 17.678-2.12 2.121L.6 2.722z'
  }), _react2.default.createElement('path', {
    d: 'M2.722 20.4L20.399 2.721 18.28.6.6 18.278z'
  })));
};

Cross.defaultProps = {
  width: '21',
  height: '21',
  viewBox: '0 0 21 21',
  xmlns: 'http://www.w3.org/2000/svg'
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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Navbar.__proto__ || (0, _getPrototypeOf2.default)(Navbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { open: false }, _this.handleOpen = function () {
      _this.setState({ open: !_this.state.open });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Navbar, [{
    key: 'render',
    value: function render() {
      var logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
      var links = [{ to: "about", name: "Conócenos" }, { to: "contact", name: "Contacto" }, { to: "products", name: "Productos" }];

      var icon = '';

      if (this.state.open) {
        icon = _react2.default.createElement('div', { className: 'bars', __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }, _react2.default.createElement(Cross, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }));
      } else if (!this.state.open) {
        icon = _react2.default.createElement('div', { className: 'cross', __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          }
        }, _react2.default.createElement(Bars, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          }
        }));
      }
      return _react2.default.createElement(_styles.Nav, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }, _react2.default.createElement(_styles.ContainerNavBar, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, _react2.default.createElement(_styles.NavBarChildren, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1412480483' + ' ' + 'logo-and-icon',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement(_styles.Roslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement(TitleRoslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }))), _react2.default.createElement('span', { onClick: this.handleOpen, className: 'jsx-1412480483' + ' ' + 'icon',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, icon))), _react2.default.createElement('div', {
        className: 'jsx-1412480483' + ' ' + ('navbar-children-' + this.state.open.toString()),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          }
        }, _react2.default.createElement(_styles.NavBarLink, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          }
        }, link.name));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '1412480483',
        css: '.logo-and-icon.jsx-1412480483{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:140px;}.navbar-children-false.jsx-1412480483{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.icon.jsx-1412480483{display:none;}@media(max-width:767px){.logo-and-icon.jsx-1412480483{display:grid;grid-template-columns:50% 50%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:90%;}.navbar-children-false.jsx-1412480483{display:none;}.navbar-children-true.jsx-1412480483{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:left;width:90%;}.icon.jsx-1412480483{display:block;}span.jsx-1412480483{text-align:right;}.icon-cross.jsx-1412480483{display:block;}.icon-cross.jsx-1412480483:hover{cursor:pointer;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBEb0IsQUFHMEIsQUFLQSxBQUlBLEFBSUUsQUFPQSxBQUdBLEFBTUMsQUFHRyxBQUdILEFBR0MsYUE1Qm5CLEFBSWtDLEFBT2hDLENBU0EsQUFNQSxDQUdBLEVBTkEsMEJBbEJnQywrQkFkYixBQUtBLEFBa0JLLHFFQWpCMUIsU0FrQm9CLE1BVE4sU0FkQSxDQWVaLEFBU1ksVUFDWixDQXhCRiIsImZpbGUiOiJjb250YWluZXJzL25hdmJhci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9qYXMvRGVza3RvcC9yb3NsZW4tc3NyIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5pbXBvcnQgVGl0bGVSb3NsZW4gZnJvbSAnLi4vc3Zncy90aXRsZS1yb3NsZW4uc3ZnJ1xuaW1wb3J0IEJhcnMgZnJvbSAnLi4vc3Zncy9iYXJzLnN2ZydcbmltcG9ydCBDcm9zcyBmcm9tICcuLi9zdmdzL2Nyb3NzLnN2ZydcblxuaW1wb3J0IHtcbiAgQ29udGFpbmVyTmF2QmFyLFxuICBOYXYsXG4gIE5hdkJhckNoaWxkcmVuLFxuICBOYXZCYXJMaW5rLFxuICBSb3NsZW5cbn0gZnJvbSAnLi4vc3R5bGVzaGVldC9zdHlsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0geyBvcGVuOiBmYWxzZSB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgb3BlbjogIXRoaXMuc3RhdGUub3BlbiB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGxvZ28gPSAnaHR0cHM6Ly9naXRodWIuY29tL1JvamFzTGVvbkp1YW5MdWlzL2ltYWdlcy1yb3NsZW4vYmxvYi9tYXN0ZXIvbG9nby5wbmc/cmF3PXRydWUnO1xuXHRcdGNvbnN0IGxpbmtzID0gW1xuXHRcdFx0e3RvOiBcImFib3V0XCIsIG5hbWU6IFwiQ29uw7NjZW5vc1wifSxcblx0XHRcdHt0bzogXCJjb250YWN0XCIsIG5hbWU6IFwiQ29udGFjdG9cIn0sXG5cdFx0XHR7dG86IFwicHJvZHVjdHNcIiwgbmFtZTogXCJQcm9kdWN0b3NcIn0sXG5cdFx0XVxuXG4gICAgbGV0IGljb24gPSAnJ1xuXG4gICAgaWYodGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpY29uID0gPGRpdiBjbGFzc05hbWU9XCJiYXJzXCI+PENyb3NzIC8+PC9kaXY+XG4gICAgfVxuICAgIGVsc2UgaWYoIXRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWNvbiA9IDxkaXYgY2xhc3NOYW1lPVwiY3Jvc3NcIj48QmFycyAvPjwvZGl2PlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE5hdj5cbiAgICAgICAgPENvbnRhaW5lck5hdkJhcj5cbiAgICAgICAgICA8TmF2QmFyQ2hpbGRyZW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28tYW5kLWljb25cIj5cbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj48Um9zbGVuPjxUaXRsZVJvc2xlbiAvPjwvUm9zbGVuPjwvTGluaz5cbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5oYW5kbGVPcGVufSBjbGFzc05hbWU9XCJpY29uXCI+e2ljb259PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9OYXZCYXJDaGlsZHJlbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG5hdmJhci1jaGlsZHJlbi0ke3RoaXMuc3RhdGUub3Blbi50b1N0cmluZygpfWB9PlxuICAgICAgICAgICAge2xpbmtzLm1hcChsaW5rID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxMaW5rXG4gICAgICAgICAgICAgICAga2V5PXtsaW5rLm5hbWV9XG4gICAgICAgICAgICAgICAgaHJlZj17YCR7bGluay50b31gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxOYXZCYXJMaW5rPntsaW5rLm5hbWV9PC9OYXZCYXJMaW5rPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lck5hdkJhcj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5sb2dvLWFuZC1pY29uIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgd2lkdGg6IDE0MHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAubmF2YmFyLWNoaWxkcmVuLWZhbHNlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIH1cbiAgICAgICAgICAuaWNvbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBAbWVkaWEobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgICAgICAgLmxvZ28tYW5kLWljb24ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLm5hdmJhci1jaGlsZHJlbi1mYWxzZSB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubmF2YmFyLWNoaWxkcmVuLXRydWUge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmljb24ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5pY29uLWNyb3NzIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaWNvbi1jcm9zczpob3ZlciB7XG4gICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvTmF2PlxuICAgIClcbiAgfVxufVxuIl19 */\n/*@ sourceURL=containers/navbar.js */'
      }));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIlRpdGxlUm9zbGVuIiwiQmFycyIsIkNyb3NzIiwiQ29udGFpbmVyTmF2QmFyIiwiTmF2IiwiTmF2QmFyQ2hpbGRyZW4iLCJOYXZCYXJMaW5rIiwiUm9zbGVuIiwiTmF2YmFyIiwic3RhdGUiLCJvcGVuIiwiaGFuZGxlT3BlbiIsInNldFN0YXRlIiwibG9nbyIsImxpbmtzIiwidG8iLCJuYW1lIiwiaWNvbiIsInRvU3RyaW5nIiwibWFwIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU87Ozs7QUFNUCxBQUNFLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDSzs7Ozs7OztJLEFBVkEsdUJBQUEsQTs7Ozs7OztBQUFBLEE7Ozs7OztJLEFBQ0EsZ0JBQUEsQTs7Ozs7Ozs7O0EsQUFBQTs7Ozs7OztJLEFBQ0EsaUJBQUEsQTs7Ozs7Ozs7Ozs7QSxBQUFBOzs7Ozs7O0ksQUFVYzs7Ozs7Ozs7Ozs7Ozs7NE1BQ25CLEEsUUFBUSxFQUFFLE0sQUFBRixBQUFRLGVBRWhCLEEsYUFBYSxZQUFNLEFBQ2pCO1lBQUEsQUFBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQUEsQUFBSyxNQUE1QixBQUFjLEFBQW9CLEFBQ25DO0E7Ozs7OzZCQUVRLEFBQ1A7VUFBTSxPQUFOLEFBQWEsQUFDZjtVQUFNLFFBQVEsQ0FDYixFQUFDLElBQUQsQUFBSyxTQUFTLE1BREQsQUFDYixBQUFvQixlQUNwQixFQUFDLElBQUQsQUFBSyxXQUFXLE1BRkgsQUFFYixBQUFzQixjQUN0QixFQUFDLElBQUQsQUFBSyxZQUFZLE1BSGxCLEFBQWMsQUFHYixBQUF1QixBQUd0Qjs7VUFBSSxPQUFKLEFBQVcsQUFFWDs7VUFBRyxLQUFBLEFBQUssTUFBUixBQUFjLE1BQU0sQUFDbEI7K0JBQU8sY0FBQSxTQUFLLFdBQUwsQUFBZTtzQkFBZjt3QkFBQSxBQUFzQjtBQUF0QjtTQUFBLGdDQUFzQixBQUFDOztzQkFBRDt3QkFBN0IsQUFBTyxBQUFzQixBQUM5QjtBQUQ4QjtBQUFBO0FBRC9CLGFBR0ssSUFBRyxDQUFDLEtBQUEsQUFBSyxNQUFULEFBQWUsTUFBTSxBQUN4QjsrQkFBTyxjQUFBLFNBQUssV0FBTCxBQUFlO3NCQUFmO3dCQUFBLEFBQXVCO0FBQXZCO1NBQUEsZ0NBQXVCLEFBQUM7O3NCQUFEO3dCQUE5QixBQUFPLEFBQXVCLEFBQy9CO0FBRCtCO0FBQUE7QUFFaEM7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUMsZ0NBQUssTUFBTixBQUFXO29CQUFYO3NCQUFBLEFBQWU7QUFBZjt5QkFBZSxBQUFDOztvQkFBRDtzQkFBQSxBQUFRO0FBQVI7QUFBQSx1Q0FBUSxBQUFDOztvQkFBRDtzQkFEekIsQUFDRSxBQUFlLEFBQVEsQUFDdkI7QUFEdUI7QUFBQSw0QkFDdkIsY0FBQSxVQUFNLFNBQVMsS0FBZixBQUFvQixnREFBcEIsQUFBMEM7O29CQUExQztzQkFBQSxBQUFrRDtBQUFsRDtTQUpOLEFBQ0UsQUFDRSxBQUVFLEFBR0oseUJBQUEsY0FBQTtrRUFBbUMsS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUE5QyxBQUFtQyxBQUFnQjs7b0JBQW5EO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGVBQ0csQUFBTSxJQUFJLGdCQUFRLEFBQ2pCOytCQUFPLEFBQUM7ZUFDRCxLQURBLEFBQ0ssQUFDVjtxQkFBUyxLQUZKLEFBRVM7O3NCQUZUO3dCQUFBLEFBSUg7QUFKRztBQUNMLFNBREssa0JBSUgsQUFBQzs7c0JBQUQ7d0JBQUEsQUFBYTtBQUFiO0FBQUEsZ0JBSkosQUFBTyxBQUlILEFBQWtCLEFBRXZCO0FBaEJQLEFBQ0UsQUFPRSxBQUNHO2lCQVRQO2FBREYsQUFDRSxBQWlFSDtBQWpFRzs7Ozs7QUF4QjhCLEE7O2tCQUFmLEEiLCJmaWxlIjoibmF2YmFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==