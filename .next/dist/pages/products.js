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
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Products);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Products.__proto__ || (0, _getPrototypeOf2.default)(Products)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      products: [],
      loading: false
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentWillMount',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var products;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api2.default.products.getProducts();

              case 2:
                products = _context.sent;

                this.setState({
                  products: products,
                  loading: true
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref2.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, !this.state.loading && _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, 'Loading...'), _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        }));
      })))));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsImFwaSIsIkNvbnRhaW5lclByb2R1Y3RzIiwiU3VwZXJDb250YWluZXJQcm9kdWN0cyIsIlByb2R1Y3RzIiwic3RhdGUiLCJwcm9kdWN0cyIsImxvYWRpbmciLCJnZXRQcm9kdWN0cyIsInNldFN0YXRlIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTLEFBQW1CLEFBQThCOzs7Ozs7O0lBRXBELEE7Ozs7Ozs7Ozs7Ozs7O2dOQUNKLEE7Z0JBQVEsQUFDSSxBQUNWO2UsQUFGTSxBQUVHO0FBRkgsQUFDTjs7Ozs7Ozs7Ozs7Ozt1QkFLdUIsY0FBQSxBQUFJLFNBQUosQSxBQUFhOzttQkFBOUI7QSxvQ0FDTjs7cUJBQUEsQUFBSzs0QkFBUyxBQUVaOzJCQUZGLEFBQWMsQUFFSDtBQUZHLEFBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFLSyxBQUNQOzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRztBQURIO0FBQUEsVUFDSSxLQUFBLEFBQUssTUFBTixBQUFZLDJCQUNYLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxPQUFBLEVBRkosQUFFSSxBQUVGLCtCQUFBLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGNBQ0csQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixJQUFJLG1CQUFXLEFBQ2xDOytCQUFPLEFBQUMsMERBQVEsS0FBSyxRQUFkLEFBQXNCLE1BQXRCLEFBQThCOztzQkFBOUI7d0JBQVAsQUFBTyxBQUNSO0FBRFE7QUFBQSxVQUFBO0FBVG5CLEFBQ0UsQUFDRSxBQUlFLEFBQ0UsQUFDRyxBQVFaOzs7OztBQS9Cb0IsQSxBQWtDdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoicHJvZHVjdHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9