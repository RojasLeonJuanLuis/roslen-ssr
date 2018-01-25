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

var _loading = require('../components/shared/loading');

var _loading2 = _interopRequireDefault(_loading);

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

      if (!(scrolled + viewportHeight + 350 >= fullHeight)) {
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

                if (_this.state.page < 10) {
                  _this.setState({
                    products: _this.state.products.concat(products),
                    page: _this.state.page + 1,
                    loading: false
                  });
                }
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                _this.setState({
                  loading: false
                });

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
    key: 'componentDidMount',
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

      function componentDidMount() {
        return _ref3.apply(this, arguments);
      }

      return componentDidMount;
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
          lineNumber: 63
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          }
        }));
      }))), this.state.loading && _react2.default.createElement(_loading2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      })));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsIkxvYWRpbmciLCJhcGkiLCJDb250YWluZXJQcm9kdWN0cyIsIlN1cGVyQ29udGFpbmVyUHJvZHVjdHMiLCJQcm9kdWN0cyIsInN0YXRlIiwicHJvZHVjdHMiLCJsb2FkaW5nIiwicGFnZSIsImhhbmRsZVNjcm9sbCIsInNjcm9sbGVkIiwid2luZG93Iiwic2Nyb2xsWSIsInZpZXdwb3J0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJmdWxsSGVpZ2h0IiwiZG9jdW1lbnQiLCJib2R5IiwiY2xpZW50SGVpZ2h0Iiwic2V0U3RhdGUiLCJnZXRQcm9kdWN0cyIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVM7Ozs7QUFFaEIsQUFBUyxBQUFtQixBQUE4Qjs7Ozs7OztJLEFBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Z04sQUFDSjtnQkFBUSxBQUNJLEFBQ1Y7ZUFGTSxBQUVHLEFBQ1Q7WUFITSxBLEFBR0E7QUFIQSxBQUNOLGFBZ0JGLEEsZUFBZSxZQUFNLEFBQ25CO1VBQUcsTUFBQSxBQUFLLE1BQVIsQUFBYyxTQUFTLEFBQUU7ZUFBQSxBQUFPLEFBQU07QUFFdEM7O1VBQU0sV0FBVyxPQUFqQixBQUF3QixBQUN4QjtVQUFNLGlCQUFpQixPQUF2QixBQUE4QixBQUM5QjtVQUFNLGFBQWEsU0FBQSxBQUFTLEtBQTVCLEFBQWlDLEFBRWpDOztVQUFJLEVBQUUsV0FBQSxBQUFXLGlCQUFYLEFBQTRCLE9BQWxDLEFBQUksQUFBcUMsYUFBYSxBQUNwRDtlQUFBLEFBQU8sQUFDUjtBQUVEOztZQUFBLEFBQUssU0FBUyxFQUFFLFNBQWhCLEFBQWMsQUFBVyxpRkFBUSxtQkFBQTtZQUFBO3NFQUFBO29CQUFBOzZDQUFBO21CQUFBO2dDQUFBO2dDQUFBO3VCQUVOLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxNQUFBLEFBQUssTUFGeEIsQUFFTixBQUFvQzs7bUJBQXJEO0FBRnVCLG9DQUk3Qjs7b0JBQUcsTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUFkLEFBQXFCLElBQUksQUFDdkI7d0JBQUEsQUFBSzs4QkFDTyxNQUFBLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsT0FEbEIsQUFDRixBQUEyQixBQUNyQzswQkFBTSxNQUFBLEFBQUssTUFBTCxBQUFXLE9BRkwsQUFFWSxBQUN4Qjs2QkFIRixBQUFjLEFBR0gsQUFFWjtBQUxlLEFBQ1o7QUFOeUI7Z0NBQUE7QUFBQTs7bUJBQUE7Z0NBQUE7Z0RBWTdCOztzQkFBQSxBQUFLOzJCQVp3QixBQVk3QixBQUFjLEFBQ0g7QUFERyxBQUNaOzttQkFiMkI7bUJBQUE7Z0NBQUE7O0FBQUE7aUNBQUE7QUFBakMsQUFpQkQ7QTs7Ozs7Ozs7Ozs7Ozt1QkF0Q3dCLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTSxBQUE5QixBQUFvQzs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhuQixBQUFjLEFBR1ksQUFHMUI7QUFOYyxBQUNaOzt1QkFLRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FpQ2xCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQUVRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNHO0FBREg7QUFBQSxjQUNHLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsSUFBSSxtQkFBVyxBQUNsQzsrQkFBTyxBQUFDLDBEQUFRLEtBQUssUUFBZCxBQUFzQixNQUF0QixBQUE4Qjs7c0JBQTlCO3dCQUFQLEFBQU8sQUFDUjtBQURRO0FBQUEsVUFBQTtBQUpmLEFBQ0UsQUFDRSxBQUNHLEFBS0osaUJBQUEsQUFBSyxNQUFMLEFBQVcsMkJBQ1YsQUFBQzs7b0JBQUQ7c0JBWFIsQUFDRSxBQUNFLEFBU0ksQUFLVDtBQUxTO0FBQUEsT0FBQTs7Ozs7QUFoRVcsQSxBQXdFdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoicHJvZHVjdHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9