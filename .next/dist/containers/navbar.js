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
      return _react2.default.createElement(_styles.ContainerNavBar, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, 'Roslen'))), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        }, _react2.default.createElement('a', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          }
        }, link.name));
      })));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIkNvbnRhaW5lck5hdkJhciIsIk5hdmJhciIsImxvZ28iLCJsaW5rcyIsInRvIiwibmFtZSIsIm1hcCIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU87Ozs7QUFFUCxBQUFTLEFBQXVCOzs7Ozs7O0ksQUFFWDs7Ozs7Ozs7Ozs7NkJBQ1YsQUFDUDtVQUFNLE9BQU4sQUFBYSxBQUNmO1VBQU0sUUFBUSxDQUNiLEVBQUMsSUFBRCxBQUFLLFNBQVMsTUFERCxBQUNiLEFBQW9CLGVBQ3BCLEVBQUMsSUFBRCxBQUFLLFdBQVcsTUFGSCxBQUViLEFBQXNCLGNBQ3RCLEVBQUMsSUFBRCxBQUFLLFlBQVksTUFIbEIsQUFBYyxBQUdiLEFBQXVCLEFBRXRCOzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyxnQ0FBSyxNQUFOLEFBQVc7b0JBQVg7c0JBQUEsQUFBZTtBQUFmO3lCQUFlLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUZuQixBQUNFLEFBQ0UsQUFBZSxBQUVqQiw2QkFBQSxjQUFBOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxlQUNHLEFBQU0sSUFBSSxnQkFBUSxBQUNqQjsrQkFBTyxBQUFDO2VBQ0QsS0FEQSxBQUNLLEFBQ1Y7cUJBQVMsS0FGSixBQUVTOztzQkFGVDt3QkFBQSxBQUlIO0FBSkc7QUFDTCxTQURLLGtCQUlILGNBQUE7O3NCQUFBO3dCQUFBLEFBQUk7QUFBSjtBQUFBLGdCQUpKLEFBQU8sQUFJSCxBQUFTLEFBRWQ7QUFiUCxBQUNFLEFBSUUsQUFDRyxBQVdSOzs7OztBQXpCaUMsQTs7a0JBQWYsQSIsImZpbGUiOiJuYXZiYXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9