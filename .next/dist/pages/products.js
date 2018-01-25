'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _layout = require('../containers/layout');

var _layout2 = _interopRequireDefault(_layout);

var _product = require('../components/product');

var _product2 = _interopRequireDefault(_product);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _styles = require('../stylesheet/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/pages/products.js?entry';


var Products = function (_Component) {
  (0, _inherits3.default)(Products, _Component);

  function Products() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Products);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Products.__proto__ || (0, _getPrototypeOf2.default)(Products)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      products: [],
      loading: true,
      page: 1
    }, _this.handleScroll = function () {
      if (_this.state.loading) {
        return null;
      }

      var scrolled = window.scrollY;
      var viewportHeight = window.innerHeight;
      var fullHeight = document.body.clientHeight;

      if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
        return null;
      }

      _this.setState({ loading: true }, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var products;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api2.default.products.getProducts(_this.state.page);

              case 3:
                products = _context.sent;

                _this.setState({
                  products: _this.state.products.concat(products),
                  page: _this.state.page + 1,
                  loading: false
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 7]]);
      })));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentWillMount',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var products;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.products.getProducts(this.state.page);

              case 2:
                products = _context2.sent;

                this.setState({
                  products: products,
                  loading: false,
                  page: this.state.page + 1
                });

                window.addEventListener('scroll', this.handleScroll);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentWillMount() {
        return _ref3.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, this.state.loading && _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, 'Loading...'), _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          }
        }));
      })))));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsImFwaSIsIkNvbnRhaW5lclByb2R1Y3RzIiwiU3VwZXJDb250YWluZXJQcm9kdWN0cyIsIlByb2R1Y3RzIiwic3RhdGUiLCJwcm9kdWN0cyIsImxvYWRpbmciLCJwYWdlIiwiaGFuZGxlU2Nyb2xsIiwic2Nyb2xsZWQiLCJ3aW5kb3ciLCJzY3JvbGxZIiwidmlld3BvcnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImZ1bGxIZWlnaHQiLCJkb2N1bWVudCIsImJvZHkiLCJjbGllbnRIZWlnaHQiLCJzZXRTdGF0ZSIsImdldFByb2R1Y3RzIiwiY29uY2F0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTLEFBQW1CLEFBQThCOzs7Ozs7O0lBRXBELEE7Ozs7Ozs7Ozs7Ozs7OztnTixBQUNKO2dCQUFRLEFBQ0ksQUFDVjtlQUZNLEFBRUcsQUFDVDtZLEFBSE0sQUFHQTtBQUhBLEFBQ04sYUFnQkYsQSxlQUFlLFlBQU0sQUFDbkI7VUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLFNBQVMsQUFBRTtlQUFBLEFBQU8sQUFBTTtBQUV0Qzs7VUFBTSxXQUFXLE9BQWpCLEFBQXdCLEFBQ3hCO1VBQU0saUJBQWlCLE9BQXZCLEFBQThCLEFBQzlCO1VBQU0sYUFBYSxTQUFBLEFBQVMsS0FBNUIsQUFBaUMsQUFFakM7O1VBQUksRUFBRSxXQUFBLEFBQVcsaUJBQVgsQUFBNEIsT0FBbEMsQUFBSSxBQUFxQyxhQUFhLEFBQ3BEO2VBQUEsQUFBTyxBQUNSO0FBRUQ7O1lBQUEsQUFBSyxTQUFTLEVBQUUsU0FBaEIsQUFBYyxBQUFXLGlGQUFRLG1CQUFBO1lBQUE7c0VBQUE7b0JBQUE7NkNBQUE7bUJBQUE7Z0NBQUE7Z0NBQUE7dUJBRU4sY0FBQSxBQUFJLFNBQUosQUFBYSxZQUFZLE1BQUEsQUFBSyxNQUZ4QixBQUVOLEFBQW9DOzttQkFBckQ7QUFGdUIsb0NBSTdCOztzQkFBQSxBQUFLOzRCQUNPLE1BQUEsQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixPQURsQixBQUNGLEFBQTJCLEFBQ3JDO3dCQUFNLE1BQUEsQUFBSyxNQUFMLEFBQVcsT0FGTCxBQUVZLEFBQ3hCOzJCQVAyQixBQUk3QixBQUFjLEFBR0g7QUFIRyxBQUNaO2dDQUwyQjtBQUFBOzttQkFBQTtnQ0FBQTtnREFVN0I7O3dCQUFBLEFBQVEsYUFWcUI7O21CQUFBO21CQUFBO2dDQUFBOztBQUFBO2lDQUFBO0FBQWpDLEFBYUQ7QTs7Ozs7Ozs7Ozs7Ozt1QkFsQ3dCLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTUFBOUIsQUFBb0MsQTs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhuQixBQUFjLEFBR1ksQUFHMUI7QUFOYyxBQUNaOzt1QkFLRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0E2QmxCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQUVRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxjQUNHLEFBQUssTUFBTCxBQUFXLDJCQUNWLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxPQUFBLEVBRkosQUFFSSxBQUVGLCtCQUFBLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGNBQ0csQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixJQUFJLG1CQUFXLEFBQ2xDOytCQUFPLEFBQUMsMERBQVEsS0FBSyxRQUFkLEFBQXNCLE1BQXRCLEFBQThCOztzQkFBOUI7d0JBQVAsQUFBTyxBQUNSO0FBRFE7QUFBQSxVQUFBO0FBVG5CLEFBQ0UsQUFDRSxBQUlFLEFBQ0UsQUFDRyxBQVFaOzs7OztBQWpFb0IsQSxBQW9FdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoicHJvZHVjdHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9