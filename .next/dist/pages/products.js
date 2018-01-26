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

var _heroProducts = require('../components/hero-products');

var _heroProducts2 = _interopRequireDefault(_heroProducts);

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
      if (_this.state.all) {
        if (_this.state.loading) return null;
        if (_this.state.page > 5) {
          return null;
          _this.setState({
            loading: false
          });
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
                  _context.next = 2;
                  return _api2.default.products.getProducts(_this.state.page);

                case 2:
                  products = _context.sent;

                  _this.setState({
                    products: _this.state.products.concat(products),
                    page: _this.state.page + 1,
                    loading: false
                  });

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        })));
      }
    }, _this.handleFetchCleaning = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var cleaningProducts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _api2.default.products.getCleaningProducts();

            case 2:
              cleaningProducts = _context2.sent;

              _this.setState({
                products: cleaningProducts,
                loading: false,
                all: false
              });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentWillMount',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var products;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _api2.default.products.getProducts(this.state.page);

              case 2:
                products = _context3.sent;

                this.setState({
                  products: products,
                  loading: false,
                  page: this.state.page + 1,
                  all: true
                });

                window.addEventListener('scroll', this.handleScroll);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentWillMount() {
        return _ref4.apply(this, arguments);
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
          lineNumber: 75
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement(_heroProducts2.default, { getProductsCleaning: this.handleFetchCleaning, __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }), _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }));
      }))), this.state.loading && _react2.default.createElement(_loading2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      })));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsIkxvYWRpbmciLCJIZXJvUHJvZHVjdHMiLCJhcGkiLCJDb250YWluZXJQcm9kdWN0cyIsIlN1cGVyQ29udGFpbmVyUHJvZHVjdHMiLCJQcm9kdWN0cyIsInN0YXRlIiwicHJvZHVjdHMiLCJsb2FkaW5nIiwicGFnZSIsImhhbmRsZVNjcm9sbCIsImFsbCIsInNldFN0YXRlIiwic2Nyb2xsZWQiLCJ3aW5kb3ciLCJzY3JvbGxZIiwidmlld3BvcnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImZ1bGxIZWlnaHQiLCJkb2N1bWVudCIsImJvZHkiLCJjbGllbnRIZWlnaHQiLCJnZXRQcm9kdWN0cyIsImNvbmNhdCIsImhhbmRsZUZldGNoQ2xlYW5pbmciLCJnZXRDbGVhbmluZ1Byb2R1Y3RzIiwiY2xlYW5pbmdQcm9kdWN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQWtCOzs7O0FBRXpCLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTLEFBQW1CLEFBQThCOzs7Ozs7O0ksQUFFcEQ7Ozs7Ozs7Ozs7Ozs7OztnTixBQUNKO2dCQUFRLEFBQ0ksQUFDVjtlQUZNLEFBRUcsQUFDVDtZQUhNLEFBR0EsQTtBQUhBLEFBQ04sYUFpQkYsQSxlQUFlLFlBQU0sQUFDbkI7VUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLEtBQUssQUFDakI7WUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLFNBQVMsT0FBQSxBQUFPLEFBQzlCO1lBQUcsTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUFkLEFBQXFCLEdBQUcsQUFDdEI7aUJBQUEsQUFBTyxBQUNQO2dCQUFBLEFBQUs7cUJBQUwsQUFBYyxBQUNILEFBRVo7QUFIZSxBQUNaO0FBSUo7O1lBQU0sV0FBVyxPQUFqQixBQUF3QixBQUN4QjtZQUFNLGlCQUFpQixPQUF2QixBQUE4QixBQUM5QjtZQUFNLGFBQWEsU0FBQSxBQUFTLEtBQTVCLEFBQWlDLEFBRWpDOztZQUFJLEVBQUUsV0FBQSxBQUFXLGlCQUFYLEFBQTRCLE9BQWxDLEFBQUksQUFBcUMsYUFBYSxBQUNwRDtpQkFBQSxBQUFPLEFBQ1I7QUFFRDs7Y0FBQSxBQUFLLFNBQVMsRUFBRSxTQUFoQixBQUFjLEFBQVcsaUZBQVEsbUJBQUE7Y0FBQTt3RUFBQTtzQkFBQTsrQ0FBQTtxQkFBQTtrQ0FBQTt5QkFDUixjQUFBLEFBQUksU0FBSixBQUFhLFlBQVksTUFBQSxBQUFLLE1BRHRCLEFBQ1IsQUFBb0M7O3FCQUFyRDtBQUR5QixzQ0FHL0I7O3dCQUFBLEFBQUs7OEJBQ08sTUFBQSxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLE9BRGxCLEFBQ0YsQUFBMkIsQUFDckM7MEJBQU0sTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUZMLEFBRVksQUFDeEI7NkJBTjZCLEFBRy9CLEFBQWMsQUFHSDtBQUhHLEFBQ1o7O3FCQUo2QjtxQkFBQTtrQ0FBQTs7QUFBQTtzQkFBQTtBQUFqQyxBQVNEO0FBQ0Y7QSxhLEFBTUQsK0ZBQXNCLG9CQUFBO1VBQUE7c0VBQUE7a0JBQUE7NkNBQUE7aUJBQUE7K0JBQUE7cUJBQ1csY0FBQSxBQUFJLFNBRGYsQUFDVyxBQUFhOztpQkFBdEM7QUFEYywyQ0FFcEI7O29CQUFBLEFBQUs7MEJBQVMsQUFDRixBQUNWO3lCQUZZLEFBRUgsQUFDVDtxQkFMa0IsQUFFcEIsQUFBYyxBQUdQO0FBSE8sQUFDWjs7aUJBSGtCO2lCQUFBOytCQUFBOztBQUFBO21CQUFBO0E7Ozs7Ozs7Ozs7Ozs7dUJBN0NHLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTSxBQUE5QixBQUFvQzs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhMLEFBR1ksQUFDeEI7dUJBSkYsQUFBYyxBQUlQLEFBR1A7QUFQYyxBQUNaOzt1QkFNRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FpQ2xCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQVdRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDLHdDQUFhLHFCQUFxQixLQUFuQyxBQUF3QztvQkFBeEM7c0JBREYsQUFDRSxBQUNBO0FBREE7MEJBQ0EsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRztBQURIO0FBQUEsY0FDRyxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLElBQUksbUJBQVcsQUFDbEM7K0JBQU8sQUFBQywwREFBUSxLQUFLLFFBQWQsQUFBc0IsTUFBdEIsQUFBOEI7O3NCQUE5Qjt3QkFBUCxBQUFPLEFBQ1I7QUFEUTtBQUFBLFVBQUE7QUFMZixBQUVFLEFBQ0UsQUFDRyxBQUtKLGlCQUFBLEFBQUssTUFBTCxBQUFXLDJCQUNWLEFBQUM7O29CQUFEO3NCQVpSLEFBQ0UsQUFDRSxBQVVJLEFBS1Q7QUFMUztBQUFBLE9BQUE7Ozs7O0FBM0VXLEEsQUFtRnZCOztrQkFBQSxBQUFlIiwiZmlsZSI6InByb2R1Y3RzLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==