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
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('img', { src: logo, __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }))), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, links.map(function (link) {
        return _react2.default.createElement(_link2.default, {
          key: link.name,
          href: '' + link.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          }
        }, _react2.default.createElement('a', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          }
        }, link.name));
      })));
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvbmF2YmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIk5hdmJhciIsImxvZ28iLCJsaW5rcyIsInRvIiwibmFtZSIsIm1hcCIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU87Ozs7Ozs7OztJLEFBRWM7Ozs7Ozs7Ozs7OzZCQUNWLEFBQ1A7VUFBTSxPQUFOLEFBQWEsQUFDZjtVQUFNLFFBQVEsQ0FDYixFQUFDLElBQUQsQUFBSyxTQUFTLE1BREQsQUFDYixBQUFvQixlQUNwQixFQUFDLElBQUQsQUFBSyxXQUFXLE1BRkgsQUFFYixBQUFzQixjQUN0QixFQUFDLElBQUQsQUFBSyxZQUFZLE1BSGxCLEFBQWMsQUFHYixBQUF1QixBQUV0Qjs2QkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUMsZ0NBQUssTUFBTixBQUFXO29CQUFYO3NCQUFBLEFBQWU7QUFBZjtnREFBb0IsS0FBTCxBQUFVO29CQUFWO3NCQUZuQixBQUNFLEFBQ0UsQUFBZSxBQUVqQjtBQUZpQjs0QkFFakIsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRztBQURIO0FBQUEsZUFDRyxBQUFNLElBQUksZ0JBQVEsQUFDakI7K0JBQU8sQUFBQztlQUNELEtBREEsQUFDSyxBQUNWO3FCQUFTLEtBRkosQUFFUzs7c0JBRlQ7d0JBQUEsQUFJSDtBQUpHO0FBQ0wsU0FESyxrQkFJSCxjQUFBOztzQkFBQTt3QkFBQSxBQUFJO0FBQUo7QUFBQSxnQkFKSixBQUFPLEFBSUgsQUFBUyxBQUVkO0FBYlAsQUFDRSxBQUlFLEFBQ0csQUFXUjs7Ozs7QUF6QmlDLEE7O2tCQUFmLEEiLCJmaWxlIjoibmF2YmFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==