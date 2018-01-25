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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _styles = require('../stylesheet/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/containers/navbar.js';


var TitleRoslen = function TitleRoslen(props) {
  return _react2.default.createElement('svg', props, _react2.default.createElement('style', null, '.st0', '{', 'font-family:\'Candal\'', '}', '.st1', '{', 'font-size:250px', '}'), _react2.default.createElement('text', {
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
    (0, _classCallCheck3.default)(this, Navbar);

    return (0, _possibleConstructorReturn3.default)(this, (Navbar.__proto__ || (0, _getPrototypeOf2.default)(Navbar)).apply(this, arguments));
  }

  (0, _createClass3.default)(Navbar, [{
    key: 'render',
    value: function render() {
      var logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
      var links = [{ to: "about", name: "Conócenos" }, { to: "contact", name: "Contacto" }, { to: "products", name: "Productos" }];
      return _react2.default.createElement(_styles.Nav, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, _react2.default.createElement(_styles.ContainerNavBar, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement(_styles.NavBarChildren, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, _react2.default.createElement(_styles.NavBarLink, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement(TitleRoslen, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      })))), _react2.default.createElement(_styles.NavBarChildren, { className: 'hide', __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }, _react2.default.createElement(_styles.NavBarLink, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          }
        }, link.name));
      }))));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIlRpdGxlUm9zbGVuIiwiQ29udGFpbmVyTmF2QmFyIiwiTmF2IiwiTmF2QmFyQ2hpbGRyZW4iLCJOYXZCYXJMaW5rIiwiUm9zbGVuIiwiTmF2YmFyIiwibG9nbyIsImxpbmtzIiwidG8iLCJuYW1lIiwibWFwIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7OztBQUlQLEFBQ0UsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNLOzs7Ozs7O0lBUkEsQSx1QkFBQSxBOzs7Ozs7O0FBQUEsQTs7Ozs7O0lBVWMsQTs7Ozs7Ozs7Ozs7NkJBQ1YsQUFDUDtVQUFNLE9BQU4sQUFBYSxBQUNmO1VBQU0sUUFBUSxDQUNiLEVBQUMsSUFBRCxBQUFLLFNBQVMsTUFERCxBQUNiLEFBQW9CLGVBQ3BCLEVBQUMsSUFBRCxBQUFLLFdBQVcsTUFGSCxBQUViLEFBQXNCLGNBQ3RCLEVBQUMsSUFBRCxBQUFLLFlBQVksTUFIbEIsQUFBYyxBQUdiLEFBQXVCLEFBRXRCOzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyxnQ0FBSyxNQUFOLEFBQVc7b0JBQVg7c0JBQUEsQUFDRTtBQURGO3lCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHVDQUNFLEFBQUM7O29CQUFEO3NCQUpSLEFBQ0UsQUFDRSxBQUNFLEFBQ0UsQUFJTjtBQUpNO0FBQUEsNkJBSU4sQUFBQyx3Q0FBZSxXQUFoQixBQUEwQjtvQkFBMUI7c0JBQUEsQUFDRztBQURIO2VBQ0csQUFBTSxJQUFJLGdCQUFRLEFBQ2pCOytCQUFPLEFBQUM7ZUFDRCxLQURBLEFBQ0ssQUFDVjtxQkFBUyxLQUZKLEFBRVM7O3NCQUZUO3dCQUFBLEFBSUg7QUFKRztBQUNMLFNBREssa0JBSUgsQUFBQzs7c0JBQUQ7d0JBQUEsQUFBYTtBQUFiO0FBQUEsZ0JBSkosQUFBTyxBQUlILEFBQWtCLEFBRXZCO0FBbEJULEFBQ0UsQUFDRSxBQVFFLEFBQ0csQUFZVjs7Ozs7QUEvQmlDLEE7O2tCQUFmLEEiLCJmaWxlIjoibmF2YmFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==